import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc';

import { selectUser, setData } from '../features/userSlice';
import { getDataUser } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const LocationsScreen = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(selectUser);

    useEffect(() => { 
      decodedToken();  
    }, []);
    
    const decodedToken = async() => {
      const token = await AsyncStorage.getItem('token');
      
      try {
        const userRow = await getDataUser(token);
       
        dispatch(setData({
          data: userRow
        }));

        
        
      } catch (error) {
        console.log(error); 
      }
    }
    
    return (
      <View style={tw `flex h-screen w-screen my-auto relative`}>
        <Text>LocationsScreen</Text>
      </View>
    )
}

export default LocationsScreen