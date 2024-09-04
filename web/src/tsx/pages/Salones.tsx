import SalonCard from '../components/misc/SalonCard';
import Transitions from '../components/misc/Transitions';

export default function Salones() {
  const images = Array(4)
    .fill('/default.jpg')
    .concat('/comision.png', '/un.png', '/ambiental.png');
  return (
    <Transitions>
      <div className="w-full h-full flex flex-col bg-zircon ">
        <div className="flex flex-wrap px-6 xl:px-12  gap-10 pt-32 pb-6 justify-center bg-zircon ">
          {[
            'Aurora Montes',
            'María José Pupo',
            'Mateo Herrera',
            'Ashlee Yin',
            'Comisión Colombia',
            'UN Headquarters',
            'Comisión Ambiental',
          ].map((v, i) => {
            return (
              <SalonCard
                key={i}
                name={v}
                img={images[i]}
                color={i % 2 == 0 ? ' bg-orange-dark' : ' bg-orange-dark/70'}
              />
            );
          })}
        </div>
      </div>
    </Transitions>
  );
}
