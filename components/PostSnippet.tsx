import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { fonts } from "@/constants/typography";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";

import { Text, View } from "./Themed";
import { primaryBlue, primaryColor, tintColorLight } from "@/constants/Colors";

dayjs.extend(relativeTime);

export default function PostSnippet({ postData }) {
  const {
    content = "",
    userIcon,
    author,
    date,
    likesCount,
    commentsCount,
    userLikedPost = false,
  } = postData || {};

  const [isLiked, setIsLiked] = useState(userLikedPost);

  const toggleLikePost = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userIcon }} style={styles.userIcon} />
        <View>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.date}>{dayjs(date).fromNow()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.bodyText}>{content}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.7}
          onPress={toggleLikePost}
        >
          {isLiked ? (
            <AntDesign name="like1" size={24} color={primaryColor} />
          ) : (
            <AntDesign name="like2" size={23} color={primaryBlue} />
          )}
          {likesCount ? (
            <Text style={styles.statsText}>{likesCount}</Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Fontisto name="comment" size={20} color={primaryBlue} />
          {commentsCount ? (
            <Text style={styles.statsText}>{commentsCount}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bodyText: {
    //
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  actionBtn: {
    backgroundColor: tintColorLight,
    flex: 1,
    paddingVertical: 8,
    borderRadius: 400,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    justifyContent: "center",
  },
  statsText: {
    fontSize: 16,
    color: primaryBlue,
  },
});
