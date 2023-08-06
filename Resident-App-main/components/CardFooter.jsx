import { StyleSheet, View } from "react-native";
import { acceptRequest, rejectRequest } from "../api/index";

import { Button } from "@ui-kitten/components";
import React from "react";
import useStore from "../states/store";

export const CardFooter = ({ navigation, details, setVisible }) => {
  const { toggleRefresh } = useStore();
  const handleAcceptRequest = async () => {
    const { _id } = details;
    if (!_id) return alert("Something went wrong");
    await acceptRequest(_id)
      .then((res) => {
        if (res) {
          if (res.data.status === true) {
            alert(res.data.message);
            setVisible(false);
            navigation.navigate("Requests");
            toggleRefresh();
          } else {
            setVisible(false);
            alert(res.data.message);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
        setVisible(false);
      });
  };

  const handleRejectRequest = async () => {
    const { _id } = details;
    if (!_id) return alert("Something went wrong");
    await rejectRequest(_id)
      .then((res) => {
        if (res) {
          if (res.data.status === true) {
            alert(res.data.message);
            setVisible(false);
            navigation.navigate("Requests");
            toggleRefresh();
          } else {
            setVisible(false);
            alert(res.data.message);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setVisible(false);
        alert(e.message);
      });
  };
  return (
    <View style={styles.footerContainer}>
      {details.status === "pending" && (
        <View style={{ flexDirection: "row" }}>
          <Button
            style={styles.footerControl}
            size="small"
            onPress={handleAcceptRequest}
          >
            ACCEPT
          </Button>
          <Button
            style={styles.footerControl}
            size="small"
            onPress={handleRejectRequest}
          >
            REJECT
          </Button>
        </View>
      )}
      <Button
        style={styles.footerControl}
        size="small"
        appearance="outline"
        status="basic"
        onPress={() => setVisible(false)}
      >
        CLOSE
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 20,
    paddingRight: 20,
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
