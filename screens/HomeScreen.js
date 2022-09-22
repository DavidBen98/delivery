import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
  BellIcon
  
} from "react-native-heroicons/outline"
import { ScrollView } from 'react-native';
import CategoriesDish from '../components/CategoriesDish';
import FeaturedRow from '../components/FeaturedRow';
import { getCategoriesDish, getCategoriesRestaurants } from "../api";
import tw from 'twrnc';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomDrawer from '../components/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categoriesRestaurants, setCategoriesRestaurants] = useState([]);
  const [categoriesDishes, setCategoriesDishes] = useState([]);
  const { data } = useSelector(selectUser);

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
      <SafeAreaView style={tw `bg-white pt-5 pb-2`}>
        <View style={tw `flex-row items-center justify-between px-4 space-x-2 w-full`}>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image 
              source={require(`../server/dbimages/users/1.png`)}
              style={tw `h-7 w-7 bg-gray-300 p-4 rounded-full`}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Locations')}>
            <Text style={tw `font-bold flex`}>
              <Text style={tw `mx-2`}>
                {data?.ubication?.ubication?.address}
              </Text>
                <ChevronDownIcon size={20} color="#00CCBB"/>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Locations')}>
            <BellIcon size={30} color="#00CCBB" />
          </TouchableOpacity>

        </View>
      </SafeAreaView>
      
      <ScrollView 
        style={tw `bg-gray`}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View style={tw `flex-row items-center space-x-2 py-2 mx-4`}>
          <View style={tw `flex-row flex-1 space-x-2 bg-white p-3 rounded-xl`}>
            <SearchIcon color="gray" size={20}/>
            <TextInput 
              placeholder="Restaurants and cuisines" 
              keyboardType="default"
              style={tw `pl-2`}
              />
          </View>

          <AdjustmentsIcon color='#00CCBB' style={tw `ml-1`}/>
        </View>
        
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

      <Drawer.Navigator 
        useLegacyImplementation 
        drawerContent={props => 
          <CustomDrawer {...props} 
            screenOptions={{
              headerShown: false,
              drawerActiveBackgroundColor: '#00CCBB',
              drawerActiveTintColor: '#fff',
              drawerInactiveTintColor: '#333',
              drawerLabelTintColor: '#fff',
              drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
              }
          }}
        />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown:false }}/>
      </Drawer.Navigator>
    </>
  );
}

export default HomeScreen