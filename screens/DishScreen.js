import { View, Text } from 'react-native'
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const DishScreen = () => {
    const navigation = useNavigation();

    const {
        params: {
            id, 
            name, 
            price, 
            description
        }
    } = useRoute();

    console.log( id, 
        name, 
        price, 
        description);
  return (
    <View>
      <Text>DishScreen</Text>
    </View>
  )
}

export default DishScreen