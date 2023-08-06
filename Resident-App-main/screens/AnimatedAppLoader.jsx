import React, { useMemo, useState } from "react";

import AnimatedSplashScreen from "./AnimatedSplashScreen";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

function AnimatedAppLoader({ children, setUser, setToken }) {
  const [isSplashReady, setSplashReady] = useState(false);
  const image = require("../assets/icon.png");
  const background = require("../assets/background.png");
  const startAsync = useMemo(
    () => Asset.loadAsync([image, background]),
    [image]
  );

  const onFinish = useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}
export default AnimatedAppLoader;
