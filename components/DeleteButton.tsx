"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export default function DeleteButton({
  deleteAction,
  fieldId,
}: {
  deleteAction: (fieldId: string) => Promise<void>;
  fieldId: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteAction(fieldId);
      toast({ title: "Delete", description: "Success" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={(e) => handleClick(e)}
      disabled={loading}
    >
      Delete
    </Button>
  );
}
