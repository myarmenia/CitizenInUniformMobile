import { View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "../../hooks"
import { ColorScheme } from "../../contexts/ThemeContext"

export const PNIcon = (colors: ColorScheme, disabled: boolean = false) => {

    return (
        <View style={{
            width: 55,
            height: 55,
            backgroundColor: disabled ? colors.DISABLED : colors.PRIMARY,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M17.5682 9.78335C17.5682 8.64295 16.6404 7.71513 15.5 7.71513C14.3596 7.71513 13.4318 8.64295 13.4318 9.78335C13.4318 10.9237 14.3596 11.8516 15.5 11.8516C16.6404 11.8516 17.5682 10.9237 17.5682 9.78335ZM14.34 9.78335C14.34 9.14373 14.8604 8.62333 15.5 8.62333C16.1396 8.62333 16.66 9.14373 16.66 9.78335C16.66 10.423 16.1396 10.9434 15.5 10.9434C14.8604 10.9434 14.34 10.423 14.34 9.78335ZM30.1221 13.5724C30.6061 13.5724 31 13.1785 31 12.6944V10.3972C31 9.91316 30.6061 9.5193 30.1221 9.5193H23.9876C23.8593 9.5193 23.7322 9.48636 23.6201 9.42406L15.9541 5.16513V3.63281H19.4529C19.937 3.63281 20.3309 3.23896 20.3309 2.75488V0.87793C20.3309 0.393857 19.937 0 19.4529 0H15.9238C15.4398 0 15.0459 0.393857 15.0459 0.87793V5.16513L11.1229 7.34458C11.0177 7.40309 10.94 7.50101 10.9069 7.61681C10.8738 7.73261 10.888 7.85681 10.9465 7.9621C11.0684 8.18134 11.345 8.26041 11.564 8.13853L15.5 5.95188L23.179 10.218C23.4264 10.3552 23.7046 10.4274 23.9876 10.4275H30.0918V12.6642H0.908203V10.4275H7.01236C7.29463 10.4275 7.57423 10.3551 7.82096 10.218L9.72286 9.16135C9.77526 9.13253 9.82145 9.09365 9.85878 9.04694C9.89611 9.00022 9.92385 8.94659 9.9404 8.88913C9.95695 8.83167 9.96199 8.7715 9.95523 8.71208C9.94846 8.65267 9.93003 8.59517 9.90099 8.5429C9.87194 8.49063 9.83286 8.44461 9.78599 8.40748C9.73911 8.37035 9.68536 8.34284 9.62783 8.32654C9.57029 8.31024 9.51011 8.30546 9.45072 8.31249C9.39134 8.31951 9.33392 8.33819 9.28178 8.36746L7.37988 9.42406C7.26742 9.48645 7.14096 9.51922 7.01236 9.5193H0.87793C0.393857 9.5193 0 9.91316 0 10.3972V12.6944C0 13.1785 0.393857 13.5724 0.87793 13.5724H0.908203V28.2837C0.395613 28.3576 0 28.799 0 29.3324V29.9392C0 30.5242 0.475354 31 1.05957 31H29.9404C30.5246 31 31 30.5242 31 29.9392V29.3324C31 28.7991 30.6044 28.3576 30.0918 28.2837V13.5724H30.1221ZM15.9541 0.908203H19.4226V2.72461H15.9541V0.908203ZM27.3672 14.3292V13.5724H29.1836V28.2716H27.3672V27.5147C27.3672 26.982 26.9716 26.5411 26.459 26.4673V15.3767C26.9716 15.3029 27.3672 14.8619 27.3672 14.3292ZM22.4398 13.5724H26.459V14.3292C26.459 14.4127 26.3911 14.4806 26.3076 14.4806H22.5912C22.5511 14.4805 22.5126 14.4646 22.4842 14.4362C22.4558 14.4078 22.4399 14.3693 22.4398 14.3292V13.5724ZM26.459 27.5148V28.2716H22.4398V27.5148C22.4398 27.4313 22.5077 27.3634 22.5912 27.3634H26.3076C26.3911 27.3634 26.459 27.4313 26.459 27.5148ZM9.46838 14.3292V13.5724H21.5316V14.3292C21.5316 14.8619 21.9272 15.3029 22.4398 15.3767V21.1333C22.4398 21.3842 22.6431 21.5874 22.8939 21.5874C23.1448 21.5874 23.348 21.3842 23.348 21.1333V15.3888H25.5508V26.4552H23.348V23.2525C23.348 23.0016 23.1448 22.7984 22.8939 22.7984C22.6431 22.7984 22.4398 23.0016 22.4398 23.2525V26.4673C21.9272 26.5411 21.5316 26.982 21.5316 27.5147V28.2716H19.0437V20.8757C19.0437 20.2914 18.5683 19.8161 17.9841 19.8161H13.0158C12.4316 19.8161 11.9563 20.2914 11.9563 20.8757V28.2716H9.46832V27.5147C9.46832 26.982 9.07271 26.5411 8.56012 26.4673V15.3767C9.07277 15.3029 9.46838 14.8619 9.46838 14.3292ZM18.1355 20.8757V28.2716H12.8645V20.8757C12.8645 20.7922 12.9323 20.7243 13.0158 20.7243H17.9841C18.0676 20.7243 18.1355 20.7922 18.1355 20.8757ZM4.54102 13.5724H8.56018V14.3292C8.56018 14.4127 8.4923 14.4806 8.40881 14.4806H4.69238C4.65225 14.4805 4.61377 14.4646 4.58539 14.4362C4.55701 14.4078 4.54105 14.3693 4.54102 14.3292V13.5724ZM8.40881 27.3634C8.4923 27.3634 8.56018 27.4313 8.56018 27.5148V28.2716H4.54102V27.5148C4.54102 27.4313 4.60889 27.3634 4.69238 27.3634H8.40881ZM5.44922 26.4552V15.3888H7.65197V26.4552L5.44922 26.4552ZM1.81641 13.5724H3.63281V14.3292C3.63281 14.8619 4.02843 15.3029 4.54102 15.3767V26.4673C4.02843 26.5411 3.63281 26.982 3.63281 27.5147V28.2716H1.81641V13.5724ZM30.0918 29.9392C30.0918 30.0233 30.0239 30.0918 29.9404 30.0918H1.05957C0.976076 30.0918 0.908203 30.0233 0.908203 29.9392V29.3324C0.908203 29.2483 0.976076 29.1798 1.05957 29.1798H29.9404C30.0239 29.1798 30.0918 29.2483 30.0918 29.3324V29.9392ZM11.5855 18.122H19.4146C19.8987 18.122 20.2925 17.7281 20.2925 17.2441V16.1445C20.2925 15.6604 19.8987 15.2665 19.4146 15.2665H11.5855C11.1014 15.2665 10.7075 15.6604 10.7075 16.1445V17.2441C10.7075 17.7281 11.1014 18.122 11.5855 18.122ZM11.6157 16.1747H19.3843V17.2138H11.6157V16.1747Z" fill="white" />
            </Svg>

        </View>

    )
}