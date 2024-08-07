import Link from "next/link";

import { Form } from "@/lib/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth.action";

export default function LoginPage() {
  return (
    <main className="h-screen flex">
      <div className="h-full p-20 space-y-5">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <Form action={login}>
          <div className="flex flex-col gap-5">
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
            <Button type="submit">Login</Button>
          </div>
        </Form>
        <div>
          <Link href="/register">Create an account</Link>
        </div>
      </div>
      <div className="hidden md:block h-full bg-primary flex-1"></div>
    </main>
  );
}
