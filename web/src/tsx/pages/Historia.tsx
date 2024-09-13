import Transitions from '../components/misc/Transitions';
export default function Historia() {
  return (
    <Transitions>
      <div className="w-full h-full flex flex-col bg-zircon ">
        <div className="flex flex-wrap justify-center 2xl:flex-row px-6 xl:px-12 gap-6 pt-32 pb-6 ">
        {/* <p className='text-6xl my-auto font-semibold'>Nuestra Historia</p> */}
        <div className="shadow-inner-figma flex h-fit my-auto rounded-3xl px-16 py-8 bg-pastel-light-blue">
          <p className="text-3xl my-auto md:text-4xl font-bold text-center">
            Nuestra Historia
          </p>
        </div>
          {Array(2024 - 2007)
            .fill(0)
            .map((_v, i) => (
              <img
                key={i}
                className="2xl:w-1/4 sm:w-1/3 w-11/12 "
                src={`/foros/Foro${i + 2007}${i > 11 ? '.jpg' : '.jpeg'}`}
              />
            ))}
        </div>
      </div>
    </Transitions>
  );
}
