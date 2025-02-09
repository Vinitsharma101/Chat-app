import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./(auth)/login";
import Signup from "./(auth)/signup";
import HomeScreen from "./screen/HomeScreen"

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
