import Navbar from "@/components/marketing/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="h-screen flex flex-col justify-center items-center">
        <h1 className="md:text-8xl text-2xl text-center font-bold text-primary">
          OFFICE OF STUDENT AFFAIRS
        </h1>
        <p className="w-[80%] text-center md:text-2xl text-muted-foreground my-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
          molestiae? Nostrum deleniti sequi error adipisci eius ea autem neque
          quibusdam modi at, repellendus, sunt dolorum veritatis. Quae cum
          quibusdam nisi!
        </p>
        <div className="flex gap-10">
          <Button>Learn More</Button>
          <Button variant="ghost">Apply</Button>
        </div>
      </section>
      <section className="bg-primary h-[30vh]"></section>
    </main>
  );
}
