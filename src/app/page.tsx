import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
      <main className="bg-blue-500 text-white p-4">
        <h1>Hola mundo</h1>
        <h1 className={`${titleFont.className}`}>Hola mundo</h1>
        <h1 className={`${titleFont.className}`}>Hola mundo</h1>
      </main>
  );
}
