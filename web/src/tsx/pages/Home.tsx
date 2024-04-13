import HomeModal from '../components/misc/HomeModal';
import Transitions from '../components/misc/Transitions';

export default function Home() {
  return (
    <Transitions>
      <div className="flex h-full flex-col items-center ">
        <img className="w-full h-full absolute" src={'/home-hero.png'} />
        <div className=" bg-pastel-blue opacity-20 h-full w-full absolute" />
        <HomeModal />
      </div>
    </Transitions>
  );
}
