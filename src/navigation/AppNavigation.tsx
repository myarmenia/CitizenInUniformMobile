import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SelectConnectionTypeScreen from "../screens/SelectConnectionTypeScreen";
import MessagesScreen from "../screens/MessagesScreen";


const Stack = createStackNavigator();
export function AppNavigation() {
    return (
        <NavigationContainer  >
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}  >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="SelectConnectionType" component={SelectConnectionTypeScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}