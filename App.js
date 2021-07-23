import React from "react"
import { Linking, StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Bottomtap from "./src/Navigator/Tap"
import SideDrawer from "./src/SideDrawer"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerStyle={{ width: 150 }}
        drawerContent={(props) => <SideDrawer {...props} />}
      >
        <Drawer.Screen name="Route" component={Bottomtap} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
