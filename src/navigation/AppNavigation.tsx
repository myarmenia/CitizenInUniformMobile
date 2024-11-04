import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();
export function AppNavigation() {
    return (
        <NavigationContainer  >
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}  >
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}