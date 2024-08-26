import Transitions from "../components/misc/Transitions";

export default function Mapa() {
  return (
    <Transitions>
    <div className="w-full h-full flex flex-col bg-zircon ">
      <div className="flex flex-col-reverse 2xl:flex-row px-6 xl:px-12 gap-6 pt-32 pb-6 bg-zircon ">
      <iframe src="/map.pdf" width="100%" height="500px" />
      </div>
    </div>
    </Transitions>
  );
}
