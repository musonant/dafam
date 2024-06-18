import { Image, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import logo from "@/assets/images/icon.png";
import Button from "@/components/Button";
import spacing from "@/constants/spacing";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Auth() {
  const user = useSelector((state: RootState) => state.auth.user);
  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null;

  useEffect(() => {
    if (user && navigatorReady) {
      router.replace("/home");
    }
  }, [user, navigatorReady]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.brandContainer}>
        <Image source={logo} style={styles.brand} />
      </View>

      <SafeAreaView style={styles.buttonContainer}>
        <View style={{ marginBottom: 10 }}>
          <Button
            onPress={() => router.push("/signup")}
            color="blue"
            title="Sign up"
          />
        </View>
        <Button
          onPress={() => router.push("/login")}
          color="blueOutline"
          title="Login"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  brandContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    height: 100,
    objectFit: "contain",
  },
  buttonContainer: {
    paddingVertical: 20,
    marginHorizontal: spacing.appSpacing,
  },
});
