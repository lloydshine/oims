"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const ProgramFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(50),
  shortname: z.string().min(2).max(50),
  departmentId: z.string(),
});

interface ProgramFormProps {
  departmentId: string;
  defaultValues?: Partial<z.infer<typeof ProgramFormSchema>>;
  onSubmit?: (values: z.infer<typeof ProgramFormSchema>) => void;
}

export function ProgramForm({
  departmentId,
  defaultValues,
  onSubmit,
}: ProgramFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProgramFormSchema>>({
    resolver: zodResolver(ProgramFormSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          departmentId,
        }
      : { id: "", name: "", shortname: "", departmentId },
  });

  const handleSubmit = (values: z.infer<typeof ProgramFormSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit?.(values);
        toast({
          title: defaultValues ? "Update Program" : "Create Program",
          description: defaultValues
            ? "Program Successfully Updated!"
            : "Program Successfully Created!",
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
        <section className="flex gap-20">
          <div className="flex-1 space-y-3">
            <h1 className="font-black text-lg mb-5">
              {defaultValues ? "Edit Program" : "Add Program"}
            </h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Shortname</FormLabel>
                  <FormControl>
                    <Input placeholder="Shortname" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {defaultValues ? "Update Program" : "Add Program"}
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
