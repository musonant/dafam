import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { endSession } from "@/store/authSlice";
import { fonts } from "@/constants/typography";
import UserThumbnail from "@/components/UserThumbnail";

export default function Friends() {
  const dispatch = useDispatch();

  const users = [
    {
      name: "Darasimi Thompson",
    },
    {
      name: "Jane Bill",
    },
    {
      name: "John Ebuka",
    },
    {
      name: "Nzube Lazarus",
    },
    {
      name: "Philimon Otta",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Friends</Text>

      <View>
        {users.map((user) => (
          <UserThumbnail userData={user} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primaryMedium,
    marginTop: 10,
    marginBottom: 10,
  },
});
