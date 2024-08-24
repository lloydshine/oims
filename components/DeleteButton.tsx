"use state";

import { useTransition } from "react";
import { Button } from "./ui/button";

export default function DeleteButton({
  deleteAction,
  deleteId,
  name,
}: {
  deleteAction: (id: string) => Promise<null | undefined>;
  deleteId: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      deleteAction(deleteId);
    });
  };
  return (
    <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
      Delete {name}
    </Button>
  );
}
