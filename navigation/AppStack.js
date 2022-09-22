import React from 'react'
import BasketScreen from '../screens/BasketScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
// import DeliveryScreen from './screens/DeliveryScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import ImageScreen from '../screens/ImageScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', headerShown:false }}/>
        <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="Basket" component={BasketScreen} 
        options={{ presentation: 'modal', headerShown:false }}/>
        <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} 
        options={{ presentation: 'fullScreenModal', headerShown:false }}/>
        {/* <Stack.Screen 
        name="Delivery" 
        component={DeliveryScreen} 
        options={{ presentation: 'fullScreenModal', headerShown:false }}
        /> */}
        <Stack.Screen name="Image" component={ImageScreen} 
        options={{ presentation: 'modal', headerShown:false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal', headerShown:false }}/>
    </Stack.Navigator>
  )
}

export default AppStack