import Image from "next/image";
import ResumeBuilder from "./componets/cvbuilder";

export default function Home() {
  return (
  <main className="h-screen bg-slate-500">
 <ResumeBuilder/>
  </main>
  );
}
