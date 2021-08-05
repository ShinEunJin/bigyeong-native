import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import * as SecureStore from "expo-secure-store"

import { firestore } from "../../../firebase"
import { themeColor } from "../../theme"

const Like = () => {
  const [likes, setLikes] = useState([])

  const getData = async () => {
    const userId = await SecureStore.getItemAsync("key")
    try {
      const userRef = firestore.collection("users").doc(userId)
      const doc = await userRef.get()
      const data = doc.data().uploads
      let result = data.map((item) => {
        const placeRef = firestore.collection("places").doc(item)
      })
    } catch (error) {
      console.log(error)
      alert("데이터를 불러오는데 실패하였습니다.")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageColumn}></View>
      <Text style={{ color: "white" }}>Like</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: themeColor.defaultBackgroundColor,
    flex: 1,
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
})

export default Like
