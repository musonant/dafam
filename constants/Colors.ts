export const primaryColor = "#1ABC9C";
export const primaryBlue = "#2C3E50";
const tintColorDark = "#fff";
const tintColorLight = primaryColor;
export const errorColor = "#E74C3C";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    primaryColor,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    primaryColor,
  },
};
