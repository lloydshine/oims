import { Form } from "@/lib/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as React from "react";

import Link from "next/link";
import { createDepartment } from "@/actions/department.action";

export function AddDepartmentForm() {
  return (
    <Form action={createDepartment}>
      <Button asChild className="mb-10" variant="link">
        <Link href="/admin/departments">Back</Link>
      </Button>
      <div className="flex flex-col gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Department Name"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Shortname</Label>
          <Input
            type="text"
            id="shortName"
            name="shortName"
            placeholder="Department Shortname"
          />
        </div>
        <Button type="submit">Create</Button>
      </div>
    </Form>
  );
}
