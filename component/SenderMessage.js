import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "red",
        borderRadius: 10,
        borderTopRightRadius: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        alignContent: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text style={{ color: "white" }}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
