import { View, Text, Image } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/app/constans";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  handlePress,
  containerStyle,
  icon,
  initialLocation,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  return (
    <View
      className={`mb-5 flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        debounce={200}
        onPress={(data, details = null) =>
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          })
        }
        query={{ key: googlePlacesApiKey, language: "ko" }}
        renderLeftButton={() => (
          <View className=" justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "어디로 가시길 원하시나요?",
        }}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: 600,
            marginTop: 5,
            width: "100%",
            borderRadius: 20,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            borderRadius: 10,
            width: "100%",
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
