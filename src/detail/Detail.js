import React from "react"
import { StyleSheet, Text, View } from "react-native"

const Detail = (props) => {
  console.log("hi")
  console.log(props.route.params)
  return (
    <View>
      <Text>Detail</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default Detail
