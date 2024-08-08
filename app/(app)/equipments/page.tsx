import { ModeToggle } from "@/components/theme-provider";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { getEquipments } from "@/actions/equipment.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigDownDash, HandCoins } from "lucide-react";

export default async function EqipmentsPage() {
  const equipments = await getEquipments();
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Equipments</h1>
        <ModeToggle />
      </header>
      <br />
      <div className="flex my-10 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 space-x-5">
            <CardTitle className="text-[11px] font-medium">
              Total Equipmnents
            </CardTitle>
            <ArrowBigDownDash />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipments.length}</div>
            <p className="text-xs text-muted-foreground">10 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 space-x-5">
            <CardTitle className="text-[11px] font-medium">
              Recent Borrows
            </CardTitle>
            <HandCoins />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{10}</div>
            <p className="text-xs text-muted-foreground">10 from last month</p>
          </CardContent>
        </Card>
      </div>
      <DataTable columns={columns} data={equipments} />
    </section>
  );
}
