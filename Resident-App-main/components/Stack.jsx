import { Dimensions, View } from "react-native";

import React from "react";

const Stack = (props) => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
        flexDirection: props.direction,
      }}
    >
      {props.children.map((child, index) => {
        return (
          <View
            key={index}
            {...props}
            style={[
              {
                marginTop:
                  props.direction === "column"
                    ? props.spacing * Dimensions.get("window").height * 0.001
                    : 0,
                marginBottom:
                  props.direction === "column"
                    ? props.spacing *
                      Dimensions.get("window").height *
                      0.001 *
                      8
                    : 0,
                marginRight:
                  props.direction === "row"
                    ? props.spacing * Dimensions.get("window").width * 0.03
                    : 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
              },
              { ...props.style },
            ]}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
};

export default Stack;
