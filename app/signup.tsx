import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import spacing from "@/constants/spacing";
import Button from "@/components/Button";
import { Text } from "@/components/Themed";
import TextInput from "@/components/TextInput";
import { yupSchemas } from "@/utils/validation";
import { getInputPropsFromFormik } from "@/utils/common";
import { createUser } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "@/constants/typography";
import { errorColor } from "@/constants/Colors";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signinSchema = Yup.object().shape({
    email: yupSchemas.email,
    password: yupSchemas.password,
    displayName: yupSchemas.name,
  });

  const initialValues = {
    displayName: "",
    email: "",
    password: "",
  };

  async function performSignup(values) {
    setIsLoading(true);
    try {
      const result = await createUser(values);
      await AsyncStorage.setItem("userData", JSON.stringify(result));
      router.replace("/(tabs)/home");
    } catch (err) {
      setIsLoading(false);
      console.log("err", err);
      if (err?.code === "auth/invalid-credential") {
        setError("Invalid credentials");
        return;
      }
      if (err?.code === "auth/email-already-in-use") {
        setError("This email already has an account. Please login instead");
        return;
      }
      setError("Unable to sign up. Please try again");
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: signinSchema,
    onSubmit: ({ email, password }) => performSignup({ email, password }),
  });

  const { handleSubmit, errors, touched, values } = formik;
  const inputProps = getInputPropsFromFormik(formik);

  useEffect(() => {
    setError("");
  }, [values.email, values.password]);

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subTitle}>
          Please enter the details below to get started
        </Text>
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

        <View>
          <TextInput
            placeholder="Username"
            containerStyle={styles.input}
            {...inputProps.displayName}
            error={touched.displayName ? errors.displayName : ""}
          />
          <TextInput
            placeholder="Email"
            containerStyle={styles.input}
            {...inputProps.email}
            error={touched.email ? errors.email : ""}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            containerStyle={styles.input}
            {...inputProps.password}
            error={touched.password ? errors.password : ""}
          />
        </View>

        <SafeAreaView style={styles.buttonContainer}>
          <Button
            loading={isLoading}
            color="blue"
            title="Signup"
            onPress={handleSubmit}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#fff",
  },
  container: {
    // flex: 1,
    paddingHorizontal: spacing.appSpacing,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: fonts.primaryMedium,
  },
  subTitle: {
    color: "#757281",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 40,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  input: {
    marginBottom: 4,
  },
  errorMessage: {
    color: errorColor,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
});
