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
import NetInfo from "@react-native-community/netinfo"

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
  const [timeMessage, setTimeMessage] = useState(false) // 시간 너무 오래 되면 나오는 메세지

  const screenHeight = Dimensions.get("screen").height

  const scrollRef = useRef(null)

  // 업로드 함수
  const onUploadData = async () => {
    // randomId는 문서 이름 및 storage에 저장될 이미지 이름을 나타낸다
    let randomId = Random.getRandomBytes(7).join("")
    // 이미지 uri에 사용
    let uri
    // user는 "key" 값으로
    const writer = await SecureStore.getItemAsync("key")

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
        .child("image/" + randomId)
      const snapshot = await ref.put(blob)

      blob.close()

      return await snapshot.ref.getDownloadURL()
    }

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

      //image picker uri를 firebase storage uri로 변환
      // timeSet은 시간초과 시 이벤트 발생
      let start = Date.now()
      let timeSet
      timeSet = setTimeout(() => {
        setTimeMessage(true)
      }, 20000)
      uri = await uploadImageAsync(imageUri)
      setTimeMessage(false)
      clearTimeout(timeSet)
      let end = Date.now()
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
      await firestore.runTransaction(async (t) => {
        const doc = await t.get(userRef)
        // 문서에서 보면 트랜잭션 내부에서 직접 데이터 수정하지 말라고 되어있다.
        // 즉 push 쓰지말고 리액트 처럼 하라는 소리다.
        const newUpload = [...doc.data().uploads, randomId]
        await t.update(userRef, { uploads: newUpload })
        // 위 처럼 하면 user에 컨텐츠가 추가가 안되지만 places에서는 저장이 됨 이거 수정 요망
      })

      throw "error"
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
      // 에러시 storage에 이미지 제거
      let imageRef = storage.ref().child("image/" + randomId)
      await imageRef.delete()

      // firestore의 places에 해당 문서 제거
      let placeRef = firestore
        .collection("users")
        .doc(`${category}_${region}_${randomId}`)
      await placeRef.delete()

      // firestore의 users에 해당 uploads 제거
      console.log(writer)
      let userRef = firestore.collection("users").doc(writer)
      if (userRef) {
        let te = await userRef.get()
        let test = await te.data()
        console.log(test)
      }
      if (uri === null) {
        setImageUri(null)
        return alert("이미지를 업데이트 할 수 없습니다")
      }
      return alert("업로드에 실패하였습니다")
    } finally {
      setLoading(false)
    }
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
          {timeMessage && (
            <Text>
              네트워크 속도가 느려 이미지를 다운하는데 시간이 다소 걸릴 수
              있습니다
            </Text>
          )}
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
        <Button title="test" onPress={deleteTest} />

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
