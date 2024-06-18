import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import spacing from "@/constants/spacing";
import Button from "@/components/Button";
import { Text } from "@/components/Themed";
import TextInput from "@/components/TextInput";
import { yupSchemas } from "@/utils/validation";
import { getInputPropsFromFormik } from "@/utils/common";
import { login } from "@/firebaseConfig";
import { fonts } from "@/constants/typography";
import { errorColor } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { createSession } from "@/store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const loginSchema = Yup.object().shape({
    email: yupSchemas.email,
    password: yupSchemas.password,
  });

  const initialValues = {
    email: "",
    password: "",
  };

  async function performLogin(values) {
    setIsLoading(true);
    try {
      const result = await login(values);
      dispatch(createSession(result));
      router.replace("/(tabs)/home");
    } catch (err) {
      if (err?.code === "auth/invalid-credential") {
        setError("Invalid credentials");
        return;
      }
      setError("Unable to login. Please try again");
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => performLogin({ email, password }),
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

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>
          Please enter your credentials below to login
        </Text>
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

        <View>
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
            title="Login"
            onPress={() => handleSubmit()}
          />
        </SafeAreaView>

        <Link href="/signup">
          <Text style={[styles.subTitle, styles.moreInfo]}>
            Don't have an account?{" "}
            <Text style={styles.highlightedText}>Sign up</Text>
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: spacing.appSpacing,
    fontFamily: fonts.primaryMedium,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
  },
  subTitle: {
    color: "#757281",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 40,
  },
  moreInfo: {
    textAlign: "center",
  },
  highlightedText: {
    fontFamily: fonts.primaryMedium,
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
