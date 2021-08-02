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
import { themeColor } from "../../theme"

import { updateView, updateLike } from "./info" // 여기서 조회수 및 좋아요 데이터를 받는다

const Detail = (props) => {
  const { item } = props.route.params

  const [place, setPlace] = useState({})

  const screenHeight = Dimensions.get("screen").height

  const getData = async () => {
    const data = await updateView(item)
    setPlace(data)
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
          {place.name}
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
            <Text>{place.likes}</Text>
          </View>
        </View>
        <View style={styles.likeStyle}>
          <Icon name="heart-o" size={30} color="red" />
        </View>
        <View style={styles.mapStyle}>
          <Icon name="map" size={28} color="black" />
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
