import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationTypes } from "./navigation.types";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SelectConnectionTypeScreen from "../screens/SelectConnectionTypeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import FormNameScreen from "../screens/form/FormNameScreen";
import FormEmailScreen from "../screens/form/FormEmailScreen";
import FormPhoneNumberScreen from "../screens/form/FormPhoneNumberScreen";
import EmailMessageScreen from "../screens/EmailMessageScreen";
import SubCategoryScreen from "../screens/SubCategoryScreen";
import FormSelectTypeScreen from "../screens/form/FormSelectCategory";
import ChatScreen from "../screens/ChatScreen";


const Stack = createStackNavigator();
export function AppNavigation() {
    return (
        <NavigationContainer  >
            <Stack.Navigator initialRouteName={navigationTypes.HOME} screenOptions={{ headerShown: false }}  >
                <Stack.Screen name={navigationTypes.HOME} component={HomeScreen} />
                <Stack.Screen name={navigationTypes.CATEGORY} component={CategoryScreen} />
                <Stack.Screen name={navigationTypes.CONNECTION_TYPE} component={SelectConnectionTypeScreen} />
                <Stack.Screen name={navigationTypes.MESSAGES} component={MessagesScreen} />
                <Stack.Screen name={navigationTypes.FORM_NAME} component={FormNameScreen} />
                <Stack.Screen name={navigationTypes.FORM_EMAIL} component={FormEmailScreen} />
                <Stack.Screen name={navigationTypes.FORM_PHONE} component={FormPhoneNumberScreen} />
                <Stack.Screen name={navigationTypes.EMAIL_MESSAGE} component={EmailMessageScreen} />
                <Stack.Screen name={navigationTypes.SUB_CATEGORY} component={SubCategoryScreen} />
                <Stack.Screen name={navigationTypes.FORM_SELECT_TYPE} component={FormSelectTypeScreen} />
                <Stack.Screen name={navigationTypes.CHAT} component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}