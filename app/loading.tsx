import { CircleDotDashed } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex justify-center items-center h-80">
      <CircleDotDashed className="w-[40px] h-[40px] animate-spin" />
    </main>
  );
}
