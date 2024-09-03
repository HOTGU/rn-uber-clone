import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
