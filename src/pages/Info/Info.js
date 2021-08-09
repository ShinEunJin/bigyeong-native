import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import * as SecureStore from "expo-secure-store"

const Info = () => {
  const [key, setKey] = useState("")

  const getKey = async () => {
    const userId = await SecureStore.getItemAsync("key")
    setKey(userId)
  }

  useEffect(() => {
    getKey()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text>문의 번호: 010-5501-2605</Text>
      <Text>KEY값: {key}</Text>
      <View style={styles.copylightStyle}>
        <Text>No Copylight. 2020.08.09 Bigyeong Corp.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  copylightStyle: {
    position: "absolute",
    bottom: 40,
  },
})

export default Info
