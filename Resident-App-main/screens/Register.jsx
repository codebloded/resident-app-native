import * as ImagePicker from "expo-image-picker";

import {
  Avatar,
  Button,
  Icon,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Stack from "components/Stack";
import { registerUser } from "../api";
import useStore from "../states/store";

function Register({ navigation }) {
  const { mob } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [flat, setFlat] = useState("");
  const [building, setBuilding] = useState("");
  const [society, setSociety] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imgUri, setImgUri] = useState(null);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const pickImage = async () => {
    let granted = await ImagePicker.requestMediaLibraryPermissionsAsync(true);
    if (granted.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        setImage(result.base64);
        setImgUri(result.uri);
      }
    } else {
      alert("Permission Denied");
    }
  };
  const handleRegister = () => {
    if (!firstName || firstName === "") {
      return alert("Please enter first name");
    } else if (!lastName || lastName === "") {
      return alert("Please enter last name");
    } else if (!mob || mob === "") {
      return alert("Please enter mobile number");
    } else if (!email || email === "") {
      return alert("Please enter email");
    } else if (!password || password === "") {
      return alert("Please enter password");
    } else if (!confirmPassword || confirmPassword === "") {
      return alert("Please enter confirm password");
    } else if (password.length < 6) {
      return alert("Password must be atleast 6 characters");
    } else if (password !== confirmPassword) {
      return alert("Password and confirm password does not match");
    } else if (!flat || flat === "") {
      return alert("Please enter flat number");
    } else if (!building || building === "") {
      return alert("Please enter building name");
    } else if (!society || society === "") {
      return alert("Please enter society name");
    } else if (!address || address === "") {
      return alert("Please enter address");
    }
    setLoading(true);
    let body;
    if (image) {
      body = {
        firstName,
        lastName,
        email,
        password,
        flat,
        building,
        society,
        address,
        mobile: mob,
        avatar: image,
      };
    } else {
      body = {
        firstName,
        lastName,
        email,
        password,
        flat,
        building,
        society,
        address,
        mobile: mob,
      };
    }

    registerUser(body)
      .then((res) => {
        if (res !== undefined) {
          if (res.data.status === true) {
            setLoading(false);
            alert("Registered Successfully, Please Login!");
            navigation.navigate("Login");
          } else if (res.data.status === false) {
            setLoading(false);
            return alert(res.data.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
        setLoading(false);
      });
  };

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView
        style={{
          width: Dimensions.get("window").width * 0.9,
          marginTop: Dimensions.get("window").width * 0.07,
        }}
      >
        <Stack direction="column" spacing={4}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Avatar
                style={{ alignSelf: "center" }}
                size="giant"
                source={image ? { uri: imgUri } : require("../assets/user.png")}
              />
            </TouchableOpacity>
            <Button
              appearance="ghost"
              status="danger"
              onPress={() => {
                setImage(null);
                setImgUri(null);
              }}
              accessoryLeft={(props) => (
                <Icon {...props} name="trash-2-outline" />
              )}
            />
          </View>

          <Input
            value={firstName}
            label="First Name"
            placeholder="Your First Name"
            accessoryRight={(props) => <Icon {...props} name="text-outline" />}
            onChangeText={(nextValue) => setFirstName(nextValue)}
            style={styles.input}
          />
          <Input
            style={styles.input}
            value={lastName}
            label="Last Name"
            placeholder="Your Last Name"
            accessoryRight={(props) => <Icon {...props} name="text-outline" />}
            onChangeText={(nextValue) => setLastName(nextValue)}
          />
          <Input
            style={styles.input}
            value={email}
            label="Email"
            placeholder="Your Email Address"
            accessoryRight={(props) => <Icon {...props} name="at-outline" />}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Input
            style={styles.input}
            label="Mobile Number"
            disabled={true}
            placeholder={mob}
            accessoryRight={(props) => <Icon {...props} name="phone-outline" />}
          />
          <Input
            style={styles.input}
            value={password}
            label="Password"
            placeholder="Your Password"
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
          <Input
            style={styles.input}
            value={confirmPassword}
            label="Confirm Password"
            placeholder="Confirm Password"
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
            onChangeText={(nextValue) => setConfirmPassword(nextValue)}
          />
          {confirmPassword !== password && (
            <Text style={{ color: "red", textAlign: "center" }}>
              Password Mismatch
            </Text>
          )}
          <Input
            style={styles.input}
            value={flat}
            label="Flat no."
            placeholder="Your Flat No."
            onChangeText={(nextValue) => setFlat(nextValue)}
          />
          <Input
            style={styles.input}
            value={building}
            label="Building / Tower Name"
            placeholder="Your Building / Tower Name"
            onChangeText={(nextValue) => setBuilding(nextValue)}
          />
          <Input
            style={styles.input}
            value={society}
            label="Society Name"
            placeholder="Your Society Name"
            onChangeText={(nextValue) => setSociety(nextValue)}
          />
          <Input
            style={styles.input}
            value={address}
            label="Complete Address"
            placeholder="Your Complete Address"
            size="large"
            onChangeText={(nextValue) => setAddress(nextValue)}
          />
          <Button appearance="outline" onPress={handleRegister}>
            REGISTER
          </Button>
        </Stack>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(200,200,200,0.2)",
    borderRadius: 20,
  },
});

export default Register;
