import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [bookName, setBookName] = useState(null);

  const incompleteform = !image || !job || !age || !bookName;
  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      bookName: bookName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
      <Image
        style={{ height: "25%", width: "100%", bottom: 60 }}
        resizeMode="contain"
        source={require("../assets/logo2.png")}
      />
      <Text
        style={{ color: "grey", fontSize: 25, bottom: 100, fontWeight: "bold" }}
      >
        Welcome {user.displayName}
      </Text>
      <Text
        style={{
          textAlign: "center",
          padding: 4,
          fontWeight: "bold",
          color: "#de7b73",
          bottom: 80,
        }}
      >
        Step 1: The Book Profile Picture
      </Text>
      <TextInput
        onChangeText={(text) => setImage(text)}
        style={{ alignItems: "center", fontSize: 20, bottom: 60 }}
        placeholder="Enter the Book Profile Picture URL"
      />
      <Text style={{ bottom: 110, color: "#de7b73" }}>
        Go on Google and find the your book's cover link
      </Text>
      <Text
        style={{
          textAlign: "center",
          padding: 4,
          fontWeight: "bold",
          color: "#de7b73",
          bottom: 40,
        }}
      >
        Step 2: Your Book's Genre
      </Text>
      <TextInput
        onChangeText={(text) => setJob(text)}
        style={{ textAlign: "center", fontSize: 20, top: -20 }}
        placeholder="Enter the your Book's genre"
      />
      <Text
        style={{
          textAlign: "center",
          padding: 4,
          fontWeight: "bold",
          color: "#de7b73",
          top: 10,
        }}
      >
        Step 3: Your book Condition
      </Text>
      <TextInput
        onChangeText={(text) => setAge(text)}
        style={{ alignItems: "center", fontSize: 20, top: 30 }}
        placeholder="Enter your book Condition"
      />
      <Text
        style={{
          textAlign: "center",
          padding: 4,
          fontWeight: "bold",
          color: "#de7b73",
          top: 50,
        }}
      >
        Step 4: Your Book Name
      </Text>
      <TextInput
        onChangeText={(text) => setBookName(text)}
        style={{ alignItems: "center", fontSize: 20, top: 70 }}
        placeholder="Enter your book Condition"
      />

      <TouchableOpacity
        disabled={incompleteform}
        style={[
          {
            width: 330,
            height: 70,
            borderRadius: 15,
            top: 300,
            backgroundColor: "#eb5549",
            paddingTop: 20,
          },
          incompleteform
            ? { backgroundColor: "gray" }
            : { backgroundColor: "red" },
        ]}
        onPress={updateUserProfile}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 25 }}>
          {" "}
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
