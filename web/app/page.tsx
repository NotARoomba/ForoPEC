import Image from "next/image";
import HomeModal from "./_components/misc/HomeModal";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center bg-neutral-900">
      <Image alt="" width={1280}
  height={720}
 className="w-full h-full absolute opacity-50"  src={"/home-hero.png"}/>
        <HomeModal />
    </main>
  );
}
