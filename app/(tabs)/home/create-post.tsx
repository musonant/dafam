import { createPost } from "@/api/posts";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { View } from "@/components/Themed";
import { fonts } from "@/constants/typography";
import { RootState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [textValue, setTextValue] = useState("");

  const queryClient = useQueryClient();

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: createPost,
    onError: (err) => {
      console.log("Error", err);
      Toast.show({ text1: "Unable to post. Please try again", type: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.navigate("home");
    },
  });

  return (
    <ScrollView bounces={false} style={styles.container}>
      <TextInput
        numberOfLines={6}
        multiline
        style={styles.textArea}
        placeholder="Express yourself"
        onChangeText={(text) => setTextValue(text)}
      />

      <Button
        title="POST"
        loading={isPending}
        onPress={() =>
          submitPost({
            displayName: user?.displayName,
            content: textValue,
            photoURL:
              user?.photoURL ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  textArea: {
    marginTop: 20,
    height: 200,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 15,
    fontFamily: fonts.primaryRegular,
  },
});
