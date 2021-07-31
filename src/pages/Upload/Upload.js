import React, { useState } from "react"
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"

import { firestore } from "../../../firebase"
import { storage } from "../../../firebase"
import ImageUploadZone from "./ImageUploadZone"

const Upload = () => {
  const [name, setName] = useState("")
  const [region, setRegion] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [imageUri, setImageUri] = useState(null) // ""이렇게 문자열로 하면 <Text>에러남
  const [loading, setLoading] = useState(false)
  const [finish, setFinish] = useState(false) // 자식 컴포넌트에 업로드가 끝났다고 알리는 state

  // 업로드 함수
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
        created: Date.now(),
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
      setFinish(Date.now()) // 임의의 수를 넣어주기 위해 Date.now()를 넣었다. 하위 컴포넌트의 useEffect를 위해서
      alert("성공적으로 업로드 하였습니다.")
    }
  }

  // expo firebase에서 가져온 코드 - 업로드한 이미지의 uri를 반환한다
  // 최종적으로 컨텐츠 업로드 할 때 uri 변환하도록 넣기
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

  //자식 컴포넌트에서 받은 imageUri 업데이트
  const updateImage = (newImage) => {
    setImageUri(newImage)
  }

  return (
    <View style={{ position: "relative" }}>
      {/* 업로딩 */}
      {loading && (
        <View style={styles.uploadingStyle}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      {/* 메인 스크린 */}
      <ScrollView
        contentContainerStyle={[
          styles.mainContainer,
          { opacity: loading ? 0.4 : 1 },
        ]}
      >
        {/* 이미지 업로드 버튼 */}
        <ImageUploadZone updateImage={updateImage} finish={finish} />
        {/* input 부분 */}
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
  uploadingStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 500,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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
