import React from "react"
import { Animated, View, Text, StyleSheet, Image } from "react-native"
import photo from "../../../longPhoto.jpg"
import { themeColor } from "../../theme"

const Home = () => {
  return (
    <View style={styles.mainView}>
      <Image style={styles.image} source={photo} resizeMode="contain" />
      <Text style={styles.textStyle}>장소 확인</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColor.defaultBackgroundColor,
  },
  image: {
    width: "100%",
    height: 400,
  },
  textStyle: {
    color: themeColor.defaultFontColor,
  },
})

export default Home
