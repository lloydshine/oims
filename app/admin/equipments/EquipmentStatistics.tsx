import { getEquipments } from "@/actions/equipment.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigDownDash, HandCoins } from "lucide-react";
import Link from "next/link";

export async function EquipmentStatistics() {
  const equipments = await getEquipments();
  return (
    <div className="flex my-10 gap-6 items-center">
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
      <Button asChild variant="outline">
        <Link href="/admin/equipments/add">Add Equipment</Link>
      </Button>
    </div>
  );
}
