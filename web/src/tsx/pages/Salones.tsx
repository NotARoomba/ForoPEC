import SalonCard from "../components/misc/SalonCard";
import Transitions from "../components/misc/Transitions";

export default function Salones() {
  return (
    <Transitions>
    <div className="w-full h-full flex flex-col bg-zircon ">
      <div className="grid grid-cols-4 grid-rows-2 flex-col-reverse 2xl:flex-row px-6 xl:px-12 gap-6 pt-32 pb-6 bg-zircon ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_v, i) => { return (<SalonCard key={i} name="Salon Aurora Montes" img="/home-hero.png" color="bg-[#b6f7e0]/20" />)})}
      </div>
    </div>
  </Transitions>
  );
}
