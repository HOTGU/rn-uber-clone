import { View, Text, ScrollView, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "../constans";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Oauth from "@/components/Oauth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-full" />
          <Text className="text-2xl text-black font-IbmSemiBold absolute bottom-5 left-5">
            환영합니다👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="이메일"
            placeholder="이메일을 입력하세요"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title={"로그인"}
            onPress={onSignInPress}
            className="mt-6"
          />

          <Oauth />

          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>회원이 아니신가요? </Text>
            <Text className=" text-primary-500">회원가입</Text>
          </Link>
        </View>
        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
