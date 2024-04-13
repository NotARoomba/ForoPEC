import Image from "next/image";

export default function Acerca() {
    return <div className="w-full h-full flex bg-pastel-light-blue">
        <div className="m-auto h-full flex px-12 gap-6 pt-32 pb-6 ">
            <div className="bg-white shadow-inner-xl rounded-3xl flex flex-col text-center p-12 w-1/2 justify-around">
                <p className="text-5xl font-bold">Quienes somos?</p>
                <p className="text-2xl">El XVIII Foro Pensando en Colombia es un espacio creado por jóvenes para jóvenes, donde se dan a conocer las problemáticas que afectan al país y que a través de debates, ponencias y charlas, llegan a posibles soluciones. La intención de estos espacios, es desarrollar el pensamiento crítico, respetuoso e inclusivo de cada uno de los asistentes, teniendo en cuenta la opinión y percepción de los demás.</p>
                <p className="text-5xl font-bold mt-12">Visión</p>
                <p className="text-2xl">Para el año 2031, el Foro Pensado en Colombia será uno de los foros nacionales más reconocidos, en el cual se reunirán jóvenes nacionales e internacionales interesados en estos espacios. Nuestros participantes serán reconocidos por su arduo trabajo y excelente manejo del público, habilidades críticas, solución de problemas, entre otros; con el objetivo de lograr que cada participante crezca en todos los posibles ámbitos de su vida personal y académica.</p>
            </div>  
            <div className="flex w-1/2 h-full flex-col gap-6">
            <Image alt="Presenters of the XVII Foro Pensando en Colombia" width={1270}
  height={800}  className="rounded-3xl mx-auto h-5/6 object-cover"  src={"/about.png"} />
            <div className="bg-white shadow-inner-xl w-full rounded-3xl flex flex-col text-center p-12 gap-2">
            <p className="text-5xl font-bold">Misión</p>
                <p className="text-xl">El XVIII Foro Pensando en Colombia es un espacio creado por jóvenes para jóvenes, donde se dan a conocer las problemáticas que afectan al país y que a través de debates, ponencias y charlas, llegan a posibles soluciones. La intención de estos espacios, es desarrollar el pensamiento crítico, respetuoso e inclusivo de cada uno de los asistentes, teniendo en cuenta la opinión y percepción de los demás.</p>
            </div> 
            </div>
               

        </div>
    </div>
}