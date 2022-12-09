import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList,
  } from "react-native";
  

import  AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';


const renderPinnedImage = ({ item }) => {
    // console.log("render item:")
    // console.log(item)
    // console.log(item.image)
    return <Image source={{ uri: item.image }} style={styles.pinnedImage}/>
};

const PinnedImagesLibrary = ({ navigation }) => {
    const [retrievedImagesArr, setRetrievedImagesArr] = useState([])
    const isFocused = useIsFocused();


    const fetchImages = async () => {
        const retrievedImages = await AsyncStorage.getItem('@FinalApp:images');
        const retrievedImagesArr = JSON.parse(retrievedImages)
        console.log('retrievedImagesArr', retrievedImagesArr)
        var retrievedImagesArrJson = new Array(retrievedImagesArr.length);
        console.log(Array.isArray(retrievedImagesArrJson))
        for (var i = 0; i < retrievedImagesArr.length; i += 1) {
          obj = {id : i, image : retrievedImagesArr[i]}
          retrievedImagesArrJson[i] = obj
        //   retrievedImagesArrJson.push(obj)
        }

        setRetrievedImagesArr(retrievedImagesArrJson)
    }

    useEffect(() => {
        fetchImages()
    }, [isFocused])

    console.log("the array of json objects:")
    console.log(retrievedImagesArr)

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.titleRow}>
                    <Text style={styles.titleText}>Pinned Product Images</Text>
                </View>   
                
                <FlatList
                    data={retrievedImagesArr}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPinnedImage}
                    style={styles.list}
                />
            </View>
        </SafeAreaView>
    );
}

export default PinnedImagesLibrary;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "10%"
    },
    pinnedImage: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        marginVertical: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        paddingTop: 10,
        paddingBottom: 10
    },
    titleRow: {
        // height: "10%",
        width: "100%",
        backgroundColor: "deepskyblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
});
  