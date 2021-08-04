import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import Icon from "react-native-vector-icons/FontAwesome"

const ImageUploadZone = (props) => {
  const [imageUri, setImageUri] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)

  const openGallery = async () => {
    try {
      setImageLoading(true)
      let photo = await ImagePicker.launchImageLibraryAsync()
      // getPendingResultAsync 문서에 사용법이 나와있지 않아 정확하게 사용하고 있는지 모르겠다.
      if (Platform.OS === "android") {
        let excpt = await ImagePicker.getPendingResultAsync()
        photo = { ...photo, ...excpt[0] }
      }
      if (!photo.cancelled) {
        setImageUri(photo.uri) // 이미지를 볼 수 있게 state에 넣기
        props.updateImage(photo.uri) // 부모 컴포넌트로 imageUri 주기
      }
    } catch (error) {
      setImageUri(null)
      alert("사진을 업로드하는데 실패하였습니다.")
    } finally {
      setImageLoading(false)
    }
  }

  const deleteGallery = () => {
    setImageUri(null)
    props.updateImage(null)
  }
  // image picker 에서 가져온 코드, 갤러리 권한 물어보는 거
  /* const checkAuthGalley = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("이 서비스를 이용하기 위해선 갤러리 탐색 권한을 허용해야 합니다")
      }
    }
  }

  useEffect(() => {
    checkAuthGalley()
  }, []) */

  // 상위 컴포넌트에서 컨텐츠를 업로드 할때 마다 finish 랜덤 값을 받는다.
  // 랜덤값을 받으면 useEffect효과에 따라 setImageUri 초기화
  useEffect(() => {
    setImageUri(null)
  }, [props.finish])

  return (
    <>
      {imageUri ? (
        /* 이미지 올렸을 때 */
        <View style={[styles.galleyBtn, { position: "relative" }]}>
          <Image style={styles.imageStyle} source={{ uri: imageUri }} />
          <Pressable style={styles.galleyDeleteBtn} onPress={deleteGallery}>
            <Icon name="times" size={13} style={{ color: "white" }} />
          </Pressable>
        </View>
      ) : (
        /* 갤러리 열기 버튼 */
        <Pressable
          onPress={openGallery}
          style={[styles.galleyBtn, { borderWidth: 1 }]}
        >
          {imageLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Icon name="plus" size={20} />
          )}
        </Pressable>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  galleryText: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 40,
  },
  galleyBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 220,
    marginVertical: 30,
    borderRadius: 10,
  },
  galleyDeleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
})

export default ImageUploadZone
