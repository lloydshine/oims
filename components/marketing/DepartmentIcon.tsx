import { Department } from "@prisma/client";

export function DepartmentIcon({ department }: { department: Department }) {
  let bgColor;
  switch (department.shortName) {
    case "COC":
      bgColor = "bg-gray-700"; // College of Criminology
      break;
    case "CCS":
      bgColor = "bg-green-500"; // College of Computer Studies
      break;
    case "CAS":
      bgColor = "bg-red-500"; // College of Arts and Sciences
      break;
    case "CBA":
      bgColor = "bg-yellow-500"; // College of Business Administration
      break;
    case "COED":
      bgColor = "bg-gray-400"; // College of Education
      break;
    case "COE":
      bgColor = "bg-purple-600"; // College of Engineering
      break;
    default:
      bgColor = "bg-red-200"; // Default color if not matched
  }
  return (
    <div
      className={`rounded-full w-14 h-14 ${bgColor} flex items-center justify-center`}
    >
      <h1 className="font-semibold text-white text-center">
        {department.shortName}
      </h1>
    </div>
  );
}
