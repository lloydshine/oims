import { Form } from "@/lib/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createUser } from "@/actions/user.action";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export function AddUserForm() {
  return (
    <Form action={createUser}>
      <Button asChild className="mb-10">
        <Link href="/users">Back</Link>
      </Button>
      <div className="flex gap-5 w-full justify-center">
        <div className="flex flex-col gap-5 flex-1">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="assignedOffice">Office</Label>
            <Select name="assignedOffice">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select office" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Offices</SelectLabel>
                  <SelectItem value="GUIDANCE">GUIDANCE</SelectItem>
                  <SelectItem value="OSAS">OSAS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="role">Role</Label>
            <Select name="role">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="ASSISTANT">ASSISTANT</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Firstname</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Firstname"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Middlename</Label>
            <Input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Middlename"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Lastname</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Lastname"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="text" id="email" name="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">ContactNumber</Label>
            <Input
              type="text"
              id="contactNumber"
              name="contactNumber"
              placeholder="ContactNumber"
            />
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full mt-10">
        Create
      </Button>
    </Form>
  );
}
