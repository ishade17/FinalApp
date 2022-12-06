import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import  AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {

  // -- state variables --
  const [prompt, onChangePrompt] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [imagePlaceholder, setimagePlaceholder] = React.useState(
    "https://lembusiness.com/wp-content/uploads/2020/04/placeholder.gif"
  );

  // -- open ai variables
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);


  // -- generate images --
  const generateImage = async () => {
    try {
      onChangePrompt(prompt);
      setLoading(true);
      const res = await openai.createImage({
        prompt: `A full image of ${prompt}`,
        n: 1,
        size: "256x256",
      });
      setResult(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // -- pin images --
  const pinImage = async ( image ) => {

    console.log("setting async storage:")

    try {

      if (images.includes(image) == false) {

        console.log("new item added to images:")
        setImages([...images, image]);
        console.log(images)

        await AsyncStorage.setItem('@FinalApp:images', JSON.stringify([...images, image]));
        console.log("saved images:")
        console.log(JSON.stringify(images))

      } else {
        console.log("already included")
      }

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>

        <Text style={styles.titleText}>Enter a product description below to get inspired...</Text>
        <View style={styles.textInputcontainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePrompt}
            value={prompt}
            placeholder={"Description"}
            editable
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={generateImage}>
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>

        {loading ? (
          <>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Generating...</Text>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.generatedImageContainer}>
          {result.length > 0 ? (
            <Image
              style={styles.generatedImage}
              source={{
                uri: result,
              }}
            />
          ) : (
            <>
              <Image
                style={styles.generatedImage}
                source={{
                  uri: imagePlaceholder,
                }}
              />
            </>
          )}
        </View>

        <TouchableOpacity style={styles.pinButton} onPress={() => {pinImage(result)}}>
          <Text style={styles.pinButtonText}>Pin Image</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    paddingTop: 15,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    color: "deepskyblue"
  },
  textInputcontainer: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "deepskyblue",
    borderRadius: 10,
    marginVertical: 10,
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  generateButton: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 50,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "deepskyblue",
    borderWidth: 2
  },
  generateButtonText: {
    color: "deepskyblue",
    fontWeight: "bold"
  },
  generatedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "column",
  },
  generatedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  pinButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  pinButton: {
    position: "relative",
    height: 50,
    width: "33%",
    backgroundColor: "deepskyblue",
    borderRadius: 50,
    marginVertical: 10,
    // marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }
});
