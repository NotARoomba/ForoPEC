import SalonCard from '../components/misc/SalonCard';
import Transitions from '../components/misc/Transitions';

export default function Salones() {
  const images = [
    '/aurora.png',
    '/karime.jpg',
    '/faisal.jpg',
    '/nicolle.jpg',
    '/comision.png',
    '/un.png',
    '/ambiental.png',
  ];
  return (
    <Transitions>
      <div className="w-full h-full flex flex-col bg-zircon ">
        <div className="flex flex-wrap px-6 xl:px-12  gap-10 pt-32 pb-6 justify-center bg-zircon ">
          {[
            'Aurora Montes',
            'Karime Muvdi',
            'Faisal Gutiérrez',
            'Nicolle Sánchez',
            'Comisión Colombia',
            'UN Headquarters',
            'Comisión Ambiental',
          ].map((v, i) => {
            return (
              <SalonCard
                key={i}
                name={v}
                img={images[i]}
                link={
                  i > 3
                    ? ['/XIX FORO PEC _ COMISIÓN COLOMBIA_ GUÍA Y HANDBOOK.pdf', 'public/UN Headquarters 2025.pdf', 'public/COMISIÓN AMBIENTAL GUÍA Y HANDBOOK 2025 (1) (1).pdf'][i - 4]
                    : undefined
                }
                color={i % 2 == 0 ? ' bg-orange-dark' : ' bg-orange-dark/70'}
              />
            );
          })}
        </div>
      </div>
    </Transitions>
  );
}
