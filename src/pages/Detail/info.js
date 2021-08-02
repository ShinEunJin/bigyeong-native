import * as firebase from "firebase"

import { firestore } from "../../../firebase"

// 조회수 증가
export const updateView = async (item) => {
  const placeRef = firestore
    .collection("places")
    .doc(`${item.category}_${item.region}_${item.name.trim().substring(0, 4)}`)
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
  const placeRef = firestore
    .collection("places")
    .doc(`${item.category}_${item.region}_${item.name.trim().substring(0, 4)}`)
  try {
    await placeRef.update({
      // 이미 좋아요 눌렀으면 -1 증가 아니면 1
      likes: firebase.firestore.FieldValue.increment(alreadyLike ? -1 : 1),
    })
    const doc = await placeRef.get()
    const data = await doc.data()
    return data
  } catch (error) {
    return alert("좋아요를 누르는데 실패하였습니다.")
  }
}
