import { memo, ReactNode } from "react";
import { ImageBackground, View } from "react-native";
import { useTheme } from "../hooks";


interface IProps {
    children: ReactNode
}

function Background ({ children }: IProps) {

    const { colors } = useTheme();

    return (
        <View style={{backgroundColor: colors.BACKGROUND, flex: 1}} >
            <ImageBackground
                source={require('../assets/background/background.png')}  
                resizeMode="cover"
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                }}      
            >
                {children}
            </ImageBackground>
        </View>
    )
}

export default Background;