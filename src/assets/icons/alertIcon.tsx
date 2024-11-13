import { Appearance, Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "../../hooks"

export const alertIcon = (count?: number) => {
    

    const { colors } = useTheme()



    return (
        <View>
            <Svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M4.12963 14.7618C4.0231 16.786 4.14557 18.9407 2.33709 20.297C1.49537 20.9283 1 21.9191 1 22.9712C1 24.4185 2.13361 25.6498 3.61 25.6498H24.49C25.9664 25.6498 27.1 24.4185 27.1 22.9712C27.1 21.9191 26.6046 20.9283 25.7629 20.297C23.9544 18.9407 24.0769 16.786 23.9704 14.7618C23.6927 9.48558 19.3335 5.34985 14.05 5.34985C8.76645 5.34985 4.40733 9.48558 4.12963 14.7618Z" stroke={colors.ICON_COLOR} stroke-width="1.13333" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M11.8751 2.63125C11.8751 3.83247 12.8489 5.35 14.0501 5.35C15.2513 5.35 16.2251 3.83247 16.2251 2.63125C16.2251 1.43003 15.2513 1 14.0501 1C12.8489 1 11.8751 1.43003 11.8751 2.63125Z" stroke={colors.ICON_COLOR} stroke-width="1.13333" />
                <Path d="M18.4 25.6499C18.4 28.0523 16.4524 29.9999 14.05 29.9999C11.6475 29.9999 9.69998 28.0523 9.69998 25.6499" stroke={colors.ICON_COLOR} stroke-width="1.13333" stroke-linecap="round" stroke-linejoin="round" />
            </Svg>
            {count &&  <View style={{
                height: 18,
                minWidth: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: count > 0? colors.PRIMARY : 'transparent',
                borderRadius: 8,
                position: 'absolute',
                left: 16,
                paddingHorizontal: 2

            }} >
                <Text style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: colors.WHITE,
                    lineHeight: 18,
                    textAlign: 'center'
                }} >
                    {count}
                </Text>
            </View>}
        </View>
    )
}