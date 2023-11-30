"use client";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input, type InputProps } from "./ui/input";
import { type ChangeEvent, useId } from "react";

interface NumberInputProps extends InputProps {
  increment: () => void;
  decrement: () => void;
}

export default function NumberInput({
  disabled,
  value,
  min,
  increment,
  decrement,
}: NumberInputProps) {
  const id = useId();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className="flex items-center">
      <Button
        id={`${id}-decrement`}
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none border-r-0"
        disabled={disabled}
        onClick={decrement}
      >
        <MinusIcon className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Remove one item</span>
      </Button>
      <Input
        id="custom-input-number"
        type="number"
        value={value}
        className="h-8 w-12 rounded-none"
        onChange={handleChange}
        min={min}
        placeholder="0"
        disabled={disabled}
      />
      <Button
        id={`${id}-increment`}
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-l-none border-l-0"
        disabled={disabled}
        onClick={increment}
      >
        <PlusIcon className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Add one item</span>
      </Button>
    </div>
  );
}
