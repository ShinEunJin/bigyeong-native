import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome"
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native"

import { componentName } from "../theme"
import FindBySearch from "../pages/Find/FindBySearch"
import FindByMap from "../pages/Find/FindByMap"
import TopTab from "./TopTab"
import Upload from "../pages/Upload/Upload"

const Tab = createBottomTabNavigator()

const TabBar = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // bottom tab의 현재 위치 아이콘 하이라이트 주기
  // 처음로딩때 getFocused가 null일 수 있어서 기본으로 routeName에 "Home" 넣기
  const routeName = getFocusedRouteNameFromRoute(route)
    ? getFocusedRouteNameFromRoute(route)
    : componentName.home
  // tabBar을 쓰면 내가 쉽게 커스터마이징 할 수 있지만
  // tabBar이나 screenOptions를 쓸 수 없다.
  // 이게 단점이 screenOptions를 못 써 route (props)를
  // 쓰기가 힘들다. 만약 useRoute를 써도 상위 navigator인
  // Drawer에 넣은 name="BottomTap"만 쓸 수 있다.

  const navigateToScreen = (route) => {
    navigation.navigate(route)
  }

  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={styles.ItemContainer}
        onPress={() => navigateToScreen(componentName.home)}
      >
        <Icon
          style={styles.ItemIcon}
          size={routeName === componentName.home ? 20 : 15}
          name="home"
        />
        <Text style={styles.ItemText}>홈</Text>
      </Pressable>
      <Pressable
        style={styles.ItemContainer}
        onPress={() => navigateToScreen(componentName.findBySearch)}
      >
        <Icon
          style={styles.ItemIcon}
          name="search"
          size={routeName === componentName.findBySearch ? 20 : 15}
        />
        <Text style={styles.ItemText}>검색</Text>
      </Pressable>
      <Pressable
        style={styles.ItemContainer}
        onPress={() => navigateToScreen(componentName.findByMap)}
      >
        <Icon
          style={styles.ItemIcon}
          name="map"
          size={routeName === componentName.findByMap ? 17 : 12}
        />
        <Text style={styles.ItemText}>지도</Text>
      </Pressable>
    </View>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={() => <TabBar />}>
      {/* TabBar에 있는 컴포넌트 */}
      <Tab.Screen name="Home" component={TopTab} />
      <Tab.Screen name="FindBySearch" component={FindBySearch} />
      <Tab.Screen name="FindByMap" component={FindByMap} />
      {/* TabBar에 없는 컴포넌트 */}
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
  },
  ItemContainer: {
    flex: 1,
    height: "100%",
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemIcon: {
    marginBottom: 2,
  },
  ItemText: {
    opacity: 0.5,
    fontSize: 12,
  },
})

export default BottomTab
