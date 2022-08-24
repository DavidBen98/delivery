import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LocationMarkerIcon, StarIcon, HomeIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc';
import { getRestaurantForId } from "../api";

const DishCard = ({
    id,
    name,
    // rating,
    price,
    description,
    restaurant_id
}) => {

    const [restaurant, setRestaurant] = useState([]);

    const getLocaleForId = async () => {
        try {
            const restaurant = await getRestaurantForId(restaurant_id);
            setRestaurant(restaurant);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocaleForId();
    }, []);


    console.log(restaurant);
    const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Dish', { id, name, price, description});
        // navigation.navigate('Restaurant', { id, imgUrl, address, short_description, title, rating, genre, dishes, long, lat });
      }}
      style={tw `bg-white mr-3 shadow`}
    >
      <Image
        source={require(`../server/dbimages/dishes/${id}.png`)}
        style={tw `h-46 w-64 rounded-sm object-fill`}
      />

      <View style={tw `px-3 pb-4`}>
        <Text style={tw `font-bold text-lg pt-2`}>{name}</Text>
        <View style={tw `flex-row items-center space-x-1 mt-2`}>
            <StarIcon color="green" opacity={0.5} size={22} />
            {/* <Text style={tw `text-xs text-gray-500`}>
                <Text style={tw `text-green-500`}>
                  {rating + " "}
                </Text> 
            </Text> */}
        </View>
        <View style={tw `flex-row items-center space-x-1 mt-1`}>
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('Restaurant', { id: restaurant[0].id, title: restaurant[0].name, address: restaurant[0].address, long: restaurant[0].longitude, lat: restaurant[0].latitude, phone: restaurant[0].phone});
                }}
            >
                <HomeIcon color="gray" opacity={0.4} size={22} />
                <Text style={tw `text-xs text-gray-500`}>{restaurant[0]?.name}</Text>
            </TouchableOpacity>
        </View>

        <View style={tw `flex-row items-center space-x-1 mt-1`}>
            <Text style={tw `text-xs text-gray-500`}>$ {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DishCard