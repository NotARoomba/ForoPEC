import { View } from "react-native";
import { ObjectProps } from "../utils/Types";

export default function Floor({body, size, color}: ObjectProps) {
    const x = body.position.x - size.x / 2
    const y = body.position.y - size.y / 2
    return <View style={{left: x, top: y, width: size.x, height: size.y, backgroundColor: color}} />
}