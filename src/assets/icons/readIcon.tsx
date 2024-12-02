import Svg, { Path } from "react-native-svg"

export const readIcon = (color: string = 'black', isRead: boolean = true) => {

    return (

        <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 1L6.63884 9.72407C6.46946 9.90075 6.23976 10 6.00026 10C5.76076 10 5.53106 9.90075 5.36168 9.72407L1 5.17308" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            {
                isRead && <Path d="M20 1L11.6388 9.72407C11.4695 9.90075 11.2398 10 11.0003 10C10.7608 10 10.5311 9.90075 10.3617 9.72407L8.5 7.86239" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            }        
            </Svg>


    )
}











