import Transitions from '../components/misc/Transitions';

export default function Programacion() {
  return (
    <Transitions>
      <div className="w-full h-full flex flex-col bg-zircon ">
        <div className="flex flex-col px-6 xl:px-12 gap-6 pt-32 pb-6 ">
          <p className="text-5xl text-center mx-auto font-semibold bg-pastel-light-blue px-12 py-3 rounded-full shadow-figma">
            Horario
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-4 mx-auto">
              <p className="mx-auto px-5 py-3 shadow-figma rounded-3xl text-4xl font-bold ">
                Dia 1
              </p>
              <div className="relative bg-pastel-pink/50 p-8 md:px-8 px-2  rounded-3xl mx-auto flex flex-col border border-pastel-light-blue border-separate">
                <div className="flex text-4xl font-bold justify-between text-center">
                  <p className="w-1/2">Hora</p>
                  <p className="w-1/2">Evento</p>
                </div>
                <span className="h-1 bg-black/50 rounded-full w-full mx-auto my-2" />
                <div className="flex justify-between text-3xl">
                  <div className="text-center">
                    <p className="mx-12">7:00</p>
                    <p className="mx-12">8:00</p>
                    <p className="mx-12">9:00</p>
                    <p className="mx-12">10:00</p>
                  </div>
                  <span className="w-1 h-[calc(100%-64px)] absolute left-1/2 top-8 bg-black/50 rounded-full" />
                  <div className="text-center">
                    <p className="mx-12">Inicio</p>
                    <p className="mx-12">Inicio</p>
                    <p className="mx-12">Inicio</p>
                    <p className="mx-12">Inicio</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mx-auto">
              <p className="mx-auto px-5 py-3 shadow-figma rounded-3xl text-4xl font-bold ">
                Dia 2
              </p>
              <div className="relative bg-pastel-pink/50 p-8 md:px-8 px-2 rounded-3xl mx-auto flex flex-col border border-pastel-light-blue border-separate">
                <div className="flex text-4xl font-bold justify-between text-center">
                  <p className="w-1/2">Hora</p>
                  <p className="w-1/2">Evento</p>
                </div>
                <span className="h-1 bg-black/50 rounded-full w-full mx-auto my-2" />
                <div className="flex justify-between text-3xl">
                  <div className="text-center">
                    <p className="mx-12">7:00</p>
                    <p className="mx-12">8:00</p>
                    <p className="mx-12">9:00</p>
                    <p className="mx-12">10:00</p>
                  </div>
                  <span className="w-1 h-[calc(100%-64px)] absolute left-1/2 top-8 bg-black/50 rounded-full" />
                  <div className="text-center">
                    <p className="mx-12">Inicio</p>
                    <p className="mx-12">Inicio</p>
                    <p className="mx-12">Inicio</p>
                    <p className="mx-12">Inicio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transitions>
  );
}
