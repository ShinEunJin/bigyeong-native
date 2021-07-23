import React from "react"
import { View, Text, Button, StyleSheet, Image } from "react-native"
import photo from "../photo.jpg"

const Home = (props) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.mainText}>Home Screen</Text>
      <Button
        title="To User Screen"
        onPress={() =>
          props.navigation.navigate("User", { userName: "ShinEunJin" })
        }
      />
      <Image style={styles.image} source={photo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 400,
  },
})

export default Home
