import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableHighlight,
  Image,
} from "react-native"
import * as SecureStore from "expo-secure-store"
import NetInfo from "@react-native-community/netinfo"
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation, useIsFocused } from "@react-navigation/native"

import { firestore } from "../../../firebase"
import { themeColor } from "../../theme"

const Like = () => {
  // likes에는 좋아요를 누른 컨텐츠의 데이터가 들어있다
  const [likes, setLikes] = useState([])
  // 새로고침 버튼 보이게 하기위한 state
  const [error, setError] = useState(false)

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const getData = async () => {
    try {
      // 유저 정보 가져오기
      const userId = await SecureStore.getItemAsync("key")
      const userRef = firestore.collection("users").doc(userId)
      const doc = await userRef.get()
      const userLikes = doc.data().likes
      // 좋아요에 컨텐츠가 없을 때
      if (userLikes.length === 0) return
      // firebase의 in을 사용하기 위해서 likes안의 각각의 id를 가져온다
      let idList = userLikes.map((id) => id.split("_")[2])
      let likeList = []
      // 가져온 유저정보 likes 안에 각각 컨텐츠 가져오기
      const placeRef = firestore.collection("places")
      const placeData = await placeRef.where("id", "in", idList).get()
      placeData.forEach((item) => likeList.push(item.data()))
      setLikes(likeList)
    } catch (error) {
      console.log(error)
      setError(true)
      // 만약 네트워크 연결 잘못이라면 알려주기
      NetInfo.fetch().then((state) => {
        if (state.isConnected === false)
          return alert(
            "데이터를 불러오는데 실패하였습니다 네트워크 연결을 확인해 주시기 바랍니다"
          )
      })
      alert("데이터를 불러오는데 실패하였습니다")
    }
  }

  useEffect(() => {
    getData()
  }, [isFocused])

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Detail", { item })}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.uri }} />
          <View style={styles.iconStyle}>
            <Icon color="red" name="heart" size={12} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {/* 좋아요 장소가 있을 때 */}
      {likes.length > 0 ? (
        <FlatList
          data={likes}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {error ? (
            /* 에러 시 */
            <>
              <Text style={styles.textStyle}>
                데이터를 불러올 수 없습니다 {"\n"}네트워크 연결을 확인해
                주십시오
              </Text>
              <Button title="새로고침" color="blue" onPress={() => getData()} />
            </>
          ) : (
            /* 좋아요 장소가 없을 때 */
            <Text style={styles.textStyle}>
              좋아요를 등록한 장소가 없습니다
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: themeColor.defaultBackgroundColor,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "90%",
    marginBottom: 30,
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "gray",
  },
  textStyle: {
    color: themeColor.defaultFontColor,
    textAlign: "center",
    marginBottom: 10,
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 25,
    height: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
})

export default Like
