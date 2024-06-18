import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem("userData");
      setUserEmail(JSON.parse(data).email);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're logged in</Text>
      <Text style={styles.title}>{userEmail}</Text>
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
