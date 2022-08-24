import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, ChevronRightIcon, LocationMarkerIcon, StarIcon } from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant, selectRestaurant} from '../features/restaurantSlice';
import { selectBasketItems, removeAllFromBasket } from '../features/basketSlice';
import AwesomeAlert from 'react-native-awesome-alerts';
import tw from 'twrnc';
import { getCategoriesForRestaurant } from "../api";


const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const items = useSelector(selectBasketItems);
    const [showAlert, setShowAlert] = useState (false);
    const [categories, setCategories] = useState([]);

    const {
        params: {
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
        }
    } = useRoute();
    
    useEffect(() => {
        dispatch(setRestaurant({
            id,
            // imgUrl,
            title,
            // rating,
            // genre,
            address,
            // short_description,
            // dishes,
            phone,
            long,
            lat,
        }));
    }, [dispatch]);

    useEffect(() => {
        getCategoriesForLocale(id);
    },[]);

    const getCategoriesForLocale = async (idRestaurant) => {
        try {
            const categories = await getCategoriesForRestaurant(idRestaurant);
            setCategories (categories.category);
        } catch (error) {
            console.log(error); 
        }
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, []);

    const goBackAlert = () => {
        if (items.length > 0) {
            setShowAlert (true);
        } else {
            navigation.goBack();
        }
    }
    
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
                onDismiss = {() => setShowAlert(false)}
                titleStyle={
                    {
                        fontSize: 24
                    }
                }
                messageStyle= {{fontSize: 14}}
                actionContainerStyle= {{ flexWrap: 'wrap'}}
                cancelButtonTextStyle= {{ fontSize: 18 }}
                confirmButtonTextStyle= {{ fontSize: 18 }}
            />

            <BasketIcon />

            <ScrollView>
                <View style={tw `relative`}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Image', { id });
                        }}
                    >
                        <Image 
                            source={require(`../server/dbimages/restaurants/${id}.png`)}
                            style={{resizeMode: "stretch", width: "100%", height: "224px", backgroundColor: "rgb(209 213 219)", padding: "1rem"}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={goBackAlert}
                        style={tw `absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}
                    >
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                
                <View style={tw `bg-white`}>
                    <View style={tw `px-4 pt-4`}>
                        <Text style={tw `text-3xl font-bold`}>
                            {title}
                        </Text>
                        <View style={tw `flex-row space-x-2 my-1`}>
                            {/* <View style={tw `flex-row items-center space-x-2">
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text style={tw `text-xs text-gray-500">
                                    <Text style={tw `text-green-500">
                                        {rating + " "} 
                                    </Text> 
                                    - {genre}
                                </Text>
                            </View> */}

                            <View style={tw `flex-row items-center space-x-2`}>
                                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                                <Text style={tw `text-xs text-gray-500`}>
                                    {address}
                                </Text>
                            </View>
                        </View>

                        {/* <Text style={tw `mt-1 pb-4">{short_description}</Text> */}
                    </View>

                    <TouchableOpacity style={tw `flex-row items-center space-x-2 p-4 border-y border-gray-300`}>
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
                        <Text style={tw `pl-2 flex-1 text-md font-bold`}>
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View style={tw `pb-36`}>
                    <Text style={tw `px-4 pt-6 mb-3 font-bold text-xl`}>
                        Menu
                    </Text>

                    {/* {dishes.map((dish) => (
                        <DishRow 
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))} */}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen