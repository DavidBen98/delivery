import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline"
import { ScrollView } from 'react-native';
import CategoriesDish from '../components/CategoriesDish';
import FeaturedRow from '../components/FeaturedRow';
import { getRestaurants, getCategoriesDish, getCategoriesRestaurants } from "../api";
import tw from 'twrnc';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categoriesRestaurants, setCategoriesRestaurants] = useState([]);
  const [categoriesDishes, setCategoriesDishes] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  },[]);

  const getCategoriesLocale = async () => {
    try {
      const categoriesRestaurants = await getCategoriesRestaurants();
      setCategoriesRestaurants(categoriesRestaurants);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoriesPlate = async () => {
    try {
      const categoriesDishes = await getCategoriesDish();
      setCategoriesDishes(categoriesDishes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesLocale();
    getCategoriesPlate();
  }, []); 

  return (
    <>
      <SafeAreaView style={tw `bg-white pt-5`}>
            <View style={tw `flex-row pb-3 items-center mx-4 space-x-2`}>
              <Image 
                source={{
                  uri:'https://links.papareact.com/wru'
                }}
                style={tw `h-7 w-7 bg-gray-300 p-4 rounded-full`}
              />

              <View style={tw `flex-1`}>
                <Text style={tw `font-bold text-gray-400 text-xs`}>
                  Deliver Now!
                </Text>
                <Text style={tw `font-bold text-xl`}>
                  Current Location
                  <ChevronDownIcon size={20} color="#00CCBB" />
                </Text>
              </View>

              <UserIcon size={35} color="#00CCBB" />
            </View>

            <View style={tw `flex-row items-center space-x-2 pb-2 mx-4`}>
              <View style={tw `flex-row flex-1 space-x-2 bg-gray-200 p-3`}>
                <SearchIcon color="gray" size={20}/>
                <TextInput 
                  placeholder="Restaurants and cuisines" 
                  keyboardType="default"
                  />
              </View>

              <AdjustmentsIcon color='#00CCBB'/>
            </View>

      </SafeAreaView>
      
      <ScrollView 
        style={tw `bg-gray `}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {categoriesRestaurants?.map((category) => (
            <FeaturedRow
              key={category.id}
              id={category.id}
              title={category.name}
            />
        ))}

        {categoriesDishes?.map((category) => (
            <CategoriesDish
              key={category.id}
              id={category.id}
              title={category.name}
              screen= "Home"
              plates=""
            />
        ))}
      </ScrollView>
    </>
  );
}

export default HomeScreen