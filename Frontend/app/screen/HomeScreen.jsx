import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Displaychat from "../components/Displaychat";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Displaychat />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
