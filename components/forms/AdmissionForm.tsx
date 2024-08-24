"use client";

import { z } from "zod";

export const AdmissionFormSchema = z.object({
  id: z.string().optional(),
  programId: z.string().min(2).max(50),
  departmentId: z.string().min(2).max(50),
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
import { useState, useTransition, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { Department, Program } from "@prisma/client";
import { getDepartments } from "@/actions/department.action";
import { getDepartmentPrograms } from "@/actions/program.action";

interface AdmissionFormProps {
  admissionNumber: number;
  defaultValues?: Partial<z.infer<typeof AdmissionFormSchema>>;
  onSubmit?: (values: z.infer<typeof AdmissionFormSchema>) => void;
}

export function AdmissionForm({
  admissionNumber,
  defaultValues,
  onSubmit,
}: AdmissionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  const form = useForm<z.infer<typeof AdmissionFormSchema>>({
    resolver: zodResolver(AdmissionFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (form.watch("departmentId")) {
      const fetchPrograms = async () => {
        const programs = await getDepartmentPrograms(
          form.watch("departmentId")
        );
        setPrograms(programs);
      };
      fetchPrograms();
    }
  }, [form.watch("departmentId")]);

  const handleSubmit = (values: z.infer<typeof AdmissionFormSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit?.(values);
        toast({
          title: defaultValues ? "Update Admission" : "Create Admission",
          description: defaultValues
            ? "Admission Successfully Updated!"
            : "Admission Successfully Created!",
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
        className="space-y-3 p-10"
      >
        <section className="flex flex-col gap-20">
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
          <div className="flex-1 space-y-3">
            <h1 className="font-black text-lg mb-5">Admission</h1>
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem value={department.id} key={department.id}>
                          {department.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem value={program.id} key={program.id}>
                          {program.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {defaultValues ? "Update Admission" : "Add Admission"}
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
