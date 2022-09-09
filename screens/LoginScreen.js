import React, { useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput, 
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { Formik, setNestedObjectValues } from 'formik';
import * as yup from 'yup';
import { getUser } from "../api";
import { useNavigation, useRoute } from '@react-navigation/native';
 
const loginValidationSchema = yup.object().shape({
  username: yup
    .string("Input your username")
    .required("*Username is required"),

  password: yup
    .string("Input your Password")
    .required("*Password is required")
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});


const LoginScreen = () => {
  const [user, setUser] = useState({username:'', password: ''});
  const navigation = useNavigation();

  const validateUser = async (values) => {
      try {
        const userRow = await getUser(values);
       
        if (userRow.data.length > 0) {
          await AsyncStorage.setItem('token', userRow.token);
          navigation.navigate('Home');
        } else {
          Alert.alert(
            "Error",
            "The username and password do not match. Please try again",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      } catch (error) {
        console.log(error); 
      }
  }

   return (
    <>      
          <View
            style={tw `absolute top-0 left-0`}
          >
            <View 
              style={{
                width: 200, height: 200, backgroundColor: '#00CCBB', borderBottomRightRadius: '100% 100%'
              }} 
            />
          </View>
        <View style={tw `flex h-screen w-screen my-auto relative`}>
        
          <Text style={styles.formulario}> Login </Text>
 
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{ username:'', password: '' }}
            onSubmit={values => {
              setUser(values);
              validateUser(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
 
                {/* <TextInput style={styles.nombresyapellidos} 
                  placeholder="Nombres y Apellidos"
                  onChangeText={handleChange('nombresyapellidos')}
                  onBlur={handleBlur('nombresyapellidos')}
                  value={values.nombresyapellidos}
                  keyboardType="default" /> 
 
                  {(errors.nombresyapellidos && touched.nombresyapellidos) &&
                    <Text style={styles.errorText}>{errors.nombresyapellidos}</Text>
                  } */}
 
                <TextInput 
                  style={styles.username} 
                  placeholder="JhonDoe"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  keyboardType="default" 
                /> 
 
                  {(errors.username && touched.username) &&
                    <Text style={styles.errorText}>{errors.username}</Text>
                  }

                <TextInput style={
                  (errors.password && touched.password) ?
                  styles.passwordWithError
                  : styles.password
                } 
                  placeholder="**********"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  keyboardType="visible-password" 
                /> 
 
                {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
         
                <TouchableOpacity
                  style={styles.colorBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.colorTxtBtn}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={navigation.goBack} 
                  style={tw `mx-auto my-4`}
                >
                  ¿You do not have an account? Register
                </TouchableOpacity>
 
              </>
            )}
          </Formik>
        </View>    
          <View
            style={tw `absolute bottom-0 right-0 bg-yellow`}
          >
            <View 
              style={{
                width: 200, height: 200, backgroundColor: '#00CCBB', borderTopLeftRadius: '100% 100%'
              }} 
            />
          </View>
    </>
  )
};

export default LoginScreen
 
const styles = StyleSheet.create({
 
  formulario: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'center',
  },
 
  password: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20, 
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#000',
    paddingRight: 12,
  }, 

  passwordWithError: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20, 
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#000',
    paddingRight: 12,
    marginBottom: 0,
  },
 
  username: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20, 
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#000',
    paddingRight: 12,
  }, 
 
  colorBtn: {
    borderWidth: 1,
    borderColor: '#00CCBB',
    backgroundColor: '#00CCBB',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 7,
  },
 
  colorTxtBtn: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
 
  errorText: {
    fontSize: 14,
    color: 'red',
    margin: 10,
    marginLeft: 20
  }
 
});