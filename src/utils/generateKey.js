import * as Random from "expo-random"
import * as SecureStore from "expo-secure-store"
import moment from "moment"

import { firestore } from "../../firebase"

const generateSecureKey = async () => {
  // 키 값 가져오기
  const key = await SecureStore.getItemAsync("key")

  // 키 값은 있는데 혹여나 유저 데이터가 삭제 되었을 경우 다시 생성
  const userRef = firestore.collection("users").doc(key)
  const user = await userRef.get()
  if (!user.exists) {
    await firestore.collection("users").doc(key).set({
      uploads: [],
      likes: [],
      created: moment().format(),
    })
  }

  if (!key) {
    try {
      let random = Random.getRandomBytes(10).join("")
      await SecureStore.setItemAsync("key", random)
      // firebase에 유저 바로 key값으로 유저 생성
      await firestore.collection("users").doc(random).set({
        uploads: [],
        likes: [],
        created: moment().format(),
      })
    } catch (error) {
      // key값은 생성됬지만 렉으로 인해 firestore유저가 생성 되지 못할
      // 수 있으므로 도중에 에러가 생기면 key값 제거
      console.log(error)
      await SecureStore.deleteItemAsync("key")
      alert(
        "key값을 생성하는데 실패하였습니다 앱을 다시 시작하여 주시기 바랍니다"
      )
    }
  }
}

export default generateSecureKey
