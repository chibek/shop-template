"use client"

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { Output } from "valibot";
import { authSchema } from "@/lib/validations/auth";
import { useSignUp } from "@clerk/nextjs";
import { useTransition } from "react";
import { Spinner } from "../icons";
import { catchClerkError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SchemaType = Output<typeof authSchema>

export default function SignUpForm() {
  const router = useRouter()
    const { isLoaded, signUp } = useSignUp()
    const [isPending, startTransition] = useTransition()

    // react-hook-form
    const form = useForm<SchemaType>({
        resolver: valibotResolver(authSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

      function onSubmit(data: SchemaType) {
        if (!isLoaded) return
    
        startTransition(async () => {
          try {
            await signUp.create({
              emailAddress: data.email,
              password: data.password,
            })

          // Send email verification code
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          })
          
          router.push("/signup/verify-email")
          toast.message("Check your email", {
            description: "We sent you a 6-digit verification code.",
          })
    
          } catch (err) {
            catchClerkError(err)
          }
        })
      }

  return ( <Form {...form}>
    <form
      className="grid gap-4"
      onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="rodneymullen180@gmail.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <PasswordInput placeholder="**********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" disabled={isPending}>
        {isPending && (
          <Spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Sign up
        <span className="sr-only">Sign up</span>
      </Button>
    </form>
  </Form>);
}
