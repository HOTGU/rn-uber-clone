import { Slot, Stack } from "expo-router";

const RootRayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      {/* <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
      <Stack.Screen name="book-ride" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default RootRayout;
