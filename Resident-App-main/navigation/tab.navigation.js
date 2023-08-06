import * as Notifications from "expo-notifications";

import { BellIcon, EmailIcon, PersonIcon } from "components/Icons.jsx";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import { getToken, registerNewExpoToken } from "../api";

import Constants from "expo-constants";
import { HomeStack } from "navigations/stack.navigation";
import { NavigationContainer } from "@react-navigation/native";
import Requests from "screens/Requests";
import Settings from "screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import io from "socket.io-client";
import useStore from "../states/store";

const { Navigator, Screen } = createBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={{ backgroundColor: "#121212" }}
  >
    <BottomNavigationTab title="Dashboard" icon={PersonIcon} />
    <BottomNavigationTab title="Requests" icon={EmailIcon} />
    <BottomNavigationTab
      title="SETTINGS"
      icon={(props) => <Icon {...props} name="settings-2-outline" />}
    />
  </BottomNavigation>
);

export const TabNavigator = () => {
  const { socket, setSocket, toggleRefresh } = useStore();
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(async () => {
    const _token = await getToken();
    setToken(_token);
  }, []);

  useEffect(() => {
    try {
      if (token === null || token === undefined) return;
      if (expoPushToken === null || expoPushToken === undefined) return;
      let newSocket = io.connect("https://api.nsift.tech", {
        transports: ["websocket"],
        extraHeaders: {
          app: expoPushToken,
          Authorization: `Bearer ${token}`,
        },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        setLoading(false);
        setConnected(true);
      });

      newSocket.on("newRequest", (data) => {
        schedulePushNotification(data);
        toggleRefresh();
      });

      newSocket.on("unauthorized", (error) => {
        if (
          error.data.type == "UnauthorizedError" ||
          error.data.code == "invalid_token"
        ) {
          // redirect user to login page perhaps?
          console.log("User token has expired");
        }
      });

      newSocket.on("error", (error) => {
        console.log(error);
        setLoading(true);
        setLoadingData(true);
      });
      return () => {
        newSocket.close();
      };
    } catch (e) {
      console.log(e);
    }
  }, [setSocket, token, expoPushToken]);
  useEffect(async () => {
    const pushToken = await registerForPushNotificationsAsync();
    registerNewExpoToken({ expoToken: pushToken });
    setExpoPushToken(pushToken);
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 20,
        },
      }}
    >
      <Screen name="Dashboard" component={HomeStack} />
      <Screen name="Requests" component={Requests} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
};
async function schedulePushNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got New Request! 📬",
      body:
        data.firstName.toUpperCase() +
        " " +
        data.lastName.toUpperCase() +
        " wants to meet with you!",
      data: { reason: data.reason, mobile: data.mobile },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
