import Transitions from '../components/misc/Transitions';

export default function Mapa() {
  return (
    <Transitions>
      <div className="w-full h-full flex flex-col bg-zircon ">
        <div className="flex flex-col-reverse 2xl:flex-row px-6 xl:px-12 gap-6 pt-32 pb-6 bg-zircon ">
          <iframe src="/Mapa Foro.pdf.pdf" width="100%" className="h-[85dvh]" />
        </div>
      </div>
    </Transitions>
  );
}
