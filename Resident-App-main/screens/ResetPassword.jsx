import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { sendEmailOtp, verifyEmailOtp } from "../api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import useStore from "../states/store";

function ResetPassword({ navigation }) {
  const { token, setToken, setMob, setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [otp, setOtp] = useState("");
  const [getOtp, setGetOtp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const reset = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setLoading(false);
    setGetOtp(false);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSendEmailOtp = () => {
    if (!email || email.includes("@") === false) {
      return alert("Please enter valid Email.");
    }
    setLoading(true);
    sendEmailOtp(email)
      .then((res) => {
        if (res !== undefined) {
          if (res.data.status === true) {
            setLoading(false);
            setGetOtp(true);
          } else if (res.data.status === false) {
            setLoading(false);
            return alert(res.data.message);
          }
        }
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  const handleVerifyEmailOtp = () => {
    if (!otp || otp === "" || otp.length < 5) {
      return alert("Please enter valid OTP");
    }
    setLoading(true);
    verifyEmailOtp(email, password, otp)
      .then((res) => {
        if (res) {
          if (res.data.status === true) {
            setLoading(false);
            setGetOtp(false);
            reset();
            alert("Password Reset Successful.");
            navigation.navigate("Login");
          } else if (res.data.status === false) {
            alert(res.data.message);
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: Dimensions.get("window").height * 0.06,
          flex: 0.6,
        }}
      >
        {getOtp === false && (
          <LottieView
            source={require("../assets/lottie/otp.json")}
            autoPlay
            loop
          />
        )}
      </Layout>
      <Text category="h1" style={{ textAlign: "center" }}>
        Reset Password
      </Text>

      <Layout
        style={{ flex: 0.4, padding: Dimensions.get("window").width * 0.1 }}
      >
        {!getOtp && (
          <View>
            <Input
              style={styles.input}
              value={email}
              label="Your Email"
              placeholder="@"
              accessoryRight={(props) => (
                <Icon {...props} name="email-outline" />
              )}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Button
              appearance="outline"
              style={{ marginTop: 20 }}
              onPress={handleSendEmailOtp}
              accessoryRight={(props) => {
                return loading ? (
                  <Spinner size="small" />
                ) : (
                  <Icon {...props} name="arrow-forward-outline" />
                );
              }}
              loading={true}
            >
              SEND OTP
            </Button>
          </View>
        )}
        {getOtp && (
          <View>
            <Input
              style={styles.input}
              value={otp}
              keyboardType="number-pad"
              label="OTP"
              placeholder="+91"
              onChangeText={(nextValue) => setOtp(nextValue)}
            />
            <Input
              style={styles.input}
              value={password}
              label="Your Password"
              placeholder=""
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
              onChangeText={(nextValue) => setPassword(nextValue)}
            />
            <Input
              style={styles.input}
              value={confirmPassword}
              label="Confirm Password"
              placeholder=""
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
              onChangeText={(nextValue) => setConfirmPassword(nextValue)}
            />
            <Button
              appearance="outline"
              style={{ marginTop: 20 }}
              onPress={handleVerifyEmailOtp}
              accessoryRight={(props) => {
                return loading ? (
                  <Spinner size="small" />
                ) : (
                  <Icon {...props} name="arrow-forward-outline" />
                );
              }}
              loading={true}
            >
              VERIFY OTP
            </Button>
          </View>
        )}
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(200,200,200,0.2)",
    borderRadius: 20,
    marginVertical: 10,
  },
});

export default ResetPassword;
