import { Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';

import { selectUser, setData } from '../features/userSlice';
import { getDataUser, getLocationsForId } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const LocationsScreen = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(selectUser);
    const [ubications, setUbications] = useState ([]);

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

        getUbicationForId(userRow.id);

      } catch (error) {
        console.log(error); 
      }
    }

    const getUbicationForId = async(id) => {
      try {
        const locations = await getLocationsForId(id);

        console.log(locations);
        
        setUbications(locations);
      } catch (error) {
        console.log(error); 
      }
    }
    
    return (
      <View style={tw `flex h-screen w-screen my-auto relative`}>
        {ubications?.map((ubication) => (
          <Text key={ubication.id}>{ubication.address}</Text>
        ))}
      </View>
    )
}

export default LocationsScreen