import {CardProps} from '../../utils/Types';

export default function SalonCard({name, img, color}: CardProps) {
  return (
    <div
      className={
        'rounded-3xl flex flex-col mx-auto aspect-square py-8 pb-6 w-5/6 lg:w-96 max-w-96 hover:-translate-y-4 duration-300 justify-around shadow-inner-figma-lg ' +
        color
      }>
      <img
        src={img}
        className="shadow-inner-figma-xl object-cover aspect-square mx-auto rounded-3xl w-4/6"
      />
      <p className="text-black font-bold text-2xl xl:text-3xl text-center mx-auto mt-6">
        {name}
      </p>
    </div>
  );
}
