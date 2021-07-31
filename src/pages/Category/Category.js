import React, { useEffect, useState } from "react"
import {
  TouchableHighlight,
  StyleSheet,
  Image,
  View,
  FlatList,
} from "react-native"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"

import { firestore } from "../../../firebase"
import { themeColor } from "../../theme"

const Category = () => {
  const { name } = useRoute()
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const [contents, setContents] = useState([])

  const getData = async () => {
    const places = firestore.collection("places")
    let newContents = []
    const result = await places
      .where("category", "==", name.toLowerCase())
      .get()
    result.forEach((item) => {
      newContents.push(item.data())
    })
    setContents([...newContents])
  }

  useEffect(() => {
    getData()
  }, [isFocused])

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate("Detail", { item })}
        style={styles.imageContainer}
      >
        {item && <Image style={styles.image} source={{ uri: item.uri }} />}
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.imageColumn}>
        {isFocused && contents.length > 0 && (
          <FlatList
            data={contents}
            keyExtractor={(item) => item.created || Math.random()}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
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
  textStyle: {
    color: themeColor.defaultFontColor,
  },
})

export default Category
