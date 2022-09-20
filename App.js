import { NavigationContainer } from '@react-navigation/native';
// import { createNativeDrawerNavigator } from '@react-navigation/native-Drawer';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import CustomDrawer from './components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Drawer.Navigator 
          useLegacyImplementation 
          drawerContent={props => 
            <CustomDrawer {...props} 
              screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#00CCBB',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelTintColor: '#fff',
                drawerLabelStyle: {
                  marginLeft: -25,
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                }
            }}
          />}
        >
          <Drawer.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', headerShown:false }}/>
          <Drawer.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal', headerShown:false }}/>
          <Drawer.Screen name="Locations" component={LocationsScreen} options={{ headerShown:false }}/>
          <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown:false }}/>
          <Drawer.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown:false }}/>
          <Drawer.Screen name="Basket" component={BasketScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Drawer.Screen name="PreparingOrder" component={PreparingOrderScreen} 
          options={{ presentation: 'fullScreenModal', headerShown:false }}/>
          {/* <Drawer.Screen 
            name="Delivery" 
            component={DeliveryScreen} 
            options={{ presentation: 'fullScreenModal', headerShown:false }}
          /> */}
          <Drawer.Screen name="Image" component={ImageScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Drawer.Screen name="Opinions" component={OpinionsScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
        </Drawer.Navigator>
      </Provider>
    </NavigationContainer>
  );
}