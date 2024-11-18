import Svg, { Path } from "react-native-svg"

export const arrowIcon = (color: string= 'black') => {
    return (
        <Svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1.00024 7L7.00024 1L13.0002 7" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}