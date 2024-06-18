import {
  ActivityIndicator,
  ButtonProps,
  TouchableOpacityProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "./Themed";
import { primaryBlue, primaryColor } from "@/constants/Colors";

type Props = TouchableOpacityProps & {
  color?: "blue" | "primary" | "blueOutline";
  title: string;
  loading?: boolean;
};

export default function Button({
  title,
  color = "primary",
  loading,
  ...buttonProps
}: Props) {
  const buttonStyles = {
    blue: {
      backgroundColor: primaryBlue,
    },
    primary: {
      backgroundColor: primaryColor,
    },
    blueOutline: {
      borderWidth: 2,
      borderColor: primaryBlue,
    },
  };
  const textStyles = {
    blue: {
      color: "#fff",
    },
    primary: {
      color: "#fff",
    },
    blueOutline: {
      color: primaryBlue,
    },
  };
  const buttonVariantStyles = buttonStyles[color] || {};
  const textVariantStyles = textStyles[color] || {};

  return (
    <TouchableOpacity
      {...buttonProps}
      style={[styles.common, buttonVariantStyles]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.text, textVariantStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  common: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
