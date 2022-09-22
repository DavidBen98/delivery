import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';


const CustomDrawer = (props) => {
  const { data } = useSelector(selectUser);

  return (
    <View>
      <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#fff'}}>
        {/* <ImageBackground source={require(`../server/dbimages/users/${data?.username}.png`)} style={{padding:20}}>
          <Image source={require('../assets/icon.png')} style={{height:80,width: 80, borderRadius: 40, marginBottom: 10}} />
          <Text style={{color:'#fff', fontSize:18, fontFamily:'Roboto-Medium'}}>John Doe</Text>
          <Text style={{color:'#fff', fontFamily:'Roboto-Regular'}}>280 Coins</Text>
        </ImageBackground> */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Text>Our custom Text</Text>
      </View>
    </View>
  )
}

export default CustomDrawer