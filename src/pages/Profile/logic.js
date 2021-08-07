import { firestore, storage } from "../../../firebase"

export const deleteContent = async (item) => {
  // firestore places에서 삭제
  try {
    await firestore
      .collection("places")
      .doc(`${item.category}_${item.region}_${item.id}`)
      .delete()
    // user uploads에서 제거
    let userRef = firestore.collection("users").doc(item.writer)
    await firestore.runTransaction(async (t) => {
      const doc = await t.get(userRef)
      let newUpload = doc.data().uploads.filter((target) => {
        return target !== item.id
      })
      await t.update(userRef, { uploads: newUpload })
    })
    // storage에서 이미지 삭제
    let imageRef = storage.ref().child("image/" + item.id)
    await imageRef.delete()
  } catch (error) {
    console.log(error)
    alert("컨텐츠를 삭제하는데 실패하였습니다")
  }
}
