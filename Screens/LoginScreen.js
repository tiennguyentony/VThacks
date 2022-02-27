import {
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require("../assets/background2.jpg")}
      >
        <Image
          style={{
            width: 500,
            height: 500,
            position: "absolute",
            justifyContent: "center",
            top: 100,
            left: -50,
          }}
          source={require("../assets/logoSignIn.png")}
        />
        <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
          <Text style={styles.text}>Sign In & Get Swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "center", fontWeight: "700" },

  image: {
    width: "100%",
    height: "100%",
    flex: 0,
  },
  button: {
    position: "absolute",

    bottom: 200,
    width: 200,
    borderRadius: 20,

    marginHorizontal: "25%",
    backgroundColor: "white",
    padding: 15,
  },
});
export default LoginScreen;
