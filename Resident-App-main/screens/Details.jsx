import {
  Button,
  Divider,
  Icon,
  Layout,
  Spinner,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";

import DetailCard from "components/DetailCard";
import { Dimensions } from "react-native";
import ListItem from "components/List";
import axios from "axios";
import { fetchUserRequests } from "../api/index";

const BackIcon = (props) => (
  <Icon
    {...props}
    name="arrow-back"
    style={[props.style, { tintColor: "#fafafa" }]}
  />
);

const DetailsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUserRequests()
      .then((res) => {
        if (res !== undefined && res.data) {
          setData(res.data.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <Layout style={{ flex: 1 }}>
      {/* <Layout
        style={{
          paddingVertical: Dimensions.get("window").height * 0.01,
          paddingStart: Dimensions.get("window").width * 0.01,
          width: "auto",
        }}
      >
        <Layout style={{ flexDirection: "row" }}>
          <Button
            onPress={navigateBack}
            accessoryLeft={BackAction}
            appearance="ghost"
          />
          <Text category="h1" style={{ lineHeight: 80 }}>
            All Requests
          </Text>
        </Layout>
        <Divider style={{ width: 300, marginStart: 30 }} />
      </Layout>
      {loading && (
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner size="giant" />
        </Layout>
      )}
      <Layout
        level="1"
        style={{
          marginTop: 20,
          height: "auto",
          paddingHorizontal: 20,
        }}
      >
        {!loading && data.length > 0 && <ListItem data={data} />}
        {data.length === 0 && !loading && (
          <Text appearance="h1">No Requests Found</Text>
        )}
      </Layout> */}
    </Layout>
  );
};
export default DetailsScreen;
