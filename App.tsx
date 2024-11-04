import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { useSocket } from './src/hooks';
import { AppNavigation } from './src/navigation/AppNavigation';

function App(): React.JSX.Element {
   
    return (
        <SafeAreaView style={styles.flex}>
            <StatusBar />
            <AppNavigation/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#132145',

    }
});

export default App;
