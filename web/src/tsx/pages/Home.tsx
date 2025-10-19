import HomeModal from '../components/misc/HomeModal';
import Transitions from '../components/misc/Transitions';

export default function Home() {
  return (
    <Transitions>
      <div className="flex h-full flex-col items-center justify-center m-auto ">
        <img
          className="w-full h-full absolute object-cover 2xl:flex hidden"
          src={'public/tresSECRETARIOS.JPG'}
        />
        <div className=" bg-pastel-light-blue 2xl:opacity-20 opacity-100 h-full w-full absolute" />
        <HomeModal />
      </div>
    </Transitions>
  );
}
