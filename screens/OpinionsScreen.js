import { View, Text, ScrollView, Image } from 'react-native'
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

    return (
        opinions.length === 0 ?
        (
            <>
                <View style={{ height: '100%', width: '100%' }}>
                    <View style={tw `flex p-5 flex-row items-center border-b border-gray-400 border-solid`}>
                        <TouchableOpacity
                            onPress={navigation.goBack}
                            style={tw `bg-gray-100 rounded-full`}
                            >
                            <ArrowLeftIcon size={20} color="#00CCBB" />
                        </TouchableOpacity>

                        <Text style={tw `pl-4 font-bold text-xl`}>
                            Comments
                        </Text>
                    </View>

                    <View>
                        <View style={tw `text-xs w-full flex wrap m-1 flex-row border-b border-gray-300 border-solid`}>
                            <View style={tw `text-xs flex wrap w-11/12 relative pl-2 pt-2`}>  
                                <Text style={tw `p-2 mb-1`}>
                                    There are no comments for this restaurant, 
                                    be the first after trying their products! 
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        ) : 
        (
            <>
                <View style={{ height: '100%', width: '100%' }}>
                    <View style={tw `flex p-5 flex-row items-center border-b border-gray-400 border-solid`}>
                        <TouchableOpacity
                            onPress={navigation.goBack}
                            style={tw `bg-gray-100 rounded-full`}
                            >
                            <ArrowLeftIcon size={20} color="#00CCBB" />
                        </TouchableOpacity>

                        <Text style={tw `pl-4 font-bold text-xl`}>
                            Comments
                        </Text>
                    </View>

                    <View>
                        {opinions?.map((opinion)=> {
                            let stars = new Array(opinion.stars).fill("");

                            return (
                                <>
                                    <View key={opinion.id} style={tw `text-xs w-full flex wrap m-1 flex-row border-b border-gray-300 border-solid`}>
                                        <View style={tw `flex justify-center ml-2`}>
                                            <Image 
                                                source={require(`../server/dbimages/users/${opinion.user_id}.png`)}
                                                style={{resizeMode: "stretch", width: "30px", height: "30px", backgroundColor: "rgb(209 213 219)", padding: "1rem", borderRadius: "50%"}}
                                                />
                                        </View>
                                        <View style={tw `text-xs flex wrap w-11/12 relative pl-2 pt-2`}>
                                            <View style={tw `flex flex-row`}>
                                                <Text style={tw `font-semibold px-2`}>{opinion.first_name}</Text>
                                                {
                                                    stars.map((star) => (
                                                        <StarIcon key={star + 1} color="green" opacity={0.5} size={22} />
                                                        ))
                                                }                                                                        
                                            </View>  
                                            <Text style={tw `p-2 mb-1`}>{opinion.description}</Text>
                                            <Text style={tw `absolute top-4 right-4`}>{opinion.date.substr(8,2) + "-" + opinion.date.substr(5,2) + "-" + opinion.date.substr(0,4)}</Text>
                                        </View>
                                    </View>
                                </>
                            )
                        })}
                    </View>
                </View>
            </>
        )
    )
}

export default OpinionsScreen