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

            if (route.name === 'Home') {
              iconName = 'safari'
            } else if (route.name === 'Pinned') {
              iconName = 'map-pin'
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'deepskyblue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>

        <Tab.Screen name="Home" component={Home}/>
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







// import React, { useState } from 'react';
// import { StyleSheet, View, TextInput, Button, Image, FlatList } from 'react-native';
// import * as AsyncStorage from 'react-native';

// const App = () => {
//   const [prompt, setPrompt] = useState('');
//   const [images, setImages] = useState([]);

//   const generateImage = async () => {
//     try {
//       console.log('generateImage called');
//       // Use DALL-E to generate an image from the given prompt
//       const response = await fetch('https://api.openai.com/v1/images/generations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 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',
//         },
//         body: JSON.stringify({
//           model: 'image-alpha-001',
//           prompt: prompt,
//         }),
//       });
//       const data = await response.json();
//       const image = data.data[0].url;
//       console.log("image object:")
//       console.log(image)

//       console.log("saving image to async storage")
//       // Save the image to async storage
//       await AsyncStorage.setItem('@FinalApp:image', image);
//       console.log("saved image to async storage")

//       // Add the image to the list of images
//       setImages([...images, image]);
//       console.log("images being set")
//       console.log(images)
//     } catch (e) {
//       // Handle errors
//     }
//   };

//   const renderImage = ({ item }) => {
//     console.log("item object:")
//     console.log(item)
//     return <Image source={{ uri: item }} style={styles.generatedImage}/>;
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Enter a prompt"
//         value={prompt}
//         onChangeText={setPrompt}
//       />

//       <Button title="Generate image" onPress={generateImage} />

//       {console.log("data prop before flatlist:")}
//       {console.log(images)}

//       <FlatList
//         data={images}
//         renderItem={renderImage}
//         keyExtractor={(item, index) => index.toString()}
//         style={{ height: 300 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 50,
//   },
//   generatedImage: {
//     width: 300,
//     height: 300,
//     resizeMode: "contain",
//   },
//   listContainer: {
//     paddingHorizontal: 10,
//     justifyContent: "center",
//     alignItems: "center",
// },
// });

// export default App;
