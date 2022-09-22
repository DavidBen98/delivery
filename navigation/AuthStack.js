import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', headerShown:false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal', headerShown:false }}/>
    </Stack.Navigator>
  )
}

export default AuthStack