import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  Spinner,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  Dimensions,
  PixelRatio,
  ScrollView,
  StatusBar,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  acceptRequest,
  fetchUserPendingRequest,
  fetchUserStats,
  rejectRequest,
} from "../api/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import Stack from "components/Stack";
import moment from "moment";
import useStore from "../states/store";

const HomeScreen = ({ navigation }) => {
  const window = useWindowDimensions();
  const { toggleRefresh, socket, refreshData } = useStore();
  const pixelRatio = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();
  const theme = useTheme();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    fetchUserPendingRequest()
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
    fetchInfo();
  }, [handleAcceptRequest, handleRejectRequest, refreshData]);

  const fetchInfo = () => {
    fetchUserStats()
      .then((res) => {
        if (res.data.status === true) {
          setStats(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching stats");
      });
  };

  const handleAcceptRequest = async (id) => {
    await acceptRequest(id)
      .then((res) => {
        if (res.data.status === true) {
          fetchData();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error accepting request");
      });
  };
  const handleRejectRequest = async (id) => {
    await rejectRequest(id)
      .then((res) => {
        if (res.data.status === true) {
          fetchData();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error rejecting request");
      });
  };

  return (
    <Layout
      style={{
        flex: 1,
        paddingHorizontal: Dimensions.get("window").width * 0.04,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginVertical: Dimensions.get("window").height * 0.03,
          }}
        >
          <Text
            category="h1"
            style={{ fontSize: pixelRatio * fontScale * (window.width * 0.05) }}
          >
            Dashboard
          </Text>
        </View>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={0.5}>
            <LinearGradient
              start={[0.1, 0.2]}
              colors={[
                theme["color-warning-900"],
                theme["color-warning-700"],
                theme["color-warning-500"],
              ]}
              style={{
                flex: 1,
                flexShrink: 1,
                width: Dimensions.get("window").width * 0.45,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: Dimensions.get("window").height * 0.02,
                  shadowColor: theme["color-warning-900"],

                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  shadowOffset: {
                    height: 5,
                    width: 5,
                  },
                }}
              >
                <Button
                  accessoryLeft={(props) => (
                    <View
                      style={{
                        backgroundColor: theme["color-warning-500"] + "26",
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Icon
                        {...props}
                        name="trending-up-outline"
                        fill={theme["color-warning-500"]}
                      />
                    </View>
                  )}
                  appearance="ghost"
                />

                <Text
                  category="h1"
                  style={{
                    color: theme["color-warning-100"] + "E6",
                    fontSize: pixelRatio * fontScale * (window.width * 0.03),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  Accepted Requests
                </Text>
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.002,
                    borderRadius: 10,
                    width: Dimensions.get("window").width * 0.08,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    marginVertical: 5,
                  }}
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-warning-100"] + "F2",
                    fontSize: pixelRatio * fontScale * (window.width * 0.025),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  {stats.acceptedRequests}
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              start={[0.1, 0.2]}
              colors={[
                theme["color-danger-900"],
                theme["color-danger-700"],
                theme["color-danger-500"],
              ]}
              style={{
                flex: 1,
                flexShrink: 1,
                width: Dimensions.get("window").width * 0.45,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: Dimensions.get("window").height * 0.02,
                }}
              >
                <Button
                  accessoryLeft={(props) => (
                    <View
                      style={{
                        backgroundColor: theme["color-danger-500"] + "26",
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Icon
                        {...props}
                        name="people-outline"
                        fill={theme["color-danger-500"]}
                      />
                    </View>
                  )}
                  appearance="ghost"
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-danger-100"] + "E6",
                    fontSize: pixelRatio * fontScale * (window.width * 0.03),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  Your Requests
                </Text>
                <View
                  style={{
                    height: Dimensions.get("window").width * 0.002,
                    borderRadius: 10,
                    width: Dimensions.get("window").width * 0.08,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    marginVertical: 5,
                  }}
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-danger-100"] + "F2",
                    fontSize: pixelRatio * fontScale * (window.width * 0.025),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  {stats.totalRequests}
                </Text>
              </View>
            </LinearGradient>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <LinearGradient
              start={[0.1, 0.2]}
              colors={[
                theme["color-primary-900"],
                theme["color-primary-700"],
                theme["color-primary-500"],
              ]}
              style={{
                flex: 1,
                flexShrink: 1,
                width: Dimensions.get("window").width * 0.45,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: Dimensions.get("window").height * 0.02,
                }}
              >
                <Button
                  accessoryLeft={(props) => (
                    <View
                      style={{
                        backgroundColor: theme["color-primary-500"] + "26",
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Icon {...props} name="activity-outline" />
                    </View>
                  )}
                  appearance="ghost"
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-info-100"] + "E6",
                    fontSize: pixelRatio * fontScale * (window.width * 0.03),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  Total Requests
                </Text>
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.002,
                    borderRadius: 10,
                    width: Dimensions.get("window").width * 0.08,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    marginVertical: 5,
                  }}
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-info-100"] + "F2",
                    fontSize: pixelRatio * fontScale * (window.width * 0.025),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  {stats.requests}
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              start={[0.1, 0.2]}
              colors={[
                theme["color-success-900"],
                theme["color-success-700"],
                theme["color-success-500"],
              ]}
              style={{
                flex: 1,
                flexShrink: 1,
                width: Dimensions.get("window").width * 0.45,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: Dimensions.get("window").height * 0.02,
                }}
              >
                <Button
                  accessoryLeft={(props) => (
                    <View
                      style={{
                        backgroundColor: theme["color-success-500"] + "26",
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Icon
                        {...props}
                        name="people-outline"
                        fill={theme["color-success-500"]}
                      />
                    </View>
                  )}
                  appearance="ghost"
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-success-100"] + "E6",
                    fontSize: pixelRatio * fontScale * (window.width * 0.03),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  Total Residents
                </Text>
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.002,
                    borderRadius: 10,
                    width: Dimensions.get("window").width * 0.08,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    marginVertical: 5,
                  }}
                />
                <Text
                  category="h1"
                  style={{
                    color: theme["color-info-100"] + "F2",
                    fontSize: pixelRatio * fontScale * (window.width * 0.025),
                    lineHeight: pixelRatio * fontScale * (window.width * 0.03),
                    textAlign: "center",
                  }}
                >
                  {stats.residents}
                </Text>
              </View>
            </LinearGradient>
          </Stack>
        </Stack>
        <Layout style={{ marginVertical: 20, flex: 1 }}>
          <Layout
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                category="h1"
                style={{
                  fontSize: pixelRatio * fontScale * (window.width * 0.05),
                  lineHeight: pixelRatio * fontScale * (window.width * 0.05),
                }}
              >
                Pending Requests
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
          {!loading && data.length === 0 && (
            <View style={{ flex: 1 }}>
              <LottieView
                source={require("../assets/lottie/done.json")}
                autoPlay
                loop
              />
            </View>
          )}
          {loading && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Spinner size="giant" />
            </View>
          )}
          <ScrollView
            horizontal
            bouncesZoom
            alwaysBounceHorizontal
            style={{ marginTop: 20 }}
          >
            {data.map((request, idx) => (
              <LinearGradient
                key={idx}
                start={[0.1, 0.2]}
                colors={[
                  theme["color-success-900"],
                  theme["color-success-700"],
                  theme["color-success-500"],
                ]}
                style={{
                  flex: 1,
                  flexShrink: 1,
                  width: Dimensions.get("window").width * 0.7,
                  borderRadius: 10,
                  marginRight: Dimensions.get("window").width * 0.05,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexShrink: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    category="h4"
                    style={{
                      color: theme["color-success-100"] + "E6",
                      fontSize: pixelRatio * fontScale * (window.width * 0.03),
                      fontWeight: "bold",
                      lineHeight:
                        pixelRatio * fontScale * (window.width * 0.04),
                    }}
                  >
                    {request.firstName.toUpperCase()}{" "}
                    {request.lastName.toUpperCase()}
                  </Text>
                  <View
                    style={{
                      height: Dimensions.get("window").height * 0.002,
                      borderRadius: 10,
                      width: Dimensions.get("window").width * 0.2,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      marginVertical: 5,
                    }}
                  />
                  <Text
                    category="h6"
                    style={{
                      color: theme["color-success-100"] + "E6",
                      fontSize: pixelRatio * fontScale * (window.width * 0.015),
                    }}
                  >
                    Reason: {request.reason}
                  </Text>
                  <Text
                    category="h6"
                    style={{
                      color: theme["color-success-100"] + "E6",
                      fontSize: pixelRatio * fontScale * (window.width * 0.02),
                    }}
                  >
                    {moment(request.createdAt).fromNow()}
                  </Text>
                  <Stack direction="row" spacing={1} style={{}}>
                    <Button
                      appearance="ghost"
                      onPress={() => handleAcceptRequest(request._id)}
                      accessoryLeft={(props) => (
                        <View
                          style={{
                            backgroundColor: theme["color-success-100"],
                            borderRadius: 8,
                          }}
                        >
                          <Icon
                            {...props}
                            name="checkmark-outline"
                            fill={`${theme["color-success-900"]}`}
                          />
                        </View>
                      )}
                    />
                    <Button
                      appearance="ghost"
                      onPress={() => handleRejectRequest(request._id)}
                      accessoryLeft={(props) => (
                        <View
                          style={{
                            backgroundColor: theme["color-success-100"],
                            borderRadius: 8,
                          }}
                        >
                          <Icon
                            {...props}
                            name="close-outline"
                            fill={`${theme["color-success-900"]}`}
                          />
                        </View>
                      )}
                    />
                  </Stack>
                </View>
              </LinearGradient>
            ))}
          </ScrollView>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
