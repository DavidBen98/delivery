import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { getOpinionsForRestaurant } from "../api";
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
  const [opinionsRestaurant, setOpinionsRestaurant] = useState([]);
  const [averageOpinions, setAverageOpinions] = useState([]);

  useEffect(() => {
    getOpinionsLocale();
  }, []);
  
  const getOpinionsLocale = async () => {
    try {
      const opinionsLocale = await getOpinionsForRestaurant(id);
      setOpinionsRestaurant(opinionsLocale);
      setAverageOpinions(getAverage(opinionsLocale));
    } catch (error) {
      console.log(error);
    }
  };

  const getAverage = (opinions) => {
    let average = 0;
    opinions.forEach((opinion) => {
      average += opinion.stars;
    });
    average = (average / opinions.length).toFixed(1);
    return average;
  }

  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Restaurant', { id,address, title, phone, long, lat, opinions: opinionsRestaurant, averageOpinions });
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
            <Text style={tw `text-xs text-gray-500`}>
                <Text style={tw `text-green-500 font-bold text-base p-1`}>
                  {opinionsRestaurant.length? averageOpinions + " " : "5.0"}
                </Text> 
            </Text>
        </View>

        <View style={tw `flex-row items-center space-x-1 mt-1`}>
            <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
            <Text style={tw `text-xs text-gray-500 p-1`}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard