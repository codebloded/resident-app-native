import Landing from "screens/Landing";
import Login from "screens/Login";
import React from "react";
import Register from "screens/Register";
import ResetPassword from "screens/ResetPassword";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Reset-Password" component={ResetPassword} />
  </Stack.Navigator>
);
