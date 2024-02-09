"use client"
import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginSchema } from '@/schemas/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as z from "zod";

function LoginPage() {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        // await signIn("credentials", {redirect: false, username: "jsmith", password: "1234",callbackUrl })
        try {
            setLoading(true);

            const res = await signIn("credentials", {
                redirect: false, username: values.username, password: values.password,
                callbackUrl,
            });

            setLoading(false);

            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("invalid email or password");
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    }
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden px-4">
            <div className="w-full m-auto md:max-w-lg rounded-xl shadow-lg">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email and password to login
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name='username'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input id='username' {...field} placeholder="Enter you'r username" type='text' />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} id='password' placeholder="Enter you'r password" type='password' />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormError message={error} />
                                </div>
                            </form>
                            {/* <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </CardContent> */}

                        </Form>

                    </CardContent>

                    <CardFooter className="flex flex-col">
                        <Button disabled={loading} type='submit' form='login-form' className="w-full">
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Login</Button>
                        <p className="mt-2 text-xs text-center text-gray-700">
                            {" "}
                            Don't have an account?{" "}
                            <span className=" text-blue-600 hover:underline">Sign up</span>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default LoginPage
