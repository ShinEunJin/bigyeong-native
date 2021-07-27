import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Home from "../pages/Home/Home"
import Category from "../pages/Category/Category"

const Tab = createMaterialTopTabNavigator()

const TopTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        indicatorStyle: styles.customIndicator,
      }}
    >
      <Tab.Screen
        name="new"
        component={Home}
        options={{ tabBarLabel: "최신" }}
      />
      <Tab.Screen
        name="popular"
        component={Category}
        options={{ tabBarLabel: "인기" }}
      />
      <Tab.Screen
        name="theme"
        component={Category}
        options={{ tabBarLabel: "테마" }}
      />
      <Tab.Screen
        name="summer"
        component={Category}
        options={{ tabBarLabel: "여름" }}
      />
      <Tab.Screen
        name="nature"
        component={Category}
        options={{ tabBarLabel: "자연" }}
      />
      <Tab.Screen
        name="city"
        component={Category}
        options={{ tabBarLabel: "도시" }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  customIndicator: {
    height: 30,
    width: 115,
    marginHorizontal: "auto",
    backgroundColor: "#F6AE99",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
})

export default TopTab
