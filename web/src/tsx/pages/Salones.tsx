import SalonCard from "../components/misc/SalonCard";
import Transitions from "../components/misc/Transitions";

export default function Salones() {
  return (
    <Transitions>
    <div className="w-full h-full flex flex-col bg-zircon ">
      <div className="flex flex-wrap px-6 xl:px-12 gap-6 pt-32 pb-6 bg-zircon ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_v, i) => { return (<SalonCard key={i} name="Salon Aurora Montes" img="/home-hero.png" color={i%2==0 ? "bg-[#b6f7e0]/50" : "bg-[#b6f7e0]/30"} />)})}
      </div>
    </div>
  </Transitions>
  );
}
