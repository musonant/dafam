import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function TabOneScreen() {
  function logOut() {
    AsyncStorage.removeItem("userData");
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" color="blue" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
