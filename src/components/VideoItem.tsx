

import React, { memo, ReactNode, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import Video, { VideoRef } from 'react-native-video';
import { playIcon } from "../assets/icons/playIcon";

interface IProps {
    url: string;
}

function VideoItem({ url }: IProps) {
    const { width } = useWindowDimensions();

    const [isPlaying, setIsPlaying] = useState(false);

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])
    const videoRef = useRef<VideoRef>(null);

    const handlePlayPress = () => {
        setIsPlaying(!isPlaying);
        
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.resume();
        }
    }

    return (
        <Pressable style={stylesMemo.container}  onPress={handlePlayPress} >
            <Video
                source={{uri: url}}
                style={[stylesMemo.backgroundVideo, { width: width - 32}]}
                resizeMode="contain"
                repeat={false} 
                paused={true}
                ref={videoRef}
                onEnd={() => setIsPlaying(false)}
            />
            <View style={stylesMemo.buttonWrapper}>
                {!isPlaying && playIcon()}
            </View>
        </Pressable>
    )

}

export default memo(VideoItem);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
           marginVertical: 15
        },

        title: {
            fontSize: fontSize(16),
            fontWeight: '600',
            lineHeight: 22,
            fontFamily: 'NotoSansArmenian',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
        },
        backgroundVideo: {
            
            height: 200,
        },
        buttonWrapper: {
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
        }
    })
}  