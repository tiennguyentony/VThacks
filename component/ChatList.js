import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "../component/ChatRow";
const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      styles={{ height: "100%" }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={{ paddingTop: 50 }}>
      <Text style={{ textAlign: "center", fontSize: 30, color: "red" }}>
        {" "}
        No matches for you!
      </Text>
    </View>
  );
};

export default ChatList;
