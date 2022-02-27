import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { AppLoading } from "expo";
const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { loggedInProfile, userSwiped } = params;
  return (
    <View style={{ height: "100%", opacity: "0.84" }}>
      <ImageBackground
        source={require("../assets/matchscreen-01.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            top: 300,
            fontWeight: "bold",
          }}
        >
          You and {userSwiped.bookName} have loved each other's book
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            top: 350,
          }}
        >
          <Image
            style={{ height: 140, width: 140, borderRadius: 140 / 2 }}
            source={{ uri: loggedInProfile.photoURL }}
          />
          <Image
            style={{ height: 140, width: 140, borderRadius: 140 / 2 }}
            source={{ uri: userSwiped.photoURL }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            margin: 5,
            padding: 10,
            borderRadius: 50,
            height: 50,
            width: "50%",
            top: 500,
            left: 100,
          }}
        >
          <Text
            style={{ textAlign: "center", paddingTop: 5, fontSize: 15 }}
            onPress={() => {
              navigation.goBack();
              navigation.navigate("Chat");
            }}
          >
            Send Message
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default MatchedScreen;
