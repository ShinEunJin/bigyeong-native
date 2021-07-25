import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import FindBySearch from "../pages/Find/FindBySearch"
import FindByMap from "../pages/Find/FindByMap"
import Home from "../pages/Home/Home"

const Tab = createMaterialTopTabNavigator()

const TopTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        indicatorStyle: styles.customIndicator,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FindBySearch" component={FindBySearch} />
      <Tab.Screen name="FindByMap" component={FindByMap} />
      <Tab.Screen name="Hi" component={FindByMap} />
      <Tab.Screen name="You" component={FindByMap} />
      <Tab.Screen name="Lo" component={FindByMap} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  customIndicator: {
    height: 30,
  },
})

export default TopTab
