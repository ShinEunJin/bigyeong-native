import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { CommonActions } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"

const navigateToScreen = (route, props) => () => {
  props.navigation.dispatch(
    CommonActions.navigate({
      name: route,
      params: {},
    })
  )
}
const SideDrawer = (props) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {/* 메인 헤더 제목 */}
        <View>
          <Text style={styles.headTitle}>Menu</Text>
        </View>
        {/* Search Section */}
        <View style={styles.MenuColumn}>
          <View style={styles.iconContainer}>
            <Icon name="search" size={30} />
          </View>
          {/* 검색 */}
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("FindBySearch", props)}>검색</Text>
          </View>
          {/* 지도 */}
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("FindByMap", props)}>지도</Text>
          </View>
        </View>
        {/* Upload Section */}
        <View style={styles.MenuColumn}>
          <View style={styles.iconContainer}>
            <Icon name="camera" size={30} />
          </View>
          {/* 업로드 */}
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("FindBySearch", props)}>
              업로드
            </Text>
          </View>
        </View>
        {/* User Section */}
        <View style={styles.MenuColumn}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={30} />
          </View>
          {/* 찜한 사진*/}
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("FindBySearch", props)}>
              찜목록
            </Text>
          </View>
          {/* 올린 사진 */}
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("FindByMap", props)}>프로필</Text>
          </View>
        </View>
        {/* Setting Section */}
        <View style={styles.MenuColumn}>
          <View style={styles.iconContainer}>
            <Icon name="cog" size={30} />
          </View>
          {/* 환경설정 */}
          <View style={styles.navItemStyle}>
            <Text onPress={navigateToScreen("FindBySearch", props)}>
              Setting
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headTitle: {
    textAlign: "center",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  MenuColumn: {
    marginBottom: 20,
  },
  iconContainer: {
    paddingLeft: 10,
  },
  navItemStyle: {
    margin: 10,
    marginRight: 40,
    marginBottom: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
})

export default SideDrawer
