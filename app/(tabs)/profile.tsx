import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { endSession } from "@/store/authSlice";

export default function Profile() {
  const dispatch = useDispatch();

  function logOut() {
    dispatch(endSession());
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
