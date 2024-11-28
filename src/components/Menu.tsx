import React, { memo, useMemo } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { ICategory, ISubcategory } from "../interfaces/data.types";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { navigationTypes } from "../navigation/navigation.types";

interface IProps {
    data?: ICategory[] | ISubcategory[];
    onPress?: (v: ISubcategory) => void;
    navigation: NavigationProp<ParamListBase>
    iconUrl?: string
}

function Menu({ data, onPress, navigation, iconUrl }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])
    const { width } = Dimensions.get('window')


    const handlePress = (item: ICategory | ISubcategory) => {
        if (onPress ) {
            onPress(item as ISubcategory);
        } else {
            navigation.navigate(navigationTypes.CATEGORY, { data: item });
        }
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const size = (width - 32 - 10) / 2

        const isLastItem = (index === data?.length! - 1) && data!.length > 1 && data!.length % 2;

        return (
            <TouchableOpacity
                style={[stylesMemo.item, { width: size, marginLeft: isLastItem ? size / 2 : undefined }]}
                onPress={() => handlePress(item)}
            >

                <Image
                    style={[stylesMemo.img]}
                    source={{ uri: iconUrl ? iconUrl : item?.icon }}
                />
                <Text style={stylesMemo.title} >{item?.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={stylesMemo.container} >
            <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{
                    gap: 10
                }}
                contentContainerStyle={stylesMemo.contentContainer}
            />
        </View>
    )
}

export default memo(Menu);



const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingTop: 40,
        },
        item: {
            padding: 16,
            alignItems: 'center',
            marginBottom: 8,
            backgroundColor: colors.BACKGROUND_2,
            gap: 16,
            borderRadius: 6,
            shadowColor: colors?.SHADOW,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 20
        },
        contentContainer: {
            paddingHorizontal: 16,
            flexGrow: 1,
            paddingBottom: 130
        },
        title: {
            fontSize: fontSize(14),
            color: colors.TEXT_COLOR,
            fontWeight: '600',
            textAlign: 'center',
        },
        img: {
            width: 55,
            height: 55,
            borderRadius: 30
        }
    })
}  