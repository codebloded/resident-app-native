import {
  Button,
  Divider,
  Icon,
  Layout,
  Spinner,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import {
  Dimensions,
  PixelRatio,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import DetailCard from "components/DetailCard";
import ListItem from "components/List";
import LottieView from "lottie-react-native";
import axios from "axios";
import { fetchUserAllRequests } from "../api/index";
import useStore from "../states/store";

const BackIcon = (props) => (
  <Icon
    {...props}
    name="arrow-back"
    style={[props.style, { tintColor: "#fafafa" }]}
  />
);

const Requests = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshData, socket, toggleRefresh } = useStore();
  const window = useWindowDimensions();
  const pixelRatio = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();

  const fetchData = async () => {
    setLoading(true);
    fetchUserAllRequests()
      .then((res) => {
        if (res !== undefined) {
          if (res.data.status === true) {
            setData(res.data.data);
            setLoading(false);
          } else if (res.data.status === false) {
            alert(res.data.message);
            setLoading(false);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    fetchData();
  }, [refreshData]);

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
              Requests
            </Text>
          </View>

          <Button
            onPress={() => {
              fetchData();
            }}
            accessoryLeft={(props) => (
              <Icon {...props} name="refresh-outline" />
            )}
            appearance="ghost"
          />
        </Layout>
        <Divider style={{ width: 300, marginStart: 30 }} />
      </Layout>
      {loading && (
        <Layout
          style={{
            flex: 0.8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size="giant" />
        </Layout>
      )}
      <Layout
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        {!loading && data.length > 0 && <ListItem data={data} {...props} />}
        {data.length === 0 && !loading && (
          <View style={{ flex: 1 }}>
            <LottieView
              source={require("../assets/lottie/empty.json")}
              autoPlay={true}
              loop
            />
          </View>
        )}
      </Layout>
    </Layout>
  );
};
export default Requests;
