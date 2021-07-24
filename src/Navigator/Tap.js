import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../pages/Home/Home"
import Icon from "react-native-vector-icons/FontAwesome"
import FindBySearch from "../pages/Find/FindBySearch"
import FindByMap from "../pages/Find/FindByMap"

const Tap = createBottomTabNavigator()

const TabBarIcon = (focused, name) => {
  let iconName, iconSize

  if (name === "Home") iconName = "home"
  if (name === "FindBySearch") iconName = "search"
  if (name === "FindByMap") iconName = "map-marker"

  iconSize = focused ? 25 : 20

  return <Icon name={iconName} size={iconSize} />
}

const BottomTap = () => {
  return (
    <Tap.Navigator
      tabBarOptions={{
        labelStyle: {
          paddingBottom: 5,
        },
        activeTintColor: "black",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name),
      })}
    >
      <Tap.Screen
        options={{ tabBarLabel: "홈" }}
        name="Home"
        component={Home}
      />
      <Tap.Screen
        options={{ tabBarLabel: "검색" }}
        name="FindBySearch"
        component={FindBySearch}
      />
      <Tap.Screen
        options={{ tabBarLabel: "지도" }}
        name="FindByMap"
        component={FindByMap}
      />
    </Tap.Navigator>
  )
}

export default BottomTap
