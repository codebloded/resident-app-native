import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Layout,
  Modal,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import { CardFooter } from "components/CardFooter";
import { CardHeader } from "components/CardHeader";
import React from "react";
import moment from "moment";

const ModalWithBackdropShowcase = ({
  visible,
  setVisible,
  details,
  navigation,
  setRefresh,
  refresh,
}) => {
  const theme = useTheme();
  return (
    <Layout level="4">
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card
          style={{
            // backgroundColor: theme["card-background"],
            flex: 1,
            margin: 1,
            paddingVertical: 10,
          }}
          header={() => <CardHeader details={details} />}
          footer={() => (
            <CardFooter
              setVisible={setVisible}
              details={details}
              navigation={navigation}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          )}
        >
          <Button appearance="outline" style={{ marginVertical: 10 }}>
            {details.status.toUpperCase()}
          </Button>
          <Text style={{ marginVertical: 10 }} category="h5">
            Reason: {details.reason.toUpperCase()}
          </Text>
          <Card
            header={() => (
              <View style={{ margin: 8 }}>
                <Text category="h6" style={{ marginStart: 8 }}>
                  Requested By:
                </Text>
              </View>
            )}
            style={{
              marginVertical: 10,
              borderColor: "#fafafa",
              borderRadius: 10,
              borderWidth: 1,
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginEnd: 10,
              }}
            >
              <Avatar
                size="large"
                source={{
                  uri: `https://api.nsift.tech/assets/${details.image}`,
                }}
              />
              <Layout style={{ flexDirection: "column", marginStart: 40 }}>
                <Text category="s1">
                  First Name: {details.firstName.toUpperCase()}
                </Text>
                <Text category="s1">
                  Last Name: {details.lastName.toUpperCase()}
                </Text>
                <Text category="s1">Mobile: +91 {details.mobile}</Text>
              </Layout>
            </Layout>
          </Card>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // minHeight: 200,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
});
export default ModalWithBackdropShowcase;
