import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import Home from "./components/Home";
import PinnedImagesLibrary from "./components/Pinned";

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Generate') {
              iconName = 'industry'
            } else if (route.name === 'Pinned') {
              iconName = 'map-pin'
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'deepskyblue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>

        <Tab.Screen name="Generate" component={Home}/>
        <Tab.Screen name="Pinned" component={PinnedImagesLibrary}/>


      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});