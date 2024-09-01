import { getEquipments } from "@/actions/equipment.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export async function EquipmentList() {
  const equipments = await getEquipments();

  return (
    <>
      <h1>Equipments</h1>
      <section className="flex flex-wrap max-h-[400px] h-[400px] gap-2">
        {equipments.map((equipment) => (
          <Card className="w-[300px] h-[350px]" key={equipment.id}>
            <CardHeader>{equipment.name}</CardHeader>
            <CardContent className="h-[200px]">
              <Image
                src={equipment.imageUrl ? equipment.imageUrl : "/vercel.svg"}
                alt="Photo by Drew Beamer"
                className="rounded-md"
                width={200}
                height={200}
              />
            </CardContent>
            <CardFooter>
              <Button variant="link">
                <Link href={`/admin/equipments/${equipment.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </>
  );
}
