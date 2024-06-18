import { primaryBlue, primaryColor } from "@/constants/Colors";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import { Text } from "./Themed";
import { fonts } from "@/constants/typography";

type Props =
  | TextInputProps & {
      variant?: "default" | "search";
      error?: string;
      containerStyle?: {};
    };

export default function TextInput({
  style,
  error,
  variant = "default",
  containerStyle = {},
  ...inputProps
}: Props) {
  if (variant === "search") {
    return (
      <View>
        <RNTextInput />
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <RNTextInput
        {...inputProps}
        style={[styles.input, style]}
        placeholderTextColor="#A7A3B3"
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    minHeight: 54,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "#ECF0F1",
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 50,
    borderRadius: 4,
    color: primaryBlue,
    borderColor: primaryBlue,
    borderWidth: StyleSheet.hairlineWidth,
    fontFamily: fonts.primaryMedium,
  },
  label: {},
  error: {
    color: "#ed4337",
  },
});
