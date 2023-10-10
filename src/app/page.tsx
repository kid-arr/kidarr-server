import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-6 p-24">
      <h1>I am home</h1>
      <a href="/map">Map me</a>
    </main>
  );
}
