import React from "react"
import { StyleSheet, Text, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

const FindByMap = () => {
  return (
    <View style={styles.mainContainer}>
      <MapView
        style={{ flex: 1, width: "100%" }}
        initialRegion={{
          latitude: 36.38,
          longitude: 127.51,
          latitudeDelta: 3,
          longitudeDelta: 2.5,
        }}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default FindByMap
