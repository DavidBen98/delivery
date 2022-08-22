import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/core'
import tw from 'twrnc';


const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() =>{
        setTimeout(() => {
            // navigation.navigate("Delivery");
            navigation.navigate("Home");
        }, 4000)
    },[])

  return (
    <SafeAreaView style={tw `bg-[#00CCBB] flex-1 justify-center items-center`}>
        {/* <Animatable.Image
            source={require("../assets/orderLoading.gif")}
            animation="sliceInUp"
            iterationCount={1}
            style={tw `h-96 w-96" 
        /> */}

        <Animatable.Text
            animation="slideInUp"
            iterationCount={1}
            style={tw `text-lg my-10 text-white font-bold text-center`}
        >
            Waiting for Restaurant to accept your order!
        </Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen