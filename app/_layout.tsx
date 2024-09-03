import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/auth";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
console.log(publishableKey);

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "IBM-Bold": require("../assets/fonts/IBMPlexSansKR-Bold.ttf"),
    "IBM-SemiBold": require("../assets/fonts/IBMPlexSansKR-SemiBold.ttf"),
    "IBM-Medium": require("../assets/fonts/IBMPlexSansKR-Medium.ttf"),
    "IBM-Regular": require("../assets/fonts/IBMPlexSansKR-Regular.ttf"),
    "IBM-Light": require("../assets/fonts/IBMPlexSansKR-Light.ttf"),
    "IBM-ExtraLight": require("../assets/fonts/IBMPlexSansKR-ExtraLight.ttf"),
    "IBM-THin": require("../assets/fonts/IBMPlexSansKR-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
