import Svg, { G, Path } from "react-native-svg"
import { darkColors } from "../appColors"

export const playIcon = (color: string = 'black') => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={darkColors.PRIMARY} height="40px" width="40px"  id="Capa_1" viewBox="0 0 17.804 17.804" >
            <G>
                <G id="c98_play">
                    <Path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313    c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04    c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z" />
                </G>
                <G id="Capa_1_78_">
                </G>
            </G>
        </Svg>
    )
}