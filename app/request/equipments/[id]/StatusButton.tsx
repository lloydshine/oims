"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getStatusButtonAttributes } from "@/lib/utils";
import { Status } from "@prisma/client";

export function StatusButton({
  updateAction,
  status,
  id,
}: {
  updateAction: (
    id: string,
    status: Status
  ) => Promise<{ success: boolean; log: string }>;
  status: Status;
  id: string;
}) {
  const getButtonAttributes = () => {
    switch (status) {
      case Status.Approved:
        return {
          text: "Approve Request",
          color: "bg-green-500 hover:bg-green-600 text-white",
        };
      case Status.Declined:
        return {
          text: "Decline Request",
          color: "bg-red-500 hover:bg-red-600 text-white",
        };
      case Status.Pending:
        return {
          text: "Mark as Pending",
          color: "bg-yellow-500 hover:bg-yellow-600 text-white",
        };
      case Status.Completed:
        return {
          text: "Mark as Completed",
          color: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      default:
        return {
          text: "Update Status",
          color: "bg-gray-500 hover:bg-gray-600 text-white",
        };
    }
  };

  const { text, color } = getButtonAttributes();

  const handleClick = async () => {
    const result = await updateAction(id, status);
    if (result.success) {
      toast({
        title: "Log",
        description: `Status updated to: ${status}`,
      });
    } else {
      console.error(result.log);
    }
  };

  return (
    <button onClick={handleClick} className={`${color} px-4 py-2 rounded-xl`}>
      {text}
    </button>
  );
}
