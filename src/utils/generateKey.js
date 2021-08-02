import * as Random from "expo-random"
import * as SecureStore from "expo-secure-store"

const generateSecureKey = async () => {
  const key = await SecureStore.getItemAsync("key")
  if (!key) {
    let user = await SecureStore.setItemAsync(
      "key",
      Random.getRandomBytes(10).join("")
    )
    // firebase에 유저 바로 key값으로 유저 생성
  }
}

export default generateSecureKey
