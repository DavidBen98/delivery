import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, LocationMarkerIcon, StarIcon } from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant, selectRestaurant} from '../features/restaurantSlice';
import { selectBasketItems, removeAllFromBasket } from '../features/basketSlice';
import AwesomeAlert from 'react-native-awesome-alerts';

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const items = useSelector(selectBasketItems);
    const [showAlert, setShowAlert] = useState (false);

    const {
        params: {
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
        }
    } = useRoute();
    
    useEffect(() => {
        dispatch(setRestaurant({
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
        }));
    }, [dispatch]);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, []);

    const goBackAlert = () => {
        const length = items.length;

        if (length > 0) {
            setShowAlert (true);


            // Alert.alert(
            //     "¿Go back?",
            //     "You will lose the products you added to your order.",
            //     [
            //         {
            //             text: "No, continue order",
            //             // onPress: () => {},
            //             style: "cancel"
            //         },
            //         { text: "Yes, go back", 
            //             onPress: () => {
            //                 dispatch(setRestaurant({}));
            //                 dispatch(removeAllFromBasket());
            //                 navigation.goBack();
            //             } 
            //         }
            //     ]
            // )
        } else {
            navigation.goBack();
        }
    };
    
    return (
        <>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="¿Go back?"
                message="You will lose the products you added to your order."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, continue order"
                confirmText="Yes, go back"
                confirmButtonColor="#00CCBB"
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    setShowAlert(false);
                    dispatch(setRestaurant({}));
                    dispatch(removeAllFromBasket());
                    navigation.goBack();
                }}
            />

            <BasketIcon />

            <ScrollView>
                <View className="relative">
                    <Image 
                        source={{
                            uri: urlFor(imgUrl).url(),
                        }}
                        className="w-full h-56 bg-gray-300 p-4"
                    />
                    <TouchableOpacity 
                        onPress={() => {
                            goBackAlert();
                        }}
                        className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
                        >
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">
                            {title}
                        </Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-2">
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-green-500">
                                        {rating + " "} 
                                    </Text> 
                                    - {genre}
                                </Text>
                            </View>

                            <View className="flex-row items-center space-x-2">
                                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                                <Text className="text-xs text-gray-500">
                                    {address}
                                </Text>
                            </View>
                        </View>

                        <Text className="mt-1 pb-4">{short_description}</Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
                        <Text className="pl-2 flex-1 text-md font-bold">
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="pb-36">
                    <Text className="px-4 pt-6 mb-3 font-bold text-xl">
                        Menu
                    </Text>

                    {dishes.map((dish) => (
                        <DishRow 
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen