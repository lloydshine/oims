import Link from "next/link";
import { Form } from "@/lib/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { register } from "@/actions/auth.action";

export default async function RegisterPage() {
  return (
    <main className="flex h-screen">
      <div className="hidden md:block h-full bg-primary flex-1"></div>
      <div className="p-20 space-y-5">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <Form action={register}>
          <div className="space-y-5">
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
            <Button type="submit">Register</Button>
          </div>
        </Form>
        <div>
          <Link href="/login" className="text-muted-foreground">
            Already have an account?
          </Link>
        </div>
      </div>
    </main>
  );
}
