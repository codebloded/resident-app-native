import { Button, Divider, Icon, Layout, Text } from "@ui-kitten/components";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "../assets/logo.png";
import LottieView from "lottie-react-native";
import React from "react";
import TextureBackground from "../assets/black-linen.png";

function Landing({ navigation }) {
  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        source={TextureBackground}
        resizeMode="cover"
        repeat="repeat"
        style={{ flex: 1, opacity: 1 }}
      >
        <View
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: Dimensions.get("window").width * 0.01,
          }}
        >
          <Image
            source={Logo}
            resizeMode="contain"
            style={{
              width: Dimensions.get("window").width * 0.9,
            }}
          />
        </View>
        <View
          style={{
            flex: 0.3,
            paddingHorizontal: Dimensions.get("window").width * 0.1,
          }}
        >
          <Text category="h1">WELCOME to Resident's by NS!</Text>

          <Button
            onPress={() => navigation.navigate("Login")}
            appearance="filled"
            style={{ marginVertical: 20 }}
            size="giant"
            accessoryRight={(props) => (
              <Icon {...props} name="paper-plane-outline" />
            )}
          >
            GET STARTED
          </Button>
        </View>
      </ImageBackground>
    </Layout>
  );
}

export default Landing;
