import React, { memo, useMemo, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFormData, useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { callIcon } from "../assets/icons";
import { ICategory, ISubcategory } from "../interfaces/data.types";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { appStrings } from "../assets/appStrings";
import { PNIcon } from "../assets/icons/PNIcon";
import { MIPIcon } from "../assets/icons/MIPIcon";
import CallModal from "../components/CallModal";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function SelectConnectionTypeScreen({ navigation }: IProps) {

    const [selectedItem, setSelectedItem] = useState({
        name: '',
        id: -1
    });
    const [visible, setVisible] = useState(false);


    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);


    const { width } = Dimensions.get('window');


    const size = width - 32

    return (
        <Background>
            {
                <>
                    <View style={stylesMemo.container}  >
                        <Header navigation={navigation} goBackAction={true} />
                        <View style={stylesMemo.contentContainer} >
                            <View style={stylesMemo.row}>
                                <TouchableOpacity
                                    style={[
                                        stylesMemo.item,
                                        { width: (size - 8) / 2 },
                                        selectedItem.id === 1 && stylesMemo.selectedItem

                                    ]}
                                    onPress={() => setSelectedItem({
                                        name: appStrings.pn,
                                        id: 1
                                    })}
                                >
                                    {PNIcon(colors)}
                                    <Text style={stylesMemo.title} >
                                        {appStrings.pn}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        stylesMemo.item,
                                        { width: (size - 8) / 2 },
                                        selectedItem.id === 2 && stylesMemo.selectedItem

                                    ]}
                                    onPress={() => setSelectedItem({
                                        name: appStrings.mip,
                                        id: 2
                                    })}
                                >
                                    {MIPIcon(colors)}
                                    <Text style={stylesMemo.title} >

                                        {appStrings.mip}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => setSelectedItem({
                                    name: appStrings.pnAndMip,
                                    id: 3
                                })}
                                style={[
                                    stylesMemo.item,
                                    { width: size, paddingHorizontal: 60 },
                                    selectedItem.id === 3 && stylesMemo.selectedItem
                                ]}
                            >
                                <View style={stylesMemo.row} >
                                    {PNIcon(colors)}
                                    {MIPIcon(colors)}
                                </View>
                                <Text style={stylesMemo.title} >

                                    {appStrings.pnAndMip}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Footer
                            navigation={navigation}
                            showActions={true}
                            selectedItem={selectedItem}
                            setCallAction={setVisible}
                        />
                    </View>
                </>

            }
            <CallModal
                visible={visible}
                setVisible={setVisible}
                selectedItem={selectedItem}
            />

        </Background>
    )
};


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 50
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
            elevation: 20,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.BACKGROUND_2,


        },
        row: {
            flexDirection: 'row',
            gap: 8
        },
        title: {
            fontSize: fontSize(14),
            color: colors.TEXT_COLOR,
            fontWeight: '600',
            textAlign: 'center',
        },
        selectedItem: {
            borderColor: colors.PRIMARY,
        }
    })
}  