import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack'
// import { createAppContainer } from 'react-navigation';

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
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawer from './components/CustomDrawer';

import { ScrollView, SafeAreaView, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false
})

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator 
      drawerContent={() =>             
        <SafeAreaView style={{flex: 1}}>

        <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => this.props.navigation.navigate('Settings')}
          >
            <Text>Settings</Text>
          </TouchableOpacity>
        </ScrollView>
          {/* <TouchableOpacity
          style={{marginTop: 20, marginLeft: 5}}
          onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Logout</Text>
          </TouchableOpacity> */}
      </SafeAreaView>}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator 
          // useLegacyImplementation 
          // drawerContent={props => 
          //   <CustomDrawer {...props} 
          //     screenOptions={{
          //       headerShown: false,
          //       drawerActiveBackgroundColor: '#00CCBB',
          //       drawerActiveTintColor: '#fff',
          //       drawerInactiveTintColor: '#333',
          //       drawerLabelTintColor: '#fff',
          //       drawerLabelStyle: {
          //         marginLeft: -25,
          //         fontFamily: 'Roboto-Medium',
          //         fontSize: 15,
          //       }
          //   }}
          // />}
        >
          {/* <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal', headerShown:false }}/> */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', headerShown:false }}/>
          <Stack.Screen name="Locations" component={LocationsScreen} options={{ headerShown:false }}/>
          <Stack.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler}/>
          {/* <Drawer.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown:false }}/>
          <Drawer.Screen name="Basket" component={BasketScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Drawer.Screen name="PreparingOrder" component={PreparingOrderScreen} 
          options={{ presentation: 'fullScreenModal', headerShown:false }}/> */}
          {/* <Drawer.Screen 
            name="Delivery" 
            component={DeliveryScreen} 
            options={{ presentation: 'fullScreenModal', headerShown:false }}
          /> */}
          {/* <Drawer.Screen name="Image" component={ImageScreen} 
          options={{ presentation: 'modal', headerShown:false }}/>
          <Drawer.Screen name="Opinions" component={OpinionsScreen} 
          options={{ presentation: 'modal', headerShown:false }}/> */}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}