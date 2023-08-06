import { StyleSheet, View } from "react-native";

import React from "react";
import { Text } from "@ui-kitten/components";
import moment from "moment";

export const CardHeader = (props) => {
  return (
    <View {...props} style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
      <Text category="h2">Request Details</Text>
      <Text category="s1">
        Created: {moment(props.details.createdAt).fromNow()}
      </Text>
    </View>
  );
};
