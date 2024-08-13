import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Equipment } from "@prisma/client";

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex-row items-center justify-between">
        <h1>{equipment.name}</h1>
        <Badge>{equipment.isAvailable ? "Available" : "Not Available"}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{equipment.description}</p>
        <Image
          src="/vercel.svg"
          alt="Photo by Drew Beamer"
          className="rounded-md"
          width={300}
          height={300}
        />
      </CardContent>
      <CardFooter className="justify-between">
        <Input
          disabled={!equipment.isAvailable}
          type="number"
          className="w-[5rem]"
          value={0}
        />
        <Button disabled={!equipment.isAvailable}>Add</Button>
      </CardFooter>
    </Card>
  );
}
