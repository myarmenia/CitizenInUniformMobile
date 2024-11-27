import React, { useEffect } from 'react';
import {
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

const queryClient = new QueryClient();

function App(): React.JSX.Element {

    const {} = useChat()

    useEffect(() => {
        handleUser();
    }, [])


    return (
        <View style={styles.flex}>
            <QueryClientProvider client={queryClient}>
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
