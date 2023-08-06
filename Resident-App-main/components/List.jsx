import {
  Avatar,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { useState } from "react";

import DetailCard from "components/DetailCard";
import { StyleSheet } from "react-native";
import moment from "moment";

const ListAccessoriesShowcase = ({ data, navigation }) => {
  const theme = useTheme();
  const [detailsVisible, setDetailsVisible] = useState(true);
  const [details, setDetails] = useState(null);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={(evaProps) => {
        evaProps.style[0].color = "#FAFAFAE6";
        return (
          <Text {...evaProps}>
            Name:{" "}
            {item.firstName.toUpperCase() + " " + item.lastName.toUpperCase()}
          </Text>
        );
      }}
      description={(evaProps) => (
        <>
          <Text {...evaProps}>Reason: {item.reason}</Text>
          <Text {...evaProps}>Created: {moment(item.createdAt).fromNow()}</Text>
        </>
      )}
      accessoryLeft={(evaProps) => (
        <Avatar
          style={{ marginHorizontal: 10 }}
          size="medium"
          source={{ uri: `https://api.nsift.tech/assets/${item.image}` }}
        />
      )}
      accessoryRight={(props) => (
        <Button
          size="tiny"
          appearance="outline"
          onPress={() => {
            setDetailsVisible(true);
            setDetails(item);
          }}
        >
          View Details
        </Button>
      )}
      style={{
        marginVertical: 10,
        backgroundColor: theme["color-primary-900"],
        borderRadius: 10,
        paddingHorizontal: 10,
      }}
    />
  );

  return (
    <>
      <List
        data={data}
        renderItem={renderItem}
        style={{ backgroundColor: "transparent" }}
      />
      {detailsVisible && details && (
        <DetailCard
          visible={detailsVisible}
          setVisible={setDetailsVisible}
          details={details}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default ListAccessoriesShowcase;
