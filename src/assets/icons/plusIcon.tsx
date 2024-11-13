import Svg from "react-native-svg"
import { useTheme } from "../../hooks"
import { Line } from "react-native-svg"
export const plusIcon = (color: string) => {

    return (
        <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Line x1="2" y1="9.1333" x2="16" y2="9.1333" stroke={color} strokeWidth="5" strokeLinecap="round" />
            <Line x1="9" y1="16.1333" x2="9" y2="2.1333" stroke={color} strokeWidth="5" strokeLinecap="round" />
        </Svg>
    )
}

export const minusIcon = (color: string) => {

    return (
        <Svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Line x1="2" y1="2.1333" x2="16" y2="2.1333" stroke={color} strokeWidth="5" strokeLinecap="round" />
        </Svg>
    )
}
