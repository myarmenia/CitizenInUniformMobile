import { memo, useMemo } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IStyles } from '../contexts/ThemeContext';
import { useTheme } from '../hooks';
import { appStrings } from '../assets/appStrings';
import { arrowIcon } from '../assets/icons';
import { axiosInstance } from '../api';
import { urls } from '../api/urls';
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../screens/ChatScreen';

interface IProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onPressItem?: (item: any) => void;
    top: number;
    selectedCategory: {
        name: string;
        id: number;
    },
}

const getMessageTypes = async () => {
    return axiosInstance.get(urls.GET_MESSAGE_CATEGORY);
};


function DropDown({ visible, setVisible, top, onPressItem, selectedCategory }: IProps) {
    const { data, isError, isFetching } = useQuery({
        queryKey: ['messageTypes'],
        queryFn: getMessageTypes,
        select: (data) => data.data.result,
    });

    const DROP_DOWN_HEIGHT = data ? data?.length * 51 : 0;

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(
        () => styles({ colors, fontSize }),
        [isDarkTheme, coefficient],
    );


    const onDismiss = () => {
        setVisible(false);
    };

    const onPress = (v: {id: number, title: string}) => {
        {}
        onPressItem && onPressItem(v);
        onDismiss();
    };

    const renderItem = (item: { id: number, title: string }, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => onPress(item)}
                style={stylesMemo.item}>
                <Text style={stylesMemo.title} numberOfLines={1}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={stylesMemo.container}>
            <TouchableOpacity
                style={stylesMemo.container}
                onPress={() => setVisible(!visible)}>
                <View
                    style={[
                        stylesMemo.item,
                        stylesMemo.button,
                        { borderColor: visible ? colors.PRIMARY : colors.BACKGROUND_2 },
                    ]}>
                    <View style={stylesMemo.titleBox}>
                        <Text numberOfLines={1} style={stylesMemo.title}>
                            {selectedCategory.name ? selectedCategory.name : appStrings.category}
                        </Text>

                    </View>
                    <View style={stylesMemo.arrow} >
                        {
                            !isFetching ?
                                arrowIcon(colors.PRIMARY)
                                : <ActivityIndicator color={colors.PRIMARY} size={'small'} />
                        }
                    </View>
                </View>
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <Pressable style={stylesMemo.wrapper} onPress={onDismiss}>
                    <View
                        style={[
                            {
                                height: DROP_DOWN_HEIGHT,
                                top: top + 120,
                            },
                        ]}>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            style={{
                                height: DROP_DOWN_HEIGHT,
                                paddingHorizontal: 16,
                            }}
                            contentContainerStyle={stylesMemo.contentContainer}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

export default memo(DropDown);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            height: 50,
        },
        padding: {
            paddingHorizontal: 16,
        },
        title: {
            fontSize: fontSize(16),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            color: colors.TEXT_COLOR,
        },
        wrapper: {
            ...StyleSheet.absoluteFillObject,
        },
        item: {
            height: 50,
            justifyContent: 'center',
            backgroundColor: colors.BACKGROUND_2,
            borderBottomWidth: 1,
            borderBottomColor: colors.BUTTON_BORDER,
            flex: 1,
            paddingHorizontal: 16,
        },
        contentContainer: {
            overflow: 'hidden',
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: colors.PRIMARY,
            backgroundColor: colors.BACKGROUND_2,
        },
        button: {
            borderRadius: 8,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            gap: 16
        },
        arrow: {
            transform: [{
                rotate: '180deg',
            }],
        },
        titleBox: {
            flex: 1,
            justifyContent: 'center',
        }
    });
};
