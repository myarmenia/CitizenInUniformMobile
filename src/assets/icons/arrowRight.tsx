import Svg, { Path, Rect } from "react-native-svg"


export const arrowRightIcon = (color: string = 'white') => {
    return (
        <Svg width="34" height="15" viewBox="0 0 34 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M33.7071 8.20711C34.0976 7.81658 34.0976 7.18342 33.7071 6.79289L27.3431 0.428932C26.9526 0.0384078 26.3195 0.0384078 25.9289 0.428932C25.5384 0.819457 25.5384 1.45262 25.9289 1.84315L31.5858 7.5L25.9289 13.1569C25.5384 13.5474 25.5384 14.1805 25.9289 14.5711C26.3195 14.9616 26.9526 14.9616 27.3431 14.5711L33.7071 8.20711ZM0 8.5H33V6.5H0V8.5Z" fill={color} />
        </Svg>
    )
}