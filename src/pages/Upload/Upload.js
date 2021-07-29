import React, { useState } from "react"
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Camera } from "expo-camera"

import db from "../../../firebase"

const Upload = () => {
  const [name, setName] = useState("")
  const [image, setImage] = useState(null) // ""이렇게 문자열로 하면 <Text>에러남

  const onSubmitData = async () => {
    await db.collection("places").doc(name).set({
      name,
      position: 1,
    })
    setName("")
  }

  /* const openCamera = async () => {
    폰이 너무 구려서 카메라가 안된다 ...
    answer.granted = true
    await Camera.getCameraPermissionsAsync()
    await ImagePicker.launchCameraAsync()
  } */

  const openGallery = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync()
    setImage(photo.uri)
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <Text>Upload</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.inputStyle}
        onChangeText={setName}
        value={name}
      />
      <Button onPress={onSubmitData} style={styles.submitBtn} title="submit" />
      {/* <Button onPress={openCamera} style={styles.submitBtn} title="Camera" /> */}
      <Button onPress={openGallery} style={styles.submitBtn} title="Gallery" />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ height: 700 }}
          resizeMode="contain"
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputStyle: {
    width: "50%",
    height: 40,
    borderWidth: 1,
  },
  submitBtn: {
    height: 30,
    marginBottom: 20,
  },
})

export default Upload
