import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomDrawerContent = () => {
  return (           
        <SafeAreaView style={{flex: 1}}>

        <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => navigation.navigate('Home')}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('Settings')}
          >
            <Text>Settings</Text>
          </TouchableOpacity>
        </ScrollView>
          <TouchableOpacity
          style={{marginTop: 20, marginLeft: 5}}
          onPress={() => navigation.navigate('Login')}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
      </SafeAreaView>
  )
}

export default CustomDrawerContent