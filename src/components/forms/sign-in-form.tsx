"use client"

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { type Output } from "valibot";
import { authSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useTransition } from "react";
import { Spinner } from "../icons";
import { catchClerkError } from "@/lib/utils";

type SchemaType = Output<typeof authSchema>

export default function SignInForm() {

    const router = useRouter()
    const { isLoaded, signIn, setActive } = useSignIn()
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
            const result = await signIn.create({
              identifier: data.email,
              password: data.password,
            })
    
            if (result.status === "complete") {
              await setActive({ session: result.createdSessionId })
    
              router.push(`${window.location.origin}/`)
            } else {
              /*Investigate why the login hasn't completed */
              console.error(result)
            }
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
        Sign in
        <span className="sr-only">Sign in</span>
      </Button>
    </form>
  </Form>);
}
