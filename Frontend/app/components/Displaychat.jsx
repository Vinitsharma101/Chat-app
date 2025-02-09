import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false, // Prevent auto connection
  reconnection: false, // Prevent duplicate connections
});

const HomeScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId] = useState(Math.random().toString(36).substring(7)); // Generate random user ID

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("Socket connected from frontend");
    }

    socket.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data, fromOther: true },
      ]);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected from frontend");
      socket.off("message");
    };
  }, []);

  const handleSubmit = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, fromOther: false },
      ]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[
              styles.messageText,
              msg.fromOther ? styles.otherMessage : styles.myMessage,
            ]}
          >
            {msg.text}
          </Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          onChangeText={setMessage}
          value={message}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#3333",
    borderRadius: 8,
  },
});
