import React from "react"
import { View, Text, StyleSheet, Button } from "react-native"

const User = (props) => {
  const { params } = props.route
  const userName = params ? params.userName : null

  return (
    <View style={styles.mainView}>
      <Text>User</Text>
      <Button
        title="To Home Screen"
        onPress={() => props.navigation.navigate("Home")}
      />
      <Text>{userName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default User
