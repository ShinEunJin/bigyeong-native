import React, { useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"

import { themeColor } from "../../theme"
import searchLogic from "./searchLogic"

const FindBySearch = () => {
  const navigation = useNavigation()

  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState([])
  // 데이터가 없을 때 noData는 true (검색 후 데이터가 없다고 표시할 때 쓰임)
  const [noData, setNoData] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const onSearch = async (text) => {
    setLoading(true)
    const result = await searchLogic(text.toLowerCase())
    if (!result) {
      setNoData(true)
      setMessage(`${searchTerm}에 대한 검색결과가 없습니다`)
    } else {
      setNoData(false)
      setData(result)
      setLoading(false)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Detail", { item })}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.uri }} />
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {/* 검색 부분 */}
      <Text style={{ color: "white", fontWeight: "bold", paddingVertical: 10 }}>
        Search
      </Text>
      <SafeAreaView style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={styles.inputStyle}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Pressable
          onPress={() => onSearch(searchTerm)}
          style={styles.searchBtn}
        >
          <Icon name="search" color="black" size={25} />
        </Pressable>
      </SafeAreaView>
      {/* 결과 부분 */}
      {noData ? (
        <View style={styles.messageContainer}>
          <Text style={{ color: "white" }}>{message}</Text>
        </View>
      ) : (
        <View style={{ flex: 1, width: "100%" }}>
          {loading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: themeColor.defaultBackgroundColor,
  },
  inputStyle: {
    height: 50,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: themeColor.defaultFontColor,
    color: themeColor.defaultFontColor,
    marginRight: 10,
  },
  searchBtn: {
    borderWidth: 1,
    backgroundColor: themeColor.defaultFontColor,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "90%",
    marginBottom: 30,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "gray",
  },
})

export default FindBySearch
