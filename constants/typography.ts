import { TextStyle } from "react-native";

export const fonts = {
  primaryLight: "Outfit-Light",
  primaryRegular: "Outfit-Regular",
  primaryMedium: "Outfit-Medium",
  primaryBold: "Outfit-Bold",
};

export const typography: Record<string, TextStyle> = {
  titleLg: {
    fontSize: 28,
    fontFamily: fonts.primaryMedium,
    marginBottom: 15,
    color: "#000000",
  },
  body: {
    fontSize: 16,
    color: "#333333",
    fontFamily: fonts.primaryRegular,
  },
  bold: {
    fontFamily: fonts.primaryMedium,
    fontWeight: "600",
  },
  sectionHeading1: {
    color: "#666666",
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 6,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
};
