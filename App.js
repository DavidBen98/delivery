import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import ImageScreen from './screens/ImageScreen';
import OpinionsScreen from './screens/OpinionsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LocationsScreen from './screens/LocationsScreen';
import DirectionsScreen from './screens/DirectionsScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import CouponsScreen from './screens/CouponsScreen';
import SettingsScreen from './screens/SettingsScreen';
import DeliveryScreen from './screens/DeliveryScreen';

import CustomDrawerContent from './components/CustomDrawerContent';
import DishScreen from './screens/DishScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false
})

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator 
      useLegacyImplementation
      drawerContent={() =>             
        <CustomDrawerContent />
    }>
      <Drawer.Screen name="Home" component={HomeScreen} options={navOptionHandler}/>
      <Drawer.Screen name="Directions" component={DirectionsScreen} options={navOptionHandler}/>
      <Drawer.Screen name="Shopping" component={ShoppingScreen} options={navOptionHandler}/>
      <Drawer.Screen name="Favourite" component={FavouriteScreen} options={navOptionHandler}/>
      <Drawer.Screen name="Coupons" component={CouponsScreen} options={navOptionHandler}/>
      <Drawer.Screen name="Settings" component={SettingsScreen} options={navOptionHandler}/>
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          {/* <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ presentation: 'modal', headerShown:false }}/> */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', headerShown:false }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal', headerShown:false }}/>
          <Stack.Screen name="Locations" component={LocationsScreen} options={navOptionHandler}/>
          <Stack.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler}/>
          <Stack.Screen name="Restaurant" component={RestaurantScreen} options={navOptionHandler}/>
          <Stack.Screen name="Basket" component={BasketScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} 
          options={{ presentation: 'fullScreenModal', headerShown:false }}/>
          <Stack.Screen name="Image" component={ImageScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Stack.Screen name="Opinions" component={OpinionsScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Stack.Screen name="Dish" component={DishScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}