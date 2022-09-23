import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { getRestaurantsForCategory } from "../api";
import tw from 'twrnc';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const FeaturedRow = ({id, title}) => {
  const [restaurants, setRestaurants] = useState([]);
  const { data } = useSelector(selectUser);

  const getLocaleForCategory = async () => {
    try {
      const restaurants = await getRestaurantsForCategory(id,data.id);

      setRestaurants(restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    getLocaleForCategory();
  },[]);

  return (
    restaurants.length === 0 ? (<></>) : (
      <View>
      <View style={tw `mt-4 flex-row items-center justify-between px-4`}>
        <Text style={tw `font-bold text-lg`}>{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={tw `pt-4`}
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          // dishes={restaurant.dishes}
          // genre={restaurant.type?.name}
          phone={restaurant.phone}
          address={restaurant.address}
          // rating={restaurant.rating}
          // short_description={restaurant.short_description}
          long={restaurant.longitude}
          lat={restaurant.latitude}
          />
        ))}
      </ScrollView>
    </View>
    )
  )
}

export default FeaturedRow