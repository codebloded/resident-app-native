import * as Notifications from "expo-notifications";

import {
  Button,
  Dimensions,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { registerNewExpoToken, token } from "../../../api";

import Constants from "expo-constants";
import io from "socket.io-client";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const Home = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((expoToken) => {
        registerNewExpoToken({ expoToken })
          .then((res) => {
            if (res?.data.status === true) {
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setExpoPushToken(expoToken);
      })
      .catch((e) => {
        console.log(e);
      });

    let newSocket = io.connect("https://api.nsift.tech", {
      transports: ["websocket"],
      extraHeaders: {
        app: expoPushToken,
        Authorization: token,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      setLoading(false);
      setConnected(true);
    });

    newSocket.on("newClient", (data) => {
      console.log(data);
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
  }, [setSocket]);

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
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

export default Home;
