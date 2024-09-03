import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/app/constans";

const Oauth = () => {
  const handleGoogleSignin = () => {};

  return (
    <View>
      <View className="flex-row justify-center items-center mt-5 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">또는</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="구글로그인"
        className="mt-5 w-full shandow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mr-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignin}
      />
    </View>
  );
};

export default Oauth;
