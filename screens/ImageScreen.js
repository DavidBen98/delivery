import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/core'

const ImageScreen = () => {
    const navigation = useNavigation();

    const {
        params: {
            id,
        }
    } = useRoute();

  return (
    <View style={{ height: '100%', width: '100%' }}>
        <Image 
            source={require(`../server/dbimages/restaurants/${id}.png`)}
            style={{resizeMode: "contain", width: "100%", height: "100%", backgroundColor: "#000"}}
        />
        <TouchableOpacity 
            onPress={navigation.goBack}
            style={tw `absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}
        >
            <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
    </View>
  )
}

export default ImageScreen