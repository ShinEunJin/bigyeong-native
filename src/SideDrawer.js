import React from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { CommonActions } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"

const navigateToScreen = (route, props) => () => {
  props.navigation.dispatch(
    CommonActions.navigate({
      name: route,
      params: {},
    })
  )
}

const SideDrawer = (props) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View>
          <Text style={styles.headTitle}>Menu</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="search" size={30} />
        </View>
        <View>
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("User", props)}>검색</Text>
          </View>
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("Home", props)}>지도</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headTitle: {
    textAlign: "center",
    padding: 10,
    paddingTop: 30,
    marginBottom: 10,
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  iconContainer: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  navItemStyle: {
    margin: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
})

export default SideDrawer
