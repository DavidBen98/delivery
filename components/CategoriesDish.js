import { View, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getDishesForCategory } from "../api";
import tw from 'twrnc';
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import DishCard from './DishCard';


const CategoriesDish = ({id, title}) => {
  const [dishes, setDishes] = useState([]);

  const getPlatesForCategory = async () => {
    try {
      const dishes = await getDishesForCategory(id);
      setDishes(dishes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    getPlatesForCategory();
  },[]);

  return (
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
          {dishes?.map((dish) => (
            <DishCard 
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              description={dish.short_description}
              restaurant_id={dish.restaurant_id}
            />
          ))}
      </ScrollView>
    </View>
  )
}

export default CategoriesDish