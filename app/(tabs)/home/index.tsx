import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostTrigger from "@/components/PostTrigger";
import PostSnippet from "@/components/PostSnippet";

export default function TabOneScreen() {
  const posts = [
    {
      content: "Meeee",
      userIcon: "",
      author: "James Arthur",
      date: new Date().toISOString(),
      likesCount: 20,
      commentsCount: 10,
    },
    {
      content: "Meowwww",
      userIcon: "",
      author: "Bill Clinton",
      date: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 10,
    },
  ];

  const renderPost = ({ item }) => {
    return <PostSnippet postData={item} />;
  };

  return (
    <ScrollView style={styles.container}>
      <PostTrigger />

      <FlatList data={posts} renderItem={renderPost} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
