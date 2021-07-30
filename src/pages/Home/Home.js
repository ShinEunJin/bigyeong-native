import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native"

import { themeColor } from "../../theme"
import { firestore } from "../../../firebase"

const Home = () => {
  const [list, setList] = useState([])
  const [content, setContent] = useState(null)

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        {item && <Image style={styles.image} source={{ uri: item }} />}
      </View>
    )
  }

  const getData = async () => {
    /* try {
      const places = firestore.collection("places")
      let result = await places.get()
      let newList = []
      result.forEach((item) => {
        newList.push(item.data().image)
      })
      setList([...newList])
    } catch (error) {
      console.log(error)
    } */
    const places = firestore.collection("places").doc("4GBjlDVydr7KH7mWA0mF")
    let place = await places.get()
    setContent(place.data())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.mainView}>
      <View style={styles.imageColumn}>
        {/* <FlatList
          data={list}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          style={styles.mainView}
        /> */}
        <View style={styles.imageContainer}>
          {content && (
            <Image style={styles.image} source={{ uri: content.image }} />
          )}
        </View>
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
  },
  textStyle: {
    color: themeColor.defaultFontColor,
  },
})

export default Home
