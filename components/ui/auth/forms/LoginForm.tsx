"use client"


import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "../CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormError } from "../FormError";
import { login } from "@/actions/login"
import GoogleLogin  from "../GoogleButton";
import Link from "next/link"

const LoginForm = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
      setLoading(true);
      login(data).then((res) => {
        if (res.error) {
          setError(res.error);
          setLoading(false);
        }
        if (res.success) {
          setError("");
          setLoading(false);
        }
      });
    };

  return (
    <CardWrapper
      headerLabel="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
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
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" variant="link" asChild className="px-0 font-normal">
              <Link href=".auth/reset">Forgot Password?</Link>
            </Button>
          </div>
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <GoogleLogin />
    </CardWrapper>
  )
}

export default LoginForm