import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { XIcon } from 'react-native-heroicons/solid';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
import * as Progress from "react-native-progress";
import { selectRestaurant } from '../features/restaurantSlice';
import { useSelector } from "react-redux"
import { GOOGLE_MAPS_KEY } from '@env';
import tw from 'twrnc';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    return (
        <View style={tw `bg-[#00CCBB] flex-1`}>
            <SafeAreaView style={tw `z-50`}>
                <View style={tw `flex-row justify-between items-center p-5`}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <XIcon color="white" size={30} />
                    </TouchableOpacity>
                    <Text style={tw `font-light text-white text-lg`}>Order Help</Text>
                </View>

                <View style={tw `bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
                    <View style={tw `flex-row justify-between`}>
                        <View>
                            <Text style={tw `text-lg text-gray-400`}>Estimated Arrival</Text>
                            <Text style={tw `text-4xl font-bold`}>45-55 Minutes</Text>
                        </View>
                        <Image 
                            source={{
                                uri: "https://links.papareact.com/fls",
                            }}
                            style={tw `h-20 w-20`}
                        />
                    </View>

                    <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

                    <Text style={tw `mt-3 text-gray-500`}>
                        {/* Your order at {restaurant.restaurant.title} is being prepared */}
                        Tu orden en el restaurant
                    </Text>
                    </View>
            </SafeAreaView>
        
            <View style={{width:"200px", height:"200px"}}>
                <MapView
                    region={{
                        // latitude: restaurant.restaurant.lat,
                        // longitude: restaurant.restaurant.long,
                        latitude: 211,
                        longitude: 211,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04,
                    }}
                    style={tw `flex-1 mt-10 w-[400px] h-[400px]`}
                    mapType="standard"
                    provider={PROVIDER_GOOGLE}
                />

                {/* <Marker 
                    // draggable
                    // onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                    coordinate={{
                        // latitude: restaurant.restaurant.lat,
                        // longitude: restaurant.restaurant.long,
                        latitude: 211,
                        longitude: 211,
                    }}
                    // title={restaurant.restaurant.title}
                    title="hola"
                    // description={restaurant.restaurant.short_description}
                    description='chau'
                    identifier="origin"
                    pinColor="#00CCBB"
                /> */}

                {/* <Marker 
                    draggable
                    // image={miimagen}
                    // onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                    coordinate={{
                        // latitude: restaurant.restaurant.lat,
                        // longitude: restaurant.restaurant.long,
                        latitude: 300,
                        longitude: 300,
                    }}
                    // title={restaurant.restaurant.title}
                    title="hola"
                    // description={restaurant.restaurant.short_description}
                    description='chau'
                    identifier="origin"
                    pinColor="#00CCBB"
                /> */}
                {/* <MapViewDirections
                    origin={{
                        latitude: 211,
                        longitude: 211
                    }}
                    destination={{
                        latitude: 300,
                        longitude: 300
                    }}
                    apikey={GOOGLE_MAPS_KEY}
                /> */}
                {/* </MapView> */}
            </View>

            <SafeAreaView style={tw `bg-white flex-row items-center space-x-5 h-28`}>
                <Image 
                    source={{
                        uri: "https://links.papareact.com/wru",
                    }}
                    style={tw `h-12 w-12 bg-gray-300 p-4 rounded-full ml-5`}
                />

                <View style={tw `flex-1`}>
                    <Text style={tw `text-lg`}>
                        Sonny Sangha
                    </Text>
                    <Text style={tw `text-gray-400`}>
                        Your rider
                    </Text>
                </View>

                <Text style={tw `text-[#00CCBB] text-lg mr-5 font-bold`}>Call</Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen