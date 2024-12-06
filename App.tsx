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
import { handleUser } from './src/services/asyncStoryge';
import { ChatProvider } from './src/contexts/ChatContext';
import { useChat } from './src/hooks/useChat';
import notifee, { AndroidVisibility } from '@notifee/react-native';
import { updateFMCToken } from './src/api/requests';
import messaging from '@react-native-firebase/messaging';
import Loading from './src/components/Loading';


const queryClient = new QueryClient();

messaging().onTokenRefresh(async (token) => {
    console.log({ token });
    updateFMCToken(token);

})
function App(): React.JSX.Element {

    const [isLoading, steIsLoading] = useState(true);



    // const { } = useChat()

    useEffect(() => {
        (async () => {
            const user = await handleUser();
            if (user) {
                notifee.requestPermission()
                steIsLoading(false)
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
