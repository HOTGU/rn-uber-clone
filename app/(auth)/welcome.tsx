import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "../constans";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const onBoarding = () => {};

  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className=" w-full justify-start items-end p-5"
      >
        <Text className="text-black text-base font-IbmBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View className="flex items-center justify-center p-5" key={item.id}>
            <Image
              source={item.image}
              className="w-full h-[300px] "
              resizeMode="contain"
            />
            <View className="flex items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold text-center">
                {item.title}
              </Text>
              <Text className="text-lg text-center font-IbmSemiBold text-[#858585] mx-6 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "시작하기" : "다음"}
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1);
        }}
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default Welcome;
