import Image from "next/image";
import LinkButton from "./LinkButton";

export default function HomeModal() {
    return <div className="bg-white flex flex-col min-w-128 z-10 min-h-136 my-auto translate-y-16 ml-auto mr-28 rounded-3xl">
        <div className="m-auto"><Image alt="XVIII Foro Pensando en Colombia" width={550}
  height={350}  className="w-3/4 mx-auto"  src={"/foro-logo.png"} />
  <br className="my-6" />
  <LinkButton text="Inscribete" href="https://google.com" color="bg-flag-yellow" />
  <LinkButton text="Inscripcion de ponencias" href="https://google.com" color="bg-flag-blue" />
  <LinkButton text="Inscripcion de sponsors" href="https://google.com" color="bg-flag-red" /></div>
    </div>
}