import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const Detail = (props) => {
  const data = props.route.params

  return (
    <View style={styles.mainContainer}>
      <Text>{data.name}</Text>
      <Image
        style={styles.imageStyle}
        source={{ uri: data.imgSrc }}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    height: 500,
    width: "100%",
  },
})

export default Detail
