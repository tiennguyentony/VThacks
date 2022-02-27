import { View, Text, Image } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "rgb(248,113,113)",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: 20,
        marginHorizontal: 60,
        alignSelf: "flex-start",
      }}
    >
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 9999,
          position: "absolute",
          bottom: 0,
          left: -60,
        }}
        source={{ uri: message.photoURL }}
      />

      <Text style={{ color: "white" }}>{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;
