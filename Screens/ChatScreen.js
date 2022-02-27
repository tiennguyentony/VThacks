import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Header from "../component/Header";
import ChatList from "../component/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
