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
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "@/constants/typography";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const signinSchema = Yup.object().shape({
    email: yupSchemas.email,
    password: yupSchemas.password,
    // firstName: yupSchemas.name,
    // lastName: yupSchemas.name,
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  async function performSignup(values) {
    setIsLoading(true);
    try {
      const result = await createUser(values);
      await AsyncStorage.setItem("userData", JSON.stringify(result));
      router.replace("/(tabs)/home");
    } catch (err) {}
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: signinSchema,
    onSubmit: ({ email, password }) => performSignup({ email, password }),
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

        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subTitle}>
          Please enter the details below to get started
        </Text>

        <View>
          {/* <TextInput
            placeholder="First name"
            containerStyle={styles.input}
            {...inputProps.firstName}
            error={touched.firstName ? errors.firstName : ""}
          />
          <TextInput
            placeholder="Last name"
            containerStyle={styles.input}
            {...inputProps.lastName}
            error={touched.lastName ? errors.lastName : ""}
          /> */}
          <TextInput
            placeholder="Email"
            containerStyle={styles.input}
            {...inputProps.email}
            error={touched.email ? errors.email : ""}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            containerStyle={styles.input}
            {...inputProps.password}
            error={touched.password ? errors.password : ""}
            secureTextEntry
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
});
