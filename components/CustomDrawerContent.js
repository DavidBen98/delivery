import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ArrowCircleRightIcon ,UserIcon, HomeIcon, StarIcon, TicketIcon , LocationMarkerIcon, ShoppingBagIcon} from "react-native-heroicons/outline";

const CustomDrawerContent = () => {
  const dispatch = useDispatch();
  const setLogout = useSelector(logout);
  const navigation = useNavigation();

  const logoutUser = async() => {
    dispatch(setLogout);
    await AsyncStorage.removeItem('token');
    navigation.navigate("Login");
  }

  return (           
        <SafeAreaView style={{flex: 1, position: 'relative'}}>

        <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
            style={item}
            onPress={() => navigation.navigate('Home')}
          >
            <HomeIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={item}
            onPress={() => navigation.navigate('Directions')}
          >
            <LocationMarkerIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>My Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={item}
            onPress={() => navigation.navigate('Shopping')}
          >
            <ShoppingBagIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>My Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={item}
            onPress={() => navigation.navigate('Favourites')}
          >
            <StarIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>My Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={item}
            onPress={() => navigation.navigate('Coupons')}
          >
            <TicketIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>My Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={item}
            onPress={() => navigation.navigate('Settings')}
          >
            <UserIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>Settings</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView style={{marginLeft: 5, position: 'absolute', bottom: 2}}>
          <TouchableOpacity
            style={item}
            onPress={logoutUser}
          >
            <ArrowCircleRightIcon size={20} color="#00CCBB"/>
            <Text style={{paddingLeft: 10}}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  )
}

const item = {
  margin: 10,
  marginLeft: 5,
  padding: 5,
  display: 'flex',
  flexDirection: 'row'
}

export default CustomDrawerContent