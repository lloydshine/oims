import { Status } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorForDepartment(shortName: string): string {
  switch (shortName) {
    case "COC":
      return "bg-gray-200"; // College of Criminology
    case "CCS":
      return "bg-green-500"; // College of Computer Studies
    case "CAS":
      return "bg-red-500"; // College of Arts and Sciences
    case "CBA":
      return "bg-yellow-500"; // College of Business Administration
    case "COED":
      return "bg-gray-400"; // College of Education
    case "COE":
      return "bg-purple-600"; // College of Engineering
    default:
      return "bg-gray-200"; // Default color if not matched
  }
}

export function getStatusButtonAttributes(status: Status) {
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
        color: "bg-black text-white",
      };
    default:
      return {
        text: "Update Status",
        color: "bg-gray-500 hover:bg-gray-600 text-white",
      };
  }
}
