import { View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "../../hooks"
import { ColorScheme } from "../../contexts/ThemeContext"

export const callIcon = (colors: ColorScheme,  disabled: boolean = false) => {

    return (
        <View style={{
            width: 62,
            height: 62,
            backgroundColor: disabled ? colors.DISABLED : colors.PRIMARY,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M30.8987 32.5158L30.8691 32.5515C29.8105 33.6914 28.5274 34.2426 26.8986 34.2426C26.7525 34.2426 26.6116 34.2365 26.4517 34.2295L26.4417 34.2291C23.9026 34.0638 21.6061 33.1038 19.8467 32.2701C15.2565 30.0449 11.2344 26.9005 7.89115 22.9041C5.13016 19.5865 3.28346 16.4962 2.06111 13.1783L2.06066 13.1771C1.266 11.0371 0.973205 9.30426 1.10079 7.69699C1.20493 6.45653 1.70115 5.3925 2.58616 4.50749L5.24419 1.84946C5.92775 1.19948 6.67568 0.888184 7.4292 0.888184C8.19221 0.888184 8.93204 1.20129 9.58488 1.84145L9.58994 1.84642L9.59514 1.85123C10.0688 2.29008 10.5522 2.78028 11.0212 3.26353L11.0214 3.26369L11.042 3.28488C11.2764 3.52624 11.5076 3.76418 11.7526 4.00918L13.8739 6.13053L13.8756 6.13216C14.576 6.82614 14.9092 7.59387 14.9092 8.33968C14.9092 9.08369 14.5703 9.85241 13.8739 10.5488L13.8724 10.5504C13.653 10.7697 13.4303 10.9925 13.2142 11.2158C12.6097 11.8344 11.9929 12.458 11.3365 13.0515L11.0708 13.2918L11.2129 13.6208C11.7126 14.7768 12.4231 15.8965 13.4579 17.2062L13.4578 17.2063L13.4627 17.2123C15.5054 19.717 17.6514 21.6772 20.0241 23.1838C20.2833 23.3488 20.5679 23.4943 20.852 23.6363C21.0818 23.7512 21.3107 23.8659 21.5309 23.9926L21.8629 24.1838L22.1339 23.9128L24.6824 21.3644C25.3534 20.6934 26.1071 20.3647 26.863 20.3647C27.6181 20.3647 28.3617 20.6925 29.0085 21.3646L29.0084 21.3647L29.0152 21.3715L33.2935 25.6498C33.9795 26.3357 34.2952 27.0981 34.2967 27.8377C34.2982 28.5785 33.9844 29.3556 33.3005 30.0683L33.3003 30.0686C32.9799 30.4029 32.6439 30.732 32.3118 31.05L32.3093 31.0524C32.2743 31.0864 32.2393 31.1203 32.2043 31.1542C31.7541 31.5908 31.3013 32.0299 30.8987 32.5158ZM30.9009 32.5177C30.9028 32.5156 30.9034 32.5152 30.9017 32.5169L30.9009 32.5177ZM1.84141 7.76085L1.84138 7.76085L1.84097 7.76611C1.71937 9.29363 2.01909 10.9428 2.76779 12.942C3.9729 16.194 5.79197 19.2177 8.47544 22.4479L8.4764 22.4491C11.7459 26.3609 15.6889 29.4451 20.1815 31.6192L20.1844 31.6206C21.8252 32.4015 24.0685 33.3488 26.5036 33.5047L26.5062 33.5048C26.626 33.5119 26.768 33.5199 26.9057 33.5199C28.2972 33.5199 29.4079 33.0546 30.3262 32.0643L30.335 32.0548L30.3433 32.0449C30.7702 31.534 31.2416 31.0763 31.7188 30.6131C31.744 30.5886 31.7692 30.5641 31.7944 30.5396C32.1293 30.2189 32.4496 29.9061 32.7574 29.5765C33.2452 29.0677 33.546 28.4952 33.5509 27.8762C33.5558 27.2521 33.2593 26.6857 32.7691 26.1956L32.7688 26.1953L28.4827 21.9162C28.1679 21.5795 27.6054 21.1301 26.863 21.1301C26.2482 21.1301 25.6799 21.437 25.2068 21.9101L22.5444 24.5725C22.4326 24.6843 22.1896 24.9101 21.8373 24.9101C21.6976 24.9101 21.5477 24.8763 21.3758 24.7877L21.3758 24.7876L21.3705 24.785C21.3704 24.7849 21.3697 24.7846 21.3681 24.7837L21.3557 24.7767L21.3538 24.7756C21.346 24.7711 21.3335 24.764 21.3183 24.7558C21.0648 24.5961 20.7878 24.4545 20.5111 24.3162C20.456 24.288 20.4017 24.2605 20.3482 24.2334C20.0892 24.1023 19.8484 23.9804 19.6186 23.8308L19.6186 23.8308L19.6138 23.8277C17.1887 22.2876 14.9791 20.2834 12.8733 17.6866C11.7106 16.2243 10.9774 15.0148 10.4517 13.7556C10.4463 13.7405 10.4415 13.7285 10.4389 13.7222L10.4383 13.7207C10.4376 13.7188 10.437 13.7174 10.4366 13.7165C10.3754 13.532 10.3432 13.3688 10.3627 13.2102C10.3807 13.0634 10.4487 12.8754 10.6729 12.6512L10.6978 12.6263C11.3382 12.0584 11.9232 11.4666 12.524 10.8588C12.5739 10.8082 12.624 10.7576 12.6742 10.7068C12.7856 10.5954 12.8967 10.4825 13.0062 10.3713L13.0071 10.3704C13.1177 10.258 13.2266 10.1473 13.3353 10.0387C13.8292 9.54471 14.1509 8.97655 14.1509 8.35392C14.1509 7.73129 13.8292 7.16312 13.3353 6.66918L11.2164 4.55032C11.0923 4.42268 10.9684 4.29697 10.8467 4.17354L10.8436 4.17041C10.7197 4.04474 10.5982 3.92146 10.4787 3.79842L10.4787 3.79841L10.4762 3.79585C10.4124 3.73117 10.349 3.66672 10.2859 3.60253C9.87684 3.18655 9.4783 2.78127 9.05856 2.39237C8.58738 1.91636 8.02784 1.63224 7.4292 1.63224C6.82649 1.63224 6.25249 1.91378 5.77208 2.37763L5.77202 2.37757L5.76582 2.38377L3.1177 5.0319C2.35056 5.79904 1.93723 6.69882 1.84141 7.76085Z" fill="#46593A" stroke="white" />
            </Svg>
        </View>

    )
}