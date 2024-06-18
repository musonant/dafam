import { CustomToastOptions } from "index";
import { StyleSheet, View } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
// import { colors, spacing, typography } from "~/style/constants";
import { Text } from "./Themed";
import spacing from "@/constants/spacing";

export default function Toast(props: CustomToastOptions & ToastProps) {
  const { message, type = "danger", title = "" } = props;

  const colorOptions = {
    danger: { background: "#FFFAFA", text: colors.danger },
  };
  const { background, text } = colorOptions[type];

  return (
    <View
      style={[
        styles.container,
        { borderColor: text, backgroundColor: background },
      ]}
    >
      {title ? (
        <Text style={[styles.title, { color: text }]}>{title}</Text>
      ) : null}
      <Text style={[styles.message, { color: text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginLeft: spacing.appSpacing,
    marginRight: spacing.appSpacing,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderStyle: "solid",
  },
  title: {
    // ...typography.sectionHeading1,
    marginBottom: 5,
    marginTop: 0,
    letterSpacing: 0.4,
  },
  message: {
    // ...typography.body,
  },
});
