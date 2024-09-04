"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department } from "@prisma/client";
import { getDepartments } from "@/actions/department.action";
import EquipmentList from "@/app/request/equipments/EquipmentList";
import { createBorrow } from "@/actions/borrow.action";
import { useRouter } from "next/navigation";

export const RequestEquipmentsFormSchema = z.object({
  id: z.string().optional(),
  borrower: z.string().min(2).max(50),
  department: z.string().min(2).max(50),
  event: z.string().max(50),
  items: z
    .array(
      z.object({
        equipmentId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .min(1, "You must request at least one item."),
});

export default function RequestEquipmentsForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
    };
    fetchDepartments();
  }, []);

  const form = useForm<z.infer<typeof RequestEquipmentsFormSchema>>({
    resolver: zodResolver(RequestEquipmentsFormSchema),
    defaultValues: {
      id: "",
      borrower: "",
      department: "",
      event: "",
      items: [],
    },
  });

  const handleSubmit = (
    values: z.infer<typeof RequestEquipmentsFormSchema>
  ) => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await createBorrow(values);
        if (res.success) {
          toast({
            title: "Create Request Equipments",
            description: "Request Equipments Successfully Created!",
          });
          router.push(`/request/equipments/${res.log}`);
        } else {
          setError(res.log);
        }
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
        <h1 className="font-black text-lg mb-5">Create Request Equipment</h1>
        <FormField
          control={form.control}
          name="borrower"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Borrowers Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem value={department.id} key={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <section>
          <EquipmentList control={form.control} />
        </section>

        <section className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Create Request Equipments
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
