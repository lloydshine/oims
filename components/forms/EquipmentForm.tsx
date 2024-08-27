"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
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
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Loader2Icon, X } from "lucide-react";
import DeleteButton from "../DeleteButton";
import { deleteEquipment } from "@/actions/equipment.action";

export const EquipmentFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(50),
  brand: z.string().min(2).max(50),
  price: z.string(),
  quantity: z.string(),
  isAvailable: z.string(),
  imageUrl: z.string().optional(),
});

interface EquipmentFormProps {
  defaultValues?: Partial<z.infer<typeof EquipmentFormSchema>>;
  onSubmit?: (values: z.infer<typeof EquipmentFormSchema>) => void;
}

export function EquipmentForm({ defaultValues, onSubmit }: EquipmentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(
    defaultValues?.imageUrl
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EquipmentFormSchema>>({
    resolver: zodResolver(EquipmentFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          id: "",
          name: "",
          brand: "",
          price: "",
          quantity: "",
          isAvailable: "",
          imageUrl: "",
        },
  });

  const handleImageDelete = async (e: any) => {
    e.preventDefault();
    setIsDeleting(true);
    const imageKey = image?.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          form.setValue("imageUrl", "");
        }
      })
      .catch(() => {
        alert("error");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleSubmit = (values: z.infer<typeof EquipmentFormSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit?.(values);
        toast({
          title: defaultValues ? "Update Equipment" : "Create Equipment",
          description: defaultValues
            ? "Equipment Successfully Updated!"
            : "Equipment Successfully Created!",
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
              {defaultValues ? "Edit Equipment" : "Add Equipment"}
            </h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Brand" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Image</FormLabel>
                  <FormControl>
                    {image ? (
                      <>
                        <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px]">
                          <Image
                            src={image}
                            alt="Item Image"
                            width={200}
                            height={200}
                            className="object-contain"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            className="absolute right-[-12px] top-0"
                            onClick={handleImageDelete}
                          >
                            {isDeleting ? (
                              <Loader2Icon className=" animate-spin" />
                            ) : (
                              <X />
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center max-w-[300px] p-10 border-2 border-dashed rounded-md">
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res);
                              setImage(res[0].url);
                              form.setValue("imageUrl", res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                            }}
                          />
                        </div>
                      </>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantity" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <section className="flex justify-end gap-8">
          {defaultValues?.id && (
            <DeleteButton
              deleteAction={deleteEquipment}
              fieldId={defaultValues.id}
            />
          )}
          <Button type="submit" disabled={isPending}>
            {defaultValues ? "Update Equipment" : "Add Equipment"}
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
