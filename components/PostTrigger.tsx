import { Image } from "expo-image";
import { Text, View } from "./Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function PostTrigger() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "" }} style={styles.userIcon} />
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => router.navigate("/home/create-post")}
        activeOpacity={1}
      >
        <Text>What's on your mind?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 3,
  },
  userIcon: {
    width: 44,
    height: 44,
    backgroundColor: "#ECF0F1",
    borderRadius: 22,
  },
  inputButton: {
    backgroundColor: "#ECF0F1",
    paddingHorizontal: 20,
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
