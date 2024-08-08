"use client";

import { logout } from "@/actions/auth.action";
import { Button } from "../ui/button";

export function LogoutButton() {
  return (
    <Button onClick={() => logout()} variant="destructive">
      Logout
    </Button>
  );
}
