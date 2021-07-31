import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native"

import { themeColor } from "../../theme"
import { firestore } from "../../../firebase"

const Home = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        {item && <Image style={styles.image} source={{ uri: item }} />}
      </View>
    )
  }

  const getData = async () => {
    try {
      setLoading(true)
      const places = firestore.collection("places")
      const result = await places.get()
      let newImages = []
      result.forEach((item) => {
        newImages.push(item.data().uri)
      })
      setImages([...newImages])
    } catch (error) {
      alert("데이터를 받는데 실패 하였습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.mainView}>
      <View style={styles.imageColumn}>
        {images.length > 0 && (
          <FlatList
            data={images}
            keyExtractor={(item) => item.created || Math.random()}
            renderItem={renderItem}
          />
        )}
        {loading && <ActivityIndicator color="black" />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: themeColor.defaultBackgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageColumn: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "90%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "gray",
  },
  textStyle: {
    color: themeColor.defaultFontColor,
  },
})

export default Home
