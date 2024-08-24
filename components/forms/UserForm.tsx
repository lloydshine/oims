"use client";

import { z } from "zod";

export const UserFormSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
  assignedOffice: z.string().min(2).max(50),
  email: z.string().min(2).max(30),
  firstName: z.string().min(2).max(50),
  middleName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  contactNumber: z.string().min(2).max(50),
});

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useToast } from "../ui/use-toast";

interface UserFormProps {
  defaultValues?: Partial<z.infer<typeof UserFormSchema>>;
  onSubmit?: (values: z.infer<typeof UserFormSchema>) => void;
}

export function UserForm({ defaultValues, onSubmit }: UserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          id: "",
          username: "",
          assignedOffice: "",
          role: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          contactNumber: "",
        },
  });

  const handleSubmit = (values: z.infer<typeof UserFormSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit?.(values);
        toast({
          title: defaultValues ? "Update User" : "Create User",
          description: defaultValues
            ? "User Successfully Updated!"
            : "User Successfully Created!",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 p-2"
      >
        <section className="flex flex-col gap-20">
          <div className="flex-1 space-y-3">
            <h1 className="font-black text-lg mb-5">Account</h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="ASSISTANT">ASSISTANT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Office</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select office" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OSAS">OSAS</SelectItem>
                      <SelectItem value="GUIDANCE">GUIDANCE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage offices in your{" "}
                    <Link href="/examples/forms">office settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 space-y-3">
            <h1 className="font-black text-lg mb-5">Personal Information</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middlename</FormLabel>
                  <FormControl>
                    <Input placeholder="Middlename" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="Lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {defaultValues ? "Update User" : "Add User"}
          </Button>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
        </section>
      </form>
    </Form>
  );
}
