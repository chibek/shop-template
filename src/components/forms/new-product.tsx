import { Output } from "valibot";
import { insertProductsSchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { Form } from "../ui/form";

type SchemaType = Output<typeof insertProductsSchema>;

export default function NewProductForm() {
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<SchemaType>({
    resolver: valibotResolver(insertProductsSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: SchemaType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      ></form>
    </Form>
  );
}
