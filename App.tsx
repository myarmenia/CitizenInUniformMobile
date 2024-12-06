import React, { useEffect, useState } from 'react';
import {
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
import { create } from 'domain';


const queryClient = new QueryClient();


function App(): React.JSX.Element {

    const [isLoading, steIsLoading] = useState(true);



    // const { } = useChat()

    useEffect(() => {
        (async () => {
            const  isAvailableUser = await handleUser()
            const user = !isAvailableUser &&  await createUser();
            if (user || isAvailableUser) {
                await notifee.requestPermission()
                steIsLoading(false)
                await messaging().getToken().then(async (token) => {
                    console.log({ token });
                    await updateFMCToken(token);
                
                })
            }
        })()
    }, [])


    return (
        <View style={styles.flex}>
            {
                isLoading
                    ? <Loading />
                    : <QueryClientProvider client={queryClient}>
                        <ThemeProvider>
                            <SocketProvider>
                                <ChatProvider>
                                    <CustomFormProvider>
                                        <ModalProvider>
                                            <StatusBar />
                                            <AppNavigation />
                                            <CustomModal />
                                        </ModalProvider>
                                    </CustomFormProvider>
                                </ChatProvider>
                            </SocketProvider>
                        </ThemeProvider>
                    </QueryClientProvider>
            }

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
