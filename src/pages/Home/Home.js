import React from "react"
import { Text, View, StyleSheet, Image, ScrollView } from "react-native"
import data from "../../db/data.json"
import { themeColor } from "../../theme"

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://eunjintour.s3.amazonaws.com/product_image/916a7ec8038d875e5fce1ca930c712ca",
          }}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: data.New,
          }}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: data.Popular,
          }}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: data.Summer,
          }}
        />
      </View>
    </ScrollView>
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
    flexDirection: "row",
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
