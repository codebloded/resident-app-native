import React, { useEffect } from "react";

import { AuthStack } from "navigations/login.navigation";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "navigations/tab.navigation";
import useStore from "../states/store";

const AppNavigator = () => {
  const { token, user } = useStore();

  return (
    <NavigationContainer>
      {token !== undefined && token !== null && user !== undefined ? (
        <TabNavigator />
      ) : (
        <AuthStack />
      )}
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
};
export default AppNavigator;
