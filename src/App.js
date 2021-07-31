import React from "react"
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InteractionManager,
} from "react-native"
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
import Detail from "./pages/Detail/Detail"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function App() {
  // 이 코드들이 없으면 Setting Time Warning이 뜬다.
  //#region ERROR Solution: Setting a timer for a long period of time, i.e. multiple minutes,
  const _setTimeout = global.setTimeout
  const _clearTimeout = global.clearTimeout
  const MAX_TIMER_DURATION_MS = 60 * 1000
  if (Platform.OS === "android") {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {}
    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now()
      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timerFix[id]) {
            return
          }
          delete timerFix[id]
          fn(...args)
        })
        return
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS)
      timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime)
    }

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time
        const id = "_lt_" + Object.keys(timerFix).length
        runTask(id, fn, ttl, args)
        return id
      }
      return _setTimeout(fn, time, ...args)
    }

    global.clearTimeout = (id) => {
      if (typeof id === "string" && id.startsWith("_lt_")) {
        _clearTimeout(timerFix[id])
        delete timerFix[id]
        return
      }
      _clearTimeout(id)
    }
  }
  //#endregion

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
        <Stack.Screen
          options={{
            headerTitle: () => null,
            headerTransparent: true,
          }}
          name="Detail"
          component={Detail}
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
