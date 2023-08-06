import Details from "screens/Details";
import Home from "screens/Home";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);
