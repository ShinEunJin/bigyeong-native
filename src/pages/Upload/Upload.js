import React, { useEffect, useState } from "react"
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  InteractionManager,
  Pressable,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Camera } from "expo-camera"
import Icon from "react-native-vector-icons/FontAwesome"

import { firestore } from "../../../firebase"
import { storage } from "../../../firebase"

const Upload = () => {
  const [name, setName] = useState("")
  const [region, setRegion] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [imageUri, setImageUri] = useState(null) // ""이렇게 문자열로 하면 <Text>에러남
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const onUploadData = async () => {
    try {
      setLoading(true)
      const uri = await uploadImageAsync(imageUri) // image picker로 받은 uri를 firebase storage에 uri 변환 시켜서 저장
      await firestore.collection("places").add({
        name,
        uri,
        category,
        location,
        region,
        likes: 0,
        views: 0,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setImageUri(null)
      setCategory("")
      setRegion("")
      setLocation("")
      setName("")
      alert("성공적으로 업로드 하였습니다.")
    }
  }

  // 카메라 갤러리 열기
  const openGallery = async () => {
    try {
      setImageLoading(true)
      const photo = await ImagePicker.launchImageLibraryAsync()
      setImageUri(photo.uri)
    } catch (error) {
      alert("사진을 업로드하는데 실패하였습니다.")
    } finally {
      setImageLoading(false)
    }
  }

  // expo firebase에서 가져온 코드 - 업로드한 이미지의 uri를 반환한다
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", uri, true)
      xhr.send(null)
    })

    const ref = storage
      .ref()
      .child("image/" + `${Date.now()}_${parseInt(Math.random() * 10000)}`)
    const snapshot = await ref.put(blob)

    blob.close()

    return await snapshot.ref.getDownloadURL()
  }

  return (
    <View style={{ position: "relative" }}>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>uploading...</Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={[
          styles.mainContainer,
          { opacity: loading ? 0.2 : 1 },
        ]}
      >
        {imageUri ? (
          <View style={[styles.galleyBtn, { position: "relative" }]}>
            <Image style={styles.imageStyle} source={{ uri: imageUri }} />
            <Pressable
              style={styles.galleyDeleteBtn}
              onPress={() => setImageUri(null)}
            >
              <Icon name="times" size={13} style={{ color: "white" }} />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={openGallery}
            style={[styles.galleyBtn, { borderWidth: 1 }]}
          >
            <Icon name="plus" size={20} />
          </Pressable>
        )}
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholder="name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholder="category"
          onChangeText={setCategory}
          value={category}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholder="region"
          onChangeText={setRegion}
          value={region}
        />
        <TextInput
          autoCapitalize="none"
          style={[styles.inputStyle, { marginBottom: 10 }]}
          placeholder="location"
          onChangeText={setLocation}
          value={location}
        />
        <Button
          onPress={onUploadData}
          style={styles.submitBtn}
          title="UPLOAD"
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
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
  inputStyle: {
    width: "70%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 5,
    marginBottom: 5,
  },
  submitBtn: {
    height: 30,
    marginBottom: 20,
  },
})

export default Upload
