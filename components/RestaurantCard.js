import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import sanityClient, {urlFor} from "../sanity";

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Restaurant', { id, imgUrl, address, short_description, title, rating, genre, dishes, long, lat });
      }}
      className="bg-white mr-3 shadow"
    >
      <Image 
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1 mt-2">
            <StarIcon color="green" opacity={0.5} size={22} />
            <Text className="text-xs text-gray-500">
                <Text className="text-green-500">
                  {rating + " "}
                </Text> 
                - {genre}
            </Text>
        </View>

        <View className="flex-row items-center space-x-1 mt-1">
            <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
            <Text className="text-xs text-gray-500">{address}</Text>
        </View>

        <View className="flex-row items-center space-x-1 mt-1">
          <Text className="text-xs text-gray-500 pl-1">{short_description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard