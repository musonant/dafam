import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { View } from "@/components/Themed";
import { fonts } from "@/constants/typography";
import { ScrollView, StyleSheet } from "react-native";

export default function CreatePost() {
  return (
    <ScrollView bounces={false} style={styles.container}>
      <TextInput
        numberOfLines={6}
        multiline
        style={styles.textArea}
        placeholder="Express yourself"
      />

      <Button title="POST" />
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
