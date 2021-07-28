import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import BottomTab from "./Navigator/BottomTab"
import SideDrawer from "./Navigator/SideDrawer"
import Icon from "react-native-vector-icons/Entypo"

import logo from "../logo1.png"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function App() {
  const DrawerComponent = () => {
    return (
      <Drawer.Navigator
        drawerPosition="left"
        drawerStyle={{ width: 150 }}
        drawerContent={(props) => <SideDrawer {...props} />} // Menu Draw에 목록들
      >
        <Drawer.Screen name="BottomTab" component={BottomTab} />
      </Drawer.Navigator>
    )
  }

  /* Menu SideDrawer */
  const HeaderLeft = () => {
    const navigation = useNavigation()
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ paddingLeft: 20 }}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer())
          }}
        >
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      </View>
    )
  }

  /* 로고 및 앱 이름 */
  const HeaderRight = () => {
    const navigation = useNavigation()
    return (
      <View>
        <TouchableOpacity
          style={{ width: 150 }}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={{ width: 50, height: 50 }} source={logo} />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Bigyeong</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    /* 네비게이션 구조
      Stack Navigator (only use by header)
      - Drawer Navigator (Menu) <- SideDrawer.js
        - BottomTab Navigator < - BottomTab.js
          - TopTab Navigator (BottomTab의 홈 에만 적용) < - TopTab.js
    */
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft />,
            headerTitle: () => null,
          }}
          name="Drawer"
          component={DrawerComponent}
        />
      </Stack.Navigator>
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

export default App
