import React from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useNavigation } from "@react-navigation/native"

import Home from "../pages/Home/Home"
import Category from "../pages/Category/Category"
import { themeColor, componentName } from "../theme"

const Tab = createMaterialTopTabNavigator()

const TabBar = ({ state }) => {
  // props.state(밑에 네비게이터에 {...props} 넣었을 때) -> 밑 Tab Navigator의 상태가 나온다.
  // useNavigationState((state) => state) -> 지금 이 top tab이 들어있는 BottomTab.js의 tab navigator의 상태가 나온다.
  const navigation = useNavigation()

  const navigationToScreen = (route) => {
    navigation.navigate(route)
  }
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.topBarContainer}
        horizontal={true}
      >
        {state.routes.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigationToScreen(item.name)}
            style={styles.itemContainer}
          >
            <Text
              style={[
                styles.itemText,
                { backgroundColor: index === state.index ? "#835151" : null },
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const TopTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name={componentName.new} component={Home} />
      <Tab.Screen name={componentName.popular} component={Category} />
      <Tab.Screen name={componentName.theme} component={Category} />
      <Tab.Screen name={componentName.summer} component={Category} />
      <Tab.Screen name={componentName.nature} component={Category} />
      <Tab.Screen name={componentName.city} component={Category} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  topBarContainer: {
    backgroundColor: themeColor.defaultBackgroundColor,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemText: {
    color: themeColor.defaultFontColor,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
})

export default TopTab
