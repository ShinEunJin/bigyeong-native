import React, { useEffect } from "react"
import {
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
} from "react-native"
import data from "../../db/data"
import { themeColor } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const Category = (props) => {
  let category = props.route.name

  const navigation = useNavigation()

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.imageColumn}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => {
            navigation.navigate("Detail", { category })
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: data[category],
            }}
          />
        </TouchableHighlight>
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

export default Category
