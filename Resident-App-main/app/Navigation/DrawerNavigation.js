import { Button, StyleSheet, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import EnrollScreen from "../Screens/EnrollScreen";
import Home from "../Screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Tabnavigation from "./Tab/TabNavigation";

function ViewData() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ViewData Screen</Text>
    </View>
  );
}
function Scanner() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Scanner Screen</Text>
    </View>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();
const Drawernavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Tab" component={Tabnavigation} />
      <Drawer.Screen name="ViewData" component={ViewData} />
      <Drawer.Screen name="Scanner" component={Scanner} />
      <Drawer.Screen name="Enroll" component={EnrollScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Drawernavigation;
