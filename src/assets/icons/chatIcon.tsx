import { View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "../../hooks"

export const chatIcon = (disabled: boolean = false) => {
    const { colors } = useTheme()

    return (

        <View style={{
            width: 62,
            height: 62,
            backgroundColor: disabled ? colors.DISABLED : colors.PRIMARY,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
        }} >
            <Svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.10522 4.90925V23.9814L7.16665 19.6574C7.85898 19.1636 8.6882 18.8981 9.53864 18.8981H22.8698C24.6112 18.8981 26.023 17.4864 26.023 15.7449V1.75606H4.25842C2.51697 1.75606 1.10522 3.1678 1.10522 4.90925Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M30.4332 10.3065H33.3781C35.1194 10.3065 36.5313 11.7184 36.5313 13.4603V32.5322L30.4699 28.2084C29.7776 27.7145 28.9484 27.4491 28.0981 27.4491H14.7664C13.0252 27.4491 11.6133 26.0372 11.6133 24.2953V23.3076" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M20.6676 7.76172H7.93018" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M20.6676 12.9062H7.93018" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </Svg>

        </View>



    )
}