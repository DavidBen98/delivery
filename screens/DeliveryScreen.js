import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { XIcon } from 'react-native-heroicons/solid';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
import * as Progress from "react-native-progress";
import { selectRestaurant } from '../features/restaurantSlice';
import { useSelector } from "react-redux"

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    return (
        <View className="bg-[#00CCBB] flex-1">
        <SafeAreaView className="z-50">
            <View className="flex-row justify-between items-center p-5">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <XIcon color="white" size={30} />
                </TouchableOpacity>
                <Text className="font-light text-white text-lg">Order Help</Text>
            </View>

            <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                        <Text className="text-4xl font-bold">45-55 Minutes</Text>
                    </View>
                    <Image 
                        source={{
                            uri: "https://links.papareact.com/fls",
                        }}
                        className="h-20 w-20"
                        />
                    </View>

                    <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

                    <Text className="mt-3 text-gray-500">
                        Your order at {restaurant.restaurant.title} is being prepared
                    </Text>
                </View>
        </SafeAreaView>
        
        <View>
            <MapView
                initialRegion={{
                    latitude: restaurant.restaurant.lat,
                    longitude: restaurant.restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                className="flex-1 mt-10 z-0 min-h-screen w-[500px] h-[500px]"
                mapType="mutedStandard"

            />
                <Marker 
                    coordinate={{
                        latitude: restaurant.restaurant.lat,
                        longitude: restaurant.restaurant.long,
                    }}
                    title={restaurant.restaurant.title}
                    description={restaurant.restaurant.short_description}
                    identifier="origin"
                    pinColor="#00CCBB"
                />
            </View>

        <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
            <Image 
                source={{
                    uri: "https://links.papareact.com/wru",
                }}
                className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
            />

            <View className="flex-1">
                <Text className="text-lg">
                    Sonny Sangha
                </Text>
                <Text className="text-gray-400">
                    Your rider
                </Text>
            </View>

            <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen