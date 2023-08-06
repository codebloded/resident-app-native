import {
  Avatar,
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import {
  Dimensions,
  PixelRatio,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Stack from "components/Stack";
import useStore from "../states/store";

const Settings = (props) => {
  const { token, setToken, setUser, user } = useStore();
  const window = useWindowDimensions();
  const pixelRatio = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();
  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          marginVertical: Dimensions.get("window").height * 0.05,
          paddingVertical: Dimensions.get("window").height * 0.01,
          paddingStart: Dimensions.get("window").width * 0.01,
        }}
      >
        <Layout
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => {
                props.navigation.goBack();
              }}
              accessoryLeft={(props) => <Icon {...props} name="arrow-back" />}
              appearance="ghost"
            />
            <Text
              category="h1"
              style={{
                fontSize: pixelRatio * fontScale * (window.width * 0.04),
                lineHeight: pixelRatio * fontScale * (window.width * 0.05),
                alignSelf: "center",
              }}
            >
              Profile Details
            </Text>
          </View>

          <Button
            onPress={async () => {
              setToken(null);
              setUser(null);
              await AsyncStorage.removeItem("@token");
              await AsyncStorage.removeItem("@user");
            }}
            accessoryLeft={(props) => (
              <Icon {...props} name="log-out-outline" />
            )}
            appearance="ghost"
          />
        </Layout>
        <Divider style={{ width: 300, marginStart: 30 }} />
      </Layout>
      {user && (
        <ScrollView>
          <Layout style={{ flex: 1, alignItems: "center" }}>
            <Avatar
              size="giant"
              source={{ uri: `https://api.nsift.tech/assets/` + user.image }}
              style={{
                height: Dimensions.get("window").height * 0.2,
                width: Dimensions.get("window").height * 0.2,
              }}
            />
            <View style={{ marginTop: 20 }}>
              <Stack
                direction="column"
                spacing={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  category="h1"
                  style={{
                    fontSize: pixelRatio * fontScale * (window.width * 0.04),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.05),
                  }}
                >
                  {user.firstName.toUpperCase() +
                    " " +
                    user.lastName.toUpperCase()}{" "}
                </Text>

                <Text category="h5">Email: {user.email}</Text>
                <Text category="h5">Mobile: +91 {user.mobile}</Text>
                <Text category="h5">
                  Email Verified: {user.emailVerified ? "Yes" : "No"}
                </Text>
                <Text category="h5">Flat: {user.flat}</Text>
                <Text category="h5">Building: {user.building}</Text>
                <Text category="h5">Society: {user.society}</Text>
              </Stack>
            </View>
          </Layout>
        </ScrollView>
      )}
    </Layout>
  );
};

export default Settings;
