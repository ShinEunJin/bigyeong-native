import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer"

const Drawer = createDrawerNavigator()

const Draw = () => {
    return (
        <Drawer.Navigator
        drawerPosition="right"
        drawerStyle={{ width: 150 }}
        drawerContent={(props) => <SideDrawer {...props} />}
        >
            <Drawer.Screen name="Route" component={} />
        </Drawer.Navigator>
    )
}

export default Draw

const styles = StyleSheet.create({})
