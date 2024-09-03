import { getBorrows } from "@/actions/borrow.action";
import { getEquipments } from "@/actions/equipment.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigDownDash, HandCoins } from "lucide-react";
import Link from "next/link";

export async function EquipmentStatistics() {
  const equipments = await getEquipments();
  const requests = await getBorrows();
  return (
    <div className="flex my-10 gap-6 items-center">
      <Card className="bg-primary text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 space-x-5">
          <CardTitle className="text-md text-primary-foreground/70">
            Total Equipmnents
          </CardTitle>
          <ArrowBigDownDash />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{equipments.length}</div>
        </CardContent>
      </Card>
      <Card className="bg-primary text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 space-x-5">
          <CardTitle className="text-md text-primary-foreground/70">
            Total Requests
          </CardTitle>
          <HandCoins />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{requests.length}</div>
        </CardContent>
      </Card>
      <Button asChild variant="outline">
        <Link href="/admin/equipments/add">Add Equipment</Link>
      </Button>
    </div>
  );
}
