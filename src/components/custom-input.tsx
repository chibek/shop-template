import {
  type FieldValues,
  type Control,
  type FieldPath,
  type ControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input, type InputProps } from "./ui/input";
import { type HTMLInputTypeAttribute } from "react";
import { Textarea } from "./ui/textarea";

interface CustomInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Pick<ControllerProps<TFieldValues, TName>, "control" | "name">, Omit<InputProps, "name">  {
  control: Control<TFieldValues>;
  type: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  areaText?: boolean;
}

export function CustomInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  type,
  name,
  label,
  placeholder,
  areaText = false,
  ...inputProps
}: CustomInput<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {areaText ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                {...inputProps}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
