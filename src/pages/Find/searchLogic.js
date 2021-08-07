import { firestore } from "../../../firebase"

const searchLogic = async (text) => {
  // 특수문자 및 띄어쓰기 제거
  let special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ]/gi
  let cleanText = text.replace(special, "")
  // 한글 체크
  let checkKor
  let korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g
  checkKor = korean.test(cleanText)
  let list = []
  if (checkKor) {
    const placeRef = firestore.collection("places")
    const result = await placeRef.where("title", ">=", cleanText).get()
    result.forEach((item) => {
      list.push(item.data())
    })
  } else {
    const placeRef = firestore.collection("places")
    const result = await placeRef.where("title", "<=", cleanText).get()
    result.forEach((item) => {
      list.push(item.data())
    })
  }
  if (list.length > 0) return list
  else return null
  // 이렇게 해도 일단 데이터는 뒤죽박죽으로 나온다. 나중에 검색 엔진 서비스를 도입해야한다
}

export default searchLogic
