import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Button,
} from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import * as SecureStore from "expo-secure-store"
import NetInfo from "@react-native-community/netinfo"

import { themeColor } from "../../theme"
import { firestore } from "../../../firebase"

const Profile = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  // Like 컴포넌트랑 거의 유사하다
  const [contents, setContents] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    setLoading(true)
    try {
      //유저 정보 가져오기
      const userId = await SecureStore.getItemAsync("key")
      const userRef = firestore.collection("users").doc(userId)
      const userDoc = await userRef.get()
      const uploadId = userDoc.data().uploads
      // 업로드한 컨텐츠가 없을 때
      if (uploadId.length === 0) return
      // firestore에서 해당 id를 가진 문서 가져오기
      let uploadList = []
      const placeRef = firestore.collection("places")
      const placeData = await placeRef.where("id", "in", uploadId).get()
      placeData.forEach((item) => uploadList.push(item.data()))
      setContents(uploadList)
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
    } finally {
      setLoading(false)
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
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {/* 타이틀 */}
      <View style={styles.headerStyle}>
        <Text style={styles.mainTextStyle}>My Upload Places</Text>
      </View>
      {loading ? (
        /* 로딩바 */
        <View style={styles.loadingMainContainer}>
          <ActivityIndicator color="white" size="large" />
        </View>
      ) : (
        <View style={styles.imageColumn}>
          {contents.length > 0 ? (
            <FlatList
              data={contents}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {error ? (
                /* 에러 시 */
                <>
                  <Text style={styles.textStyle}>
                    데이터를 불러올 수 없습니다 {"\n"}네트워크 연결을 확인해
                    주십시오
                  </Text>
                  <Button
                    title="새로고침"
                    color="blue"
                    onPress={() => getData()}
                  />
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColor.defaultBackgroundColor,
    alignItems: "center",
  },
  loadingMainContainer: {
    flex: 1,
    backgroundColor: themeColor.defaultBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: themeColor.defaultFontColor,
    width: "90%",
    alignItems: "center",
  },
  mainTextStyle: {
    color: themeColor.defaultFontColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "90%",
    marginBottom: 30,
    justifyContent: "center",
    position: "relative",
  },
  imageColumn: {
    width: "100%",
    paddingVertical: 20,
    marginBottom: 100,
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
})

export default Profile
