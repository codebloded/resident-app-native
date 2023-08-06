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
import { sendOtp, signIn, verifyOtp } from "../api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import useStore from "../states/store";

function Login({ navigation }) {
  const { token, setToken, setMob, setUser } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loginType, setLoginType] = useState("phone");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [otp, setOtp] = useState("");
  const [getOtp, setGetOtp] = useState(false);

  const storeToken = async (tokenToSet) => {
    try {
      await AsyncStorage.setItem("@token", tokenToSet);
    } catch (e) {
      console.log(e);
    }
  };
  const storeUser = async (data) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const reset = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setMobile("");
    setGetOtp(false);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp === "" || otp.length < 5) {
      return alert("Please enter valid OTP");
    }
    setLoading(true);
    verifyOtp(mobile, otp)
      .then((res) => {
        if (res) {
          if (res.data.status === true) {
            setLoading(false);
            setGetOtp(false);
            alert("OTP verified successfully");
            if (res.data.exists === false) {
              setMob(mobile);
              reset();
              navigation.navigate("Register");
            } else {
              reset();
              storeToken(res.data.token);
              setToken(res.data.token);
              storeUser(res.data.data);
              setUser(res.data.data);
            }
          } else {
            setLoading(false);
            alert(res.data.message);
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };

  const handleSendOtp = () => {
    if (!mobile || mobile.length > 10) {
      return alert("Please enter valid mobile number");
    }
    setLoading(true);
    sendOtp(mobile)
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
  const handleSignIn = () => {
    if (!email || password.length < 6) {
      return alert("Please Enter Valid Credentials");
    }
    setLoading(true);
    signIn({ email, password })
      .then((res) => {
        if (res !== undefined) {
          if (res.data.status === true) {
            setLoading(false);
            setUser(res.data.data);
            storeUser(res.data.data);
            storeToken(res.data.token);
            setToken(res.data.token);
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

  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: Dimensions.get("window").height * 0.06,
          flex: 1,
        }}
      >
        {getOtp === false && (
          <LottieView
            source={require("../assets/lottie/otp.json")}
            autoPlay
            loop
          />
        )}
        {getOtp === true && (
          <LottieView
            source={require("../assets/lottie/login.json")}
            autoPlay
            loop
          />
        )}
      </Layout>
      <Text category="h1" style={{ textAlign: "center" }}>
        Login
      </Text>

      {loginType === "phone" && (
        <Layout
          style={{
            padding: Dimensions.get("window").width * 0.1,
          }}
        >
          {!getOtp && (
            <View>
              <Input
                style={styles.input}
                value={mobile}
                keyboardType="number-pad"
                label="Mobile Number"
                placeholder="+91"
                accessoryRight={(props) => (
                  <Icon {...props} name="smartphone-outline" />
                )}
                onChangeText={(nextValue) => setMobile(nextValue)}
              />
              <Button
                appearance="outline"
                style={{ marginTop: 20 }}
                onPress={handleSendOtp}
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
                label="Your OTP"
                keyboardType="number-pad"
                placeholder=""
                onChangeText={(nextValue) => setOtp(nextValue)}
              />
              <Button
                appearance="outline"
                style={{ marginTop: 20 }}
                onPress={handleVerifyOtp}
                accessoryRight={(props) => {
                  return loading ? (
                    <Spinner size="small" />
                  ) : (
                    <Icon {...props} name="arrow-circle-right-outline" />
                  );
                }}
              >
                VERIFY OTP
              </Button>
              <TouchableOpacity
                onPress={() => setGetOtp(false)}
                style={{
                  marginVertical: Dimensions.get("window").height * 0.03,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text category="label" status="info">
                  Incorrect Mobile Number Enter Again?
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setLoginType("email")}
            style={{
              marginVertical: Dimensions.get("window").height * 0.03,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text category="label" status="info">
              Login Using Email Instead?
            </Text>
          </TouchableOpacity>
        </Layout>
      )}
      {loginType === "email" && (
        <Layout
          style={{
            padding: Dimensions.get("window").width * 0.1,
          }}
        >
          <Input
            style={styles.input}
            value={email}
            label="Your Email"
            placeholder="@"
            accessoryRight={(props) => <Icon {...props} name="email-outline" />}
            onChangeText={(nextValue) => setEmail(nextValue)}
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
          <Button
            appearance="outline"
            style={{ marginTop: 20 }}
            onPress={handleSignIn}
            accessoryRight={(props) => {
              return loading ? (
                <Spinner size="small" />
              ) : (
                <Icon {...props} name="log-in-outline" />
              );
            }}
          >
            SIGN IN
          </Button>
          <TouchableOpacity
            onPress={() => setLoginType("phone")}
            style={{
              marginVertical: Dimensions.get("window").height * 0.03,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text category="label" status="info">
              Login Using Phone Number Instead?
            </Text>
          </TouchableOpacity>
          <Text category="c1" appearance="hint" style={{ textAlign: "center" }}>
            Not a Resident? Please verify using Your mobile number to register
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Reset-Password")}
            style={{
              marginVertical: Dimensions.get("window").height * 0.03,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text category="label" status="info">
              Forgot Password? Reset Here.
            </Text>
          </TouchableOpacity>
        </Layout>
      )}
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

export default Login;
