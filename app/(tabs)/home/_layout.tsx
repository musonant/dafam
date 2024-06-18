import { Stack } from "expo-router";

export default function () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen
        name="create-post"
        options={{
          headerTitle: "Create Post",
        }}
      />
    </Stack>
  );
}
