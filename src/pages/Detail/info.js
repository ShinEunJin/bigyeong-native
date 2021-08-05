import * as firebase from "firebase"
import * as SecureStore from "expo-secure-store"

import { firestore } from "../../../firebase"

// 조회수 증가
export const updateView = async (item) => {
  const placeRef = firestore
    .collection("places")
    .doc(`${item.category}_${item.region}_${item.id}`)
  try {
    await placeRef.update({
      views: firebase.firestore.FieldValue.increment(1),
    })
    const doc = await placeRef.get()
    const data = await doc.data()
    return data
  } catch (error) {
    return alert("데이터를 불러오는데 실패하였습니다.")
  }
}

// 좋아요 증가
export const updateLike = async (item, alreadyLike) => {
  const userId = await SecureStore.getItemAsync("key")
  const placeRef = firestore
    .collection("places")
    .doc(`${item.category}_${item.region}_${item.id}`)
  const userRef = firestore.collection("users").doc(userId)
  try {
    // users 컬렉션의 likes에 컨텐츠 추가
    if (alreadyLike) {
      await firestore.runTransaction(async (t) => {
        const doc = await t.get(userRef)
        let newLikes = doc.data().likes.filter((target) => {
          return target !== `${item.category}_${item.region}_${item.id}`
        })
        await t.update(userRef, { likes: newLikes })
      })
    } else {
      await firestore.runTransaction(async (t) => {
        const doc = await t.get(userRef)
        const newLikes = [
          ...doc.data().likes,
          `${item.category}_${item.region}_${item.id}`,
        ]
        await t.update(userRef, { likes: newLikes })
      })
    }
    await placeRef.update({
      // 이미 좋아요 눌렀으면 -1 증가 아니면 1
      likes: firebase.firestore.FieldValue.increment(alreadyLike ? -1 : 1),
    })
    // 좋아요 수 컨트롤
    const doc = await placeRef.get()
    const likes = doc.data().likes
    return likes
  } catch (error) {
    console.log(error)
    return alert("좋아요를 누르는데 실패하였습니다.")
  }
}

// 좋아요 상태 확인
export const checkLike = async (item) => {
  let content = `${item.category}_${item.region}_${item.id}`
  const userId = await SecureStore.getItemAsync("key")
  const userRef = firestore.collection("users").doc(userId)
  try {
    const doc = await userRef.get()
    const data = doc.data()
    let result = false
    for (let target of data.likes) {
      if (content === target) {
        result = true
        break
      }
    }
    return result
  } catch (error) {
    console.log(error)
  }
}
