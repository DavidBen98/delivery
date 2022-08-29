import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';


const OpinionsScreen = () => {
    const {
        params: {
            opinions
        }
    } = useRoute();

    const navigation = useNavigation();


    console.log(opinions);


  return (
    <>
        <View style={{ height: '100%', width: '100%' }}>
            <TouchableOpacity
                onPress={navigation.goBack}
                style={tw `absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}
                >
                <ArrowLeftIcon size={20} color="#00CCBB" />
            </TouchableOpacity>

            <View style={tw `flex mt-12 pb-36`}>
                <Text style={tw `px-4 pt-6 mb-3 font-bold text-xl`}>
                    Opinions
                </Text>

                <ScrollView 
                    style={tw `bg-gray `}
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                    >
                    {opinions?.map((opinion) => (
                        <>
                            <View key={opinion.id} style={tw `text-xs w-full flex wrap height-screen`}>
                                <View style={tw `text-xs w-full flex wrap relative`}>
                                    <StarIcon color="green" opacity={0.5} size={22} />
                                    <Text style={tw `text-green-500 font-bold text-base p-1`}>
                                        {opinion.stars}
                                    </Text> 
                                    <Text>{opinion.description}</Text>
                                    <Text style={tw `absolute top-0 right-0`}>{opinion.date.substr(0,10)}</Text>
                                </View>
                            </View>
                        </>
                        ))}
                </ScrollView>
            </View>
        </View>
    </>
  )
}

export default OpinionsScreen