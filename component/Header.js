import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingTop: 10 }}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            paddingLeft: 10,
            top: 5,
          }}
        >
          {title}
        </Text>
      </View>
      {callEnabled && (
        <TouchableOpacity
          style={{
            borderRadius: 140,
            marginRight: 10,
            paddingLeft: 15,
            paddingTop: 10,
            width: 50,
            height: 50,
            backgroundColor: "#F2B8C6",
          }}
        >
          <Foundation name="telephone" size={30} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
