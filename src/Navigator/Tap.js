import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../Home"
import UserScreen from "../User"
import Icon from "react-native-vector-icons/FontAwesome"

const Tap = createBottomTabNavigator()

const TabBarIcon = (focused, name) => {
  let iconName, iconSize

  if (name === "Home") {
    iconName = "search"
  } else {
    iconName = "map"
  }

  iconSize = focused ? 25 : 15

  return <Icon name={iconName} size={iconSize} />
}

const BottomTap = () => {
  return (
    <Tap.Navigator
      tabBarOptions={{
        labelStyle: { fontWeight: "bold" },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name),
      })}
    >
      <Tap.Screen name="Home" component={HomeScreen} />
      <Tap.Screen name="User" component={UserScreen} />
    </Tap.Navigator>
  )
}

const styles = StyleSheet.create({})

export default BottomTap
