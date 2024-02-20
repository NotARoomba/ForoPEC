import { View } from "react-native";
import { BirdProps } from "../utils/Types";

export default function Bird({body, size, color}: BirdProps) {
    const x = body.position.x
    const y = body.position.y
    return <View style={{left: x, top: y, width: size.x, height: size.y, backgroundColor: color}} />
}