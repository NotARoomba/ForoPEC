import SecretaryCard from '../components/misc/SecretaryCard';
import Transitions from '../components/misc/Transitions';

export default function Acerca() {
  return (
    <Transitions>
      <div className="w-full flex flex-col bg-zircon ">
        <div className="flex flex-col-reverse 2xl:flex-row px-6 xl:px-12 gap-6 pt-32 pb-6 ">
          <div className="bg-[#f7d4b6]/65 xl:h-[475px]  hover:shadow-inner-xl transition-all duration-300 rounded-3xl flex flex-col text-center p-6  xl:p-8 xl:px-20 2xl:w-5/12 w-full justify-around">
            <div className="m-auto">
              <p className="text-5xl font-bold my-2">Misión</p>
              <p className="lg:text-2xl text-xl">
                Nuestra misión es incentivar a los jóvenes a desarrollar un
                pensamiento crítico acerca de las problemáticas de Colombia,
                brindándoles las herramientas necesarias con el fin de lograr la
                comunicación de ideas, opiniones y soluciones en un espacio
                público, de forma respetuosa.
              </p>
            </div>
          </div>

          <div className="flex 2xl:w-7/12 flex-col lg:flex-row 2xl:flex-col gap-6">
            <div className="h-80 xl:h-[475px]">
              <img
                alt="Presenters of the XIX Foro Pensando en Colombia"
                className="rounded-3xl object-cover h-full w-full mx-auto hover:shadow-3xl transition-all duration-300 "
                src={'/about.png'}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row px-6 xl:px-12 gap-6 pb-6">
          <img
            alt="Presenters of the XIX Foro Pensando en Colombia"
            className="rounded-3xl object-cover h-full w-full mx-auto hover:shadow-3xl transition-all duration-300 "
            src={'/about2.jpg'}
          />
          <div className="bg-[#f7d4b6]/65  2xl:w-8/12 hover:shadow-inner-xl transition-all duration-300 w-full rounded-3xl flex flex-col text-center p-12 gap-2">
            <div className="my-auto">
              <p className="text-5xl font-bold  my-2">¿Quiénes somos?</p>
              <p className="lg:text-2xl text-xl">
                El XIX Foro Pensando en Colombia es un espacio creado por
                jóvenes para jóvenes, donde se dan a conocer las problemáticas
                que afectan al país y que a través de debates, ponencias y
                charlas, llegan a posibles soluciones. La intención de estos
                espacios, es desarrollar el pensamiento crítico, respetuoso e
                inclusivo de cada uno de los asistentes, teniendo en cuenta la
                opinión y percepción de los demás.
              </p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="bg-[#f7d4b6]/65 hover:shadow-inner-xl transition-all duration-300 w-full rounded-3xl flex flex-col text-center p-12 gap-2 px-10">
            <div className="my-auto">
              <p className="text-5xl font-bold my-2">Visión</p>
              <p className="lg:text-2xl text-xl">
                Para el año 2031, el Foro Pensado en Colombia será uno de los
                foros nacionales más reconocidos, en el cual se reunirán jóvenes
                nacionales e internacionales interesados en estos espacios.
                Nuestros participantes serán reconocidos por su arduo trabajo y
                excelente manejo del público, habilidades críticas, solución de
                problemas, entre otros; con el objetivo de lograr que cada
                participante crezca en todos los posibles ámbitos de su vida
                personal y académica.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-fit lg:h-full bg-zircon pt-32 w-full flex px-8">
        <div className="m-auto w-full flex flex-col">
          <div className="flex flex-col md:flex-row gap-8 mx-auto justify-center">
            <SecretaryCard
              name="María Alejandra Torres"
              img="/Male.png"
              color="bg-flag-yellow"
            />
            <SecretaryCard
              name="Santiago Colpas"
              img="/Colpas.png"
              color="bg-flag-blue"
            />
            <SecretaryCard
              name="Luciana Lacouture"
              img="/Luciana.png"
              color="bg-flag-red"
            />
          </div>
          <div className="shadow-inner-figma rounded-3xl mx-auto px-12 py-8 bg-pastel-light-blue my-8">
            <p className="text-3xl md:text-4xl font-bold text-center">
              Secretarios Generales Foro PEC XIX
            </p>
          </div>
        </div>
      </div>

      <div className="pt-32 w-full flex px-8 flex-col bg-zircon">
        <div className="flex flex-col lg:flex-row mx-auto gap-8 w-full ">
          <iframe src="/XIX FORO PEC _ COMISIÓN COLOMBIA_ GUÍA Y HANDBOOK.pdf" width="100%" className="aspect-[3/4]" />
          <iframe src="/COMISIÓN AMBIENTAL GUÍA Y HANDBOOK 2025 (1) (1).pdf" width="100%" className="aspect-[3/4]" />
          <iframe src="/UN Headquarters 2025.pdf" width="100%" className="aspect-[3/4]" />
        </div>
        <div className="shadow-inner-figma rounded-3xl mx-auto px-12 py-8 bg-pastel-light-blue my-8">
          <p className="text-3xl md:text-4xl font-bold text-center mb-">
            Handbooks 2025
          </p>
        </div>
      </div>
    </Transitions>
  );
}
