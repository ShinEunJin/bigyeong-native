import React, { useState, useRef } from "react"
import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
} from "react-native"
import moment from "moment"
import * as Random from "expo-random"
import * as SecureStore from "expo-secure-store"

import { firestore } from "../../../firebase"
import { storage } from "../../../firebase"
import ImageUploadZone from "./ImageUploadZone"
import CheckBox from "../../utils/CheckBox"
import Collapsible from "react-native-collapsible"
import { categoryData, regionData } from "./db"

const Upload = () => {
  const [title, setTitle] = useState("")
  const [region, setRegion] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [imageUri, setImageUri] = useState(null) // ""이렇게 문자열로 하면 <Text>에러남
  const [loading, setLoading] = useState(false)
  const [finish, setFinish] = useState(false) // 자식 컴포넌트에 업로드가 끝났다고 알리는 state
  const [visibleCategory, setVisibleCategory] = useState(true) // collapse 보일지 말지 결정하는 상태, true면 collapse 닫는다.
  const [visibleRegion, setVisibleRegion] = useState(true)

  const screenHeight = Dimensions.get("screen").height

  const scrollRef = useRef(null)

  // 업로드 함수
  const onUploadData = async () => {
    let randomId = Random.getRandomBytes(7).join("") // 문서 제목에 쓰일 때 사용
    let uri // 이미지 uri에 사용

    try {
      //비어있는 칸 확인
      if (imageUri === null) return alert("사진을 첨부해주시기 바랍니다")
      if (title.trim() === "") return alert("제목을 적어주시기 바랍니다")
      else if (category === "")
        return alert("카테고리를 선택해 주시기 바랍니다")
      else if (region === "") return alert("지역을 선택해 주시기 바랍니다")
      else if (location.trim() === "")
        return alert("위치를 적어 주시기 바랍니다")

      scrollRef.current.scrollTo({ y: 0, animated: true }) // 스크롤 맨 위로

      setLoading(true) // 업로드 시작

      const writer = await SecureStore.getItemAsync("key") // user는 "key" 값으로

      let start = new Date()
      try {
        uri = await uploadImageAsync(imageUri) // image picker로 받은 uri를 firebase storage에 uri 변환 시켜서 저장
      } catch (error) {
        setImageUri(null)
        return alert(
          "업로드가 불가능한 사진입니다(사진의 uri가 확인되지 않습니다)"
        )
      }
      let end = new Date()
      console.log(end - start)

      // firestore에 place 생성
      await firestore
        .collection("places")
        .doc(`${category}_${region}_${randomId}`)
        .set({
          id: randomId,
          title,
          uri,
          category,
          location,
          region,
          likes: 0,
          views: 0,
          writer,
          created: moment().format(),
        })

      // firestore에 user에 product안에 place 넣기
      const userRef = firestore.collection("users").doc(writer)
      await userRef.set({
        uploads: [...uploads, `${category}_${region}_${randomId}`],
      })

      setImageUri(null)
      setCategory("")
      setRegion("")
      setLocation("")
      setTitle("")
      setVisibleCategory(true)
      setVisibleRegion(true)
      setFinish(Date.now()) // 임의의 수를 넣어주기 위해 Date.now()를 넣었다. 하위 컴포넌트의 useEffect를 위해서
      return alert("성공적으로 업로드 하였습니다")
    } catch (error) {
      console.log(error)
      //에러로 인해 이미 생성 되었을 수도 있는 문서 제거
      await firestore
        .collection("places")
        .doc(`${category}_${region}_${randomId}`)
        .delete()
      if (uri === null) {
        setImageUri(null)
        return alert("이미지를 업데이트 할 수 없습니다")
      }
      return alert("업로드에 실패하였습니다")
    } finally {
      setLoading(false)
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

    const ref = storage // storage가 파이어베이스 storage 내꺼
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

  const updateCategory = (newCategory) => {
    setCategory(newCategory)
  }

  const updateRegion = (newRegion) => {
    setRegion(newRegion)
  }

  // collapse 보기 안보기
  const onVisibleCategory = () => {
    if (visibleCategory) setVisibleCategory(false)
    else setVisibleCategory(true)
  }

  const onVisibleRegion = () => {
    if (visibleRegion) setVisibleRegion(false)
    else setVisibleRegion(true)
  }

  return (
    <ScrollView ref={scrollRef} style={{ position: "relative" }}>
      {/* 업로딩 */}
      {loading && (
        <View style={[styles.uploadingStyle, { height: screenHeight }]}>
          {/* 로딩 바*/}
          <ActivityIndicator
            style={{ marginBottom: 20 }}
            size="large"
            color="black"
          />
        </View>
      )}
      {/* 메인 스크린 */}
      <View style={[styles.mainContainer, { opacity: loading ? 0.2 : 1 }]}>
        {/* 이미지 업로드 버튼 */}
        <ImageUploadZone updateImage={updateImage} finish={finish} />

        {/* input 부분 */}

        {/* 제목 입력 */}
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.inputStyle}
            placeholder="title"
            onChangeText={setTitle}
            value={title}
            maxLength={30}
          />
        </View>

        {/* 카테고리 선택 */}
        <Pressable style={styles.inputContainer} onPress={onVisibleCategory}>
          <TextInput
            style={styles.inputStyle}
            placeholder="category"
            value={category}
            editable={false}
            style={[styles.inputStyle, { color: "black" }]} // editable false를 하면 희미하게 보이게 되서 검은색을 넣어줘야한다.
          />
        </Pressable>
        <Collapsible style={styles.collapseStyle} collapsed={visibleCategory}>
          <CheckBox
            style={styles.checkStyle}
            data={categoryData}
            updateValue={updateCategory}
            finish={finish}
          />
        </Collapsible>

        {/* 지역 선택 */}
        <Pressable style={styles.inputContainer} onPress={onVisibleRegion}>
          <TextInput
            style={styles.inputStyle}
            placeholder="region"
            value={region}
            editable={false}
            style={[styles.inputStyle, { color: "black" }]}
          />
        </Pressable>
        <Collapsible style={styles.collapseStyle} collapsed={visibleRegion}>
          <CheckBox
            style={styles.checkStyle}
            data={regionData}
            updateValue={updateRegion}
            finish={finish}
          />
        </Collapsible>

        {/* 위치 입력 */}
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={[styles.inputStyle, { marginBottom: 10 }]}
            placeholder="location"
            onChangeText={setLocation}
            value={location}
            maxLength={30}
          />
        </View>

        {/* 업로드 버튼 */}
        <Button
          onPress={onUploadData}
          style={styles.submitBtn}
          title="UPLOAD"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
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
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  inputContainer: {
    flex: 1,
    width: "70%",
  },
  inputStyle: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 5,
    marginBottom: 5,
  },
  collapseStyle: {
    flexWrap: "wrap",
    width: "70%",
  },
  submitBtn: {
    height: 30,
    marginBottom: 20,
  },
  checkStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

export default Upload
