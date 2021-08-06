import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { themeColor } from "../../theme"

const FindBySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <View style={styles.mainContainer}>
      <Text style={{ color: "white" }}>FindBySearch</Text>
      <SafeAreaView>
        <TextInput
          style={styles.inputStyle}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColor.defaultBackgroundColor,
  },
  inputStyle: {
    height: 50,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: themeColor.defaultFontColor,
    color: themeColor.defaultFontColor,
  },
})

export default FindBySearch
