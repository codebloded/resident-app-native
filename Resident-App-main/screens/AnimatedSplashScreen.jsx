import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Animated, StyleSheet, View } from "react-native";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useMemo, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import useStore from "../states/store";

SplashScreen.preventAutoHideAsync().catch(() => {});

const customFonts = {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  DMSerifDisplay_400Regular,
};

const AnimatedSplashScreen = ({ children, image }) => {
  const { setToken, setUser } = useStore();
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const loadUserData = () =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem("@user").then((user) => {
        if (user) {
          setUser(JSON.parse(user));
          resolve();
        } else {
          reject();
        }
      });
      console.log(
        "🚀 ~ file: AnimatedSplashScreen.jsx ~ line 54 ~ AsyncStorage.getItem ~ user",
        user
      );
      AsyncStorage.getItem("@token").then((token) => {
        if (token) {
          setToken(token);
          resolve();
        } else {
          reject();
        }
      });
      console.log(
        "🚀 ~ file: AnimatedSplashScreen.jsx ~ line 63 ~ AsyncStorage.getItem ~ token",
        token
      );
    });

  const onImageLoaded = useMemo(() => async () => {
    try {
      await SplashScreen.hideAsync();
      await Promise.all([Font.loadAsync(customFonts), loadUserData()]);
    } catch (e) {
      console.log(e);
      //handle errors
    } finally {
      setAppReady(true);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};
export default AnimatedSplashScreen;
