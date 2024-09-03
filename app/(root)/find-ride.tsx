import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "../constans";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-xl font-IbmBold mb-3">출발장소</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-xl font-IbmBold mb-3">도착장소</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
    </RideLayout>
  );
};

export default FindRide;
