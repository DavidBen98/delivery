import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LocationMarkerIcon, MenuIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';

import { selectUser, setData, setUbication } from '../features/userSlice';
import { getDataUser, getLocationsForId } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const LocationsScreen = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(selectUser);
    const [ubications, setUbications] = useState ([]);
    const navigation = useNavigation();

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

        setUbications(locations);
      } catch (error) {
        console.log(error); 
      }
    }
    
    return (
      <>
        <View style={{ height: '100%', width: '100%' }}>
            <View>
                <MenuIcon size={25} style={tw `m-3`} />
                <Text style={tw `mb-[10px] pl-4 text-xl font-semibold`}>Input your direction</Text>
                <View style={tw `w-full relative flex`}>
                  <TextInput 
                    placeholder="Direction or point of reference" 
                    keyboardType="default"
                    style={tw `w-11/12 pl-10 py-3 m-3 border border-gray-300 border-solid bg-white rounded-xl`}
                  />
                  <LocationMarkerIcon size={20} color="#00CCBB" style={tw `absolute left-6 top-6`} />
                </View>
                <TouchableOpacity style={tw `text-xs w-full flex wrap m-1 p-1 pl-5 flex-row border-b border-gray-300 border-solid`}>
                    <View style={tw `flex justify-center`}>
                      <Image
                        source={require(`../assets/painpoint.png`)}
                        style={tw `h-[17px] w-[17px]`}
                      />
                    </View>
                    <View style={tw `text-xs flex wrap w-10/12 pt-1`}>
                      <Text style={tw `p-2 mb-1 pl-4 font-medium`}>My ubication actually</Text>
                    </View>
                </TouchableOpacity>
                {ubications?.map((ubication)=>(
                  <>
                      <TouchableOpacity 
                        key={ubication.id} 
                        style={tw `text-xs w-full flex wrap m-1 p-1 pl-4 flex-row border-b border-gray-300 border-solid`}
                        onPress={() => {
                          dispatch(setUbication({ubication: ubication}));
                          navigation.navigate('Home');
                        }}
                      >
                          <View style={tw `flex justify-center pb-1`}>
                            <LocationMarkerIcon size={20} color="#00CCBB" />
                          </View>
                          <View style={tw `text-xs flex wrap w-10/12 pt-1`}>
                              <Text style={tw `p-2 mb-1 pl-4`}>{ubication.address}</Text>
                          </View>
                      </TouchableOpacity>
                  </>
                ))}
            </View>
        </View>
      </>
    )
}

export default LocationsScreen