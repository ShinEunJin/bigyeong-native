import React, { useEffect } from "react"
import {
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
} from "react-native"
import {
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/native"

import data from "../../db/data"
import { themeColor } from "../../theme"

const Category = () => {
  const { name } = useRoute()

  const navigation = useNavigation()

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.imageColumn}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => {
            navigation.navigate("Detail", { name, imgSrc: data[name] })
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: data[name],
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
