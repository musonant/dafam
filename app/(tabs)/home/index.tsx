import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import PostTrigger from "@/components/PostTrigger";
import PostSnippet from "@/components/PostSnippet";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";
import { primaryColor } from "@/constants/Colors";
import { Text } from "@/components/Themed";

export default function TabOneScreen() {
  const {
    isPending,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const renderPost = ({ item }) => {
    return <PostSnippet postData={item} />;
  };

  return (
    <ScrollView style={styles.container}>
      <PostTrigger />

      {isPending ? (
        <ActivityIndicator style={styles.loader} color={primaryColor} />
      ) : null}

      {!posts?.length && !isPending ? (
        <Text style={styles.emptyState}>No post to show</Text>
      ) : null}
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
  loader: {
    marginTop: 10,
  },
  emptyState: {
    marginTop: 10,
    textAlign: "center",
  },
});
