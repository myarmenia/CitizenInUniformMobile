import React from 'react';
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

const queryClient = new QueryClient();

function App(): React.JSX.Element {

    return (
        <View style={styles.flex}>
            <QueryClientProvider client={queryClient}>

                <ThemeProvider>
                    <SocketProvider>
                        <ModalProvider>
                            <StatusBar />
                            <AppNavigation />
                            <CustomModal />
                        </ModalProvider>
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
