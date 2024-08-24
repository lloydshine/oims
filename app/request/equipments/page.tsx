import { createBorrow } from "@/actions/borrow.action";
import RequestEquipmentsForm from "@/components/forms/RequestEquipmentsForm";

export default function RequestEquipmentsPage() {
  return (
    <main className="p-10">
      <RequestEquipmentsForm />
    </main>
  );
}
