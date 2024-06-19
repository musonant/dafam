import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { fonts } from "@/constants/typography";
import { Text, View } from "./Themed";

type UserDataType = {
  name: string;
  userIcon?: string;
};
export default function UserThumbnail({
  userData,
}: {
  userData: UserDataType;
}) {
  const {
    name,
    userIcon = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  } = userData || {};

  return (
    <View>
      <View style={styles.header}>
        <Image source={{ uri: userIcon }} style={styles.userIcon} />
        <View>
          <Text style={styles.author}>{name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    width: 44,
    height: 44,
    backgroundColor: "#ECF0F1",
    borderRadius: 22,
  },
  author: {
    fontFamily: fonts.primaryRegular,
  },
  date: {
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomColor: "#ECF0F1",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
});
