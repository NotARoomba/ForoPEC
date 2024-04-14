import { SecretaryCardProps } from "../../utils/Types";

export default function SecretaryCard({name, img, color}: SecretaryCardProps) {
    return <div className={"rounded-3xl flex flex-col py-8 pb-6 w-1/4 hover:-translate-y-4 duration-300 justify-around shadow-figma " + color}>
        <img src={img} className="shadow-inner-figma-xl object-cover aspect-square mx-auto rounded-3xl w-5/6" />
        <p className="text-white font-bold text-4xl text-center mx-auto mt-6">{name}</p>
    </div>
}