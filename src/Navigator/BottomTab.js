import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome"
import FindBySearch from "../pages/Find/FindBySearch"
import FindByMap from "../pages/Find/FindByMap"
import TopTab from "./TopTab"
import Detail from "../detail/Detail"

const Tab = createBottomTabNavigator()

const Exam = () => {
  return (
    <View>
      <View>
        <Text>홈</Text>
      </View>
      <View>
        <Text>검색</Text>
      </View>
      <View>
        <Text>지도</Text>
      </View>
    </View>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      tabBar={() => <Exam />}
    >
      <Tab.Screen name="Home" component={TopTab} />
      <Tab.Screen name="FindBySearch" component={FindBySearch} />
      <Tab.Screen name="FindByMap" component={FindByMap} />
      <Tab.Screen name="Detail" component={Detail} />
    </Tab.Navigator>
  )
}

export default BottomTab
