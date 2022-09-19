import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store';

import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import RestaurantScreen from './screens/RestaurantScreen';
// import DeliveryScreen from './screens/DeliveryScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import ImageScreen from './screens/ImageScreen';
import OpinionsScreen from './screens/OpinionsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LocationsScreen from './screens/LocationsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', headerShown:false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal', headerShown:false }}/>
            <Stack.Screen name="Locations" component={LocationsScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
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
            <Stack.Screen name="Opinions" component={OpinionsScreen} 
            options={{ presentation: 'modal', headerShown:false }}/>
          </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}