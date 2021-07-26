import React, { useEffect } from "react"
import { StyleSheet, Image, ScrollView, View } from "react-native"
import data from "../../db/data.json"
import { themeColor } from "../../theme"

const Popular = (props) => {
  let category = props.route
  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.imageColumn}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: data[category.name],
            }}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: data[category.name],
            }}
          />
        </View>
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

export default Popular
