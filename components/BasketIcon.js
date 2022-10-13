import { View, Text } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { TouchableOpacity } from 'react-native';
// import Currency from 'react-currency-format';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc';

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: basketTotal, code: "ARS" })

    if (items.length === 0) return null;

    return (
        <View style={tw `absolute bottom-10 w-full z-50`}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Basket")} 
                style={tw `bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1`}
            >
                <Text style={tw `text-white font-extrabold text-lg bg-[#012a296] py-1 px-2`}>
                    {items.length}
                </Text>
                <Text style={tw `flex-1 text-white font-extrabold text-lg text-center`}>
                    View Basket
                </Text>
                <Text style={tw `text-lg text-white font-extrabold`}>
                    {/* <Currency quantity={basketTotal} currency="GBP" /> */}
                    <Text>{symbol} </Text>
                    <Text>{valueFormattedWithSymbol}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon
