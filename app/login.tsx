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
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import spacing from "@/constants/spacing";
import Button from "@/components/Button";
import { Text } from "@/components/Themed";
import TextInput from "@/components/TextInput";
import { yupSchemas } from "@/utils/validation";
import { getInputPropsFromFormik } from "@/utils/common";
import { login } from "@/firebaseConfig";
import { fonts } from "@/constants/typography";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
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
      await AsyncStorage.setItem("userData", JSON.stringify(result));
      router.replace("/(tabs)/home");
    } catch (err) {}
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => performLogin({ email, password }),
  });

  const { handleSubmit, errors, touched } = formik;
  const inputProps = getInputPropsFromFormik(formik);

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
            color="blue"
            title="Login"
            onPress={() => handleSubmit()}
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
  buttonContainer: {
    paddingVertical: 20,
  },
  input: {
    marginBottom: 4,
  },
});
