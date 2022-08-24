import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { getRestaurants, getCategoriesDish, getRestaurantsForCategory } from "../api";
import tw from 'twrnc';


const RestaurantCard = ({
    id,
    // imgUrl,
    title,
    // rating,
    // genre,
    address,
    // short_description,
    // dishes,
    long,
    lat,
    phone
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Restaurant', { id,address, title, phone, long, lat });
        // navigation.navigate('Restaurant', { id, imgUrl, address, short_description, title, rating, genre, dishes, long, lat });
      }}
      style={tw `bg-white mr-3 shadow`}
    >
      <Image
        source={require(`../server/dbimages/restaurants/${id}.png`)}
        style={tw `h-46 w-64 rounded-sm object-fill`}
      />

      <View style={tw `px-3 pb-4`}>
        <Text style={tw `font-bold text-lg pt-2`}>{title}</Text>
        <View style={tw `flex-row items-center space-x-1 mt-2`}>
            <StarIcon color="green" opacity={0.5} size={22} />
            {/* <Text style={tw `text-xs text-gray-500`}>
                <Text style={tw `text-green-500`}>
                  {rating + " "}
                </Text> 
            </Text> */}
        </View>

        <View style={tw `flex-row items-center space-x-1 mt-1`}>
            <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
            <Text style={tw `text-xs text-gray-500`}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard