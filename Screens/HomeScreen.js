import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generatedId from "../lib/generatedId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );
  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      //
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      //
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      //
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);
  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await await (
      await getDoc(doc(db, "users", user.uid))
    ).data();
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          setDoc(doc(db, "matches", generatedId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });
          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", position: "relative" }}>
        <TouchableOpacity style={styles.profile} onPress={logout}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPressIn={() => navigation.navigate("Modal")}>
          <Image
            style={styles.iconImage}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatbubbles}
          onPressIn={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubbles-sharp" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardStyle}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "Nope",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "Match",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View key={card.id} style={styles.card}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: card?.photoURL }}
                />
                <View
                  style={[
                    {
                      position: "absolute",
                      backgroundColor: "white",
                      width: "100%",
                      height: "15%",
                      bottom: 0,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      paddingRight: 10,
                      paddingLeft: 15,
                      paddingTop: 10,
                    },
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                      {card?.bookName}
                    </Text>
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>
                      {card?.job}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 25, fontWeight: "600" }}>
                    {card?.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  {
                    position: "relative",
                    backgroundColor: "white",
                    height: "75%",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  styles.cardShadow,
                ]}
              >
                <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                  No more Profile
                </Text>
                <Image
                  style={{ height: 100, width: "100%" }}
                  height={100}
                  width={100}
                  source={{
                    uri: "https://cdn.iconscout.com/icon/free/png-256/sad-emoji-17-894764.png",
                  }}
                />
              </View>
            );
          }}
        ></Swiper>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80 / 2,
            width: 80,
            height: 80,
            bottom: 20,
            backgroundColor: "#F2B8C6",
          }}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={40} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80 / 2,
            width: 80,
            height: 80,
            backgroundColor: "#99EDC3",
            bottom: 20,
          }}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color={"green"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 9999,
  },
  profile: {
    right: 180,
    top: 20,
    zIndex: 1,
  },
  iconImage: {
    zIndex: 1,
    width: 80,
    height: 80,
    right: 0,
    top: -40,
  },
  chatbubbles: {
    left: 170,
    bottom: 100,
  },
  image: {
    width: "100%",
    height: "110%",
    flex: 0,
  },
  cardStyle: {
    flex: 1,
    marginTop: 0,
    bottom: 120,
  },
  card: {
    backgroundColor: "white",
    height: "75%",
    borderRadius: 10,
    position: "relative",
  },
  cardImage: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default HomeScreen;
