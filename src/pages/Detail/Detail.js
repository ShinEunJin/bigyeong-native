import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const Detail = (props) => {
  const { item } = props.route.params

  return (
    <View style={styles.mainContainer}>
      <Text>{item.name}</Text>
      <Image
        style={styles.imageStyle}
        source={{ uri: item.uri }}
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
