import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as eva from "@eva-design/eva";

import {
  ActivityIndicator,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";

import AnimatedAppLoader from "./screens/AnimatedAppLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { default as mapping } from "./mapping.json";
import { default as theme } from "./theme/custom-theme.json";
import useStore from "./states/store";

SplashScreen.preventAutoHideAsync().catch(() => {});
const AppNavigator = lazy(() => import("navigations/navigation.container"));
const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const customFonts = {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  DMSerifDisplay_400Regular,
};
export default function App(props) {
  const { setToken, setUser } = useStore();
  let [fontsLoaded] = useFonts(customFonts);

  const loadUserData = async () => {
    const token = await AsyncStorage.getItem("@token");
    const user = await AsyncStorage.getItem("@user");
    if (token) {
      setToken(token);
    }
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <Suspense
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      }
    >
      {fontsLoaded && (
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            {...eva}
            theme={{ ...eva.dark, ...theme }}
            // theme={{ ...eva.light }}
            customMapping={mapping}
          >
            <ExpoStatusBar
              style="light"
              // style="dark"
            />
            <Layout style={{ flex: 1, paddingTop: statusBarHeight }}>
              <AppNavigator />
            </Layout>
          </ApplicationProvider>
        </>
      )}
      {!fontsLoaded && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#181818",
          }}
        >
          <Text>Loading Fonts</Text>
        </View>
      )}
    </Suspense>
  );
}
