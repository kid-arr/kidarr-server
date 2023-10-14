import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-6 p-24">
      <h1>I am home</h1>
      <Button asChild variant={"default"}>
        <Link href="/map">Map me</Link>
      </Button>
    </main>
  );
}
