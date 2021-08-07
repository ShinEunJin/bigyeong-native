import React, { useState, useEffect } from "react"
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"

import { themeColor } from "../../theme"
import { updateView, updateLike, checkLike } from "./info" // 여기서 조회수 및 좋아요 데이터를 받는다

const Detail = (props) => {
  const { item } = props.route.params

  const [place, setPlace] = useState({})
  const [alreadyLike, setAlreadyLike] = useState(false)
  const [like, setLike] = useState(0) // 좋아요는 누르면 바뀌므로 따로 상태 마련

  const screenHeight = Dimensions.get("screen").height

  const navigation = useNavigation()

  const getData = async () => {
    // 조회수 1증가
    const data = await updateView(item)
    if (data === "error") {
      alert("데이터를 불러 올 수 없습니다")
      return navigation.navigate("Home")
    }
    if (!data) {
      alert("이미 삭제된 컨텐츠입니다")
      return navigation.navigate("Home")
    }
    setPlace(data)
    setLike(data.likes)
    // 유저 정보를 가져와서 이미 좋아요가 되어있는지 판단
    let checkAlreadyLike = await checkLike(item)
    setAlreadyLike(checkAlreadyLike)
  }

  // 좋아요 버튼 수정 및 좋아요 수 바꾸기
  const checkUpdateLike = async () => {
    // 좋아요 버튼 하트 (시각적인거부터 바꾸기)
    if (alreadyLike) setAlreadyLike(false)
    else setAlreadyLike(true)
    // 좋아요 수 바꾸기
    let result = await updateLike(item, alreadyLike)
    setLike(result)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.imageContainer, { height: screenHeight * 0.8 }]}>
        <Image
          style={styles.imageStyle}
          source={{ uri: place.uri }}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.infoContainer, { height: screenHeight * 0.2 }]}>
        <Text style={[styles.titleStyle, { marginTop: screenHeight * 0.04 }]}>
          {place.title}
        </Text>
        <Text
          style={[styles.locationStyle, { marginTop: screenHeight * 0.02 }]}
        >
          {place.region} - {place.location}
        </Text>
        <View style={[styles.viewStyle, { position: "absolute", bottom: 10 }]}>
          <View style={[styles.viewStyle, { marginRight: 5 }]}>
            <Icon style={styles.iconStyle} name="eye" />
            <Text>{place.views}</Text>
          </View>
          <View style={styles.viewStyle}>
            <Icon style={styles.iconStyle} name="heart" />
            <Text>{like}</Text>
          </View>
        </View>
        {/* 좋아요 */}
        <View style={styles.likeStyle}>
          <Icon
            name={`${alreadyLike ? "heart" : "heart-o"}`}
            onPress={checkUpdateLike}
            size={25}
            color="red"
          />
        </View>
        {/* 지도 */}
        <View style={styles.mapStyle}>
          <Icon name="map-o" size={22} color="black" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: themeColor.defaultBackgroundColor,
    justifyContent: "flex-end",
  },
  imageStyle: {
    height: "90%",
  },
  infoContainer: {
    alignItems: "center",
    position: "relative",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  locationStyle: {
    opacity: 0.5,
  },
  viewStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 1,
  },
  likeStyle: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  mapStyle: {
    position: "absolute",
    right: 15,
    top: 60,
  },
})

export default Detail
