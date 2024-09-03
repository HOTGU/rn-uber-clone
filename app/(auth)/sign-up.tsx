import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constans";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Oauth from "@/components/Oauth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("에러", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "pending",
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-full" />
          <Text className="text-2xl text-black font-IbmSemiBold absolute bottom-5 left-5">
            회원가입
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="이름"
            placeholder="이름을 입력하세요"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title={"회원가입"}
            onPress={onSignUpPress}
            className="mt-6"
          />

          <Oauth />

          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>이미 회원이신가요? </Text>
            <Text className=" text-primary-500">로그인</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-IbmBold mb-2">인증</Text>
            <Text className="font-Ibm mb-5">
              이메일로 인증코드를 전송했습니다
            </Text>
            <InputField
              label="코드"
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 mt-1 text-sm">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="이메일 인증"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-IbmSemiBold text-center">
              인증성공
            </Text>

            <Text className="text-base text-gray-400 font-Ibm text-center mt-2">
              계정 인증에 성공했습니다
            </Text>

            <CustomButton
              title="홈으로 가기"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(tabs)/home");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
