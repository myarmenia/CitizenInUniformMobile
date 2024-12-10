import React, { useEffect, useState } from 'react';
import {
    Alert,
    PermissionsAndroid,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { AppNavigation } from './src/navigation/AppNavigation';
import { SocketProvider } from './src/contexts/SocketContext';
import { ModalProvider } from './src/contexts/ModalContext';
import CustomModal from './src/components/Modal';
import { ThemeProvider } from './src/contexts/ThemeContext';
import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkColors } from './src/assets/appColors';
import { CustomFormProvider } from './src/contexts/FormContext';
import { createUser, handleUser } from './src/services/asyncStoryge';
import { ChatProvider } from './src/contexts/ChatContext';
import { useChat } from './src/hooks/useChat';
import notifee, { AndroidVisibility } from '@notifee/react-native';
import { updateFMCToken } from './src/api/requests';
import messaging from '@react-native-firebase/messaging';
import Loading from './src/components/Loading';
import { NotifyProvider } from './src/contexts/NotifyContext';
import { checkNetworkStatus, handleNotificationPermission } from './src/helpers';
import { sleep } from './src/screens/ChatScreen';
import { useNetInfo } from '@react-native-community/netinfo';


const queryClient = new QueryClient();

// Alert.alert(
//     'Ooooops!',
//     'Check connection!.',
//     [
//         {
//             text: 'OK',
//             onPress: () => { }
//         },
//     ],
//     { cancelable: false }
// );

function App(): React.JSX.Element {

    const [isLoading, setIsLoading] = useState(true);
    const { isConnected } = useNetInfo();



    // const { } = useChat()

    useEffect(() => {
        console.log('Loading');

        (async () => {
            const isAvailableUser = await handleUser();
            const isConnected = await checkNetworkStatus()
            if (!isAvailableUser && isConnected) {
                await createUser();
            }

            setIsLoading(false)
            messaging().getToken().then(async (token) => {
                console.log('FCM token: ', token);
                await updateFMCToken(token);
            });
            handleNotificationPermission()
            
        })()
        
    }, [])


    return (
        <View style={styles.flex}>


            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <SocketProvider>
                        <ChatProvider>
                            <CustomFormProvider>
                                <ModalProvider>
                                    <NotifyProvider>
                                        <StatusBar />
                                        {isLoading
                                            ? <Loading />

                                            : <AppNavigation />
                                        }
                                        <CustomModal />
                                    </NotifyProvider>
                                </ModalProvider>
                            </CustomFormProvider>
                        </ChatProvider>
                    </SocketProvider>
                </ThemeProvider>
            </QueryClientProvider>


        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: darkColors.BACKGROUND
    },
});

export default App;
