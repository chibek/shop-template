import { type Product } from "@/db/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartProductInterface extends Product {
  quantity: number;
}
// Define the interface of the Cart state
interface State {
  cart: CartProductInterface[];
  totalItems: number;
  totalPrice: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  removeAllFromCart: (Item: Product) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(product.price),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(product.price),
          }));
        }
      },
      removeFromCart: (product: Product) => {
        const cart = get().cart;
        const updatedCart = cart
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - Number(product.price),
        }));
      },
      removeAllFromCart: (product: Product) => {
        const cart = get().cart;
        let quantity = 0;
        const filteredProducts = cart.filter((item) => {
          quantity = item.quantity;
          return item.id !== product.id;
        });

        set((state) => ({
          cart: filteredProducts,
          totalItems: state.totalItems - quantity,
          totalPrice: state.totalPrice - Number(product.price) * quantity,
        }));
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);
