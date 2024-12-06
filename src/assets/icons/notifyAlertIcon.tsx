import Svg, { Path, Rect } from "react-native-svg"

export const notifyAlertIcon = (color: string) => {
    return (
        <Svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="0.5" y="0.5" width="36" height="36" rx="18" stroke={color} />
            <Path d="M11.2783 17.9655C11.2007 19.4313 11.2899 20.9915 9.97336 21.9737C9.36062 22.4309 9 23.1483 9 23.9102C9 24.9583 9.82523 25.8499 10.9 25.8499H26.1C27.1748 25.8499 28 24.9582 28 23.9102C28 23.1483 27.6394 22.4309 27.0266 21.9737C25.7101 20.9915 25.7993 19.4313 25.7217 17.9655C25.5196 14.1447 22.3463 11.1499 18.5 11.1499C14.6537 11.1499 11.4804 14.1447 11.2783 17.9655Z" stroke={color} stroke-width="1.13333" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M16.916 9.18125C16.916 10.0511 17.6249 11.15 18.4993 11.15C19.3738 11.15 20.0827 10.0511 20.0827 9.18125C20.0827 8.3114 19.3738 8 18.4993 8C17.6249 8 16.916 8.3114 16.916 9.18125Z" stroke={color} stroke-width="1.13333" />
            <Path d="M21.6673 25.8501C21.6673 27.5898 20.2496 29.0001 18.5007 29.0001C16.7517 29.0001 15.334 27.5898 15.334 25.8501" stroke={color} stroke-width="1.13333" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}