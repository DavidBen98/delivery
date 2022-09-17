import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import tw from 'twrnc';

import { Formik } from 'formik';
import * as yup from 'yup';
import { getUser } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { CREDENTIALS_GOOGLE_WEB, CREDENTIALS_GOOGLE_IOS } from '@env';

import { newUser } from "../api";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialState = {username:'', password: ''};
  const [user, setUser] = useState(initialState);
  const [aux, setAux] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useSelector(selectUser);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: `${CREDENTIALS_GOOGLE_WEB}`,
    iosClientId: `${CREDENTIALS_GOOGLE_IOS}`
  });

  useEffect(() => {
    const getToken = async() => {
      const token = await AsyncStorage.getItem('token');

      dispatch(login({
        userToken: token
      }));

      if(token !== null) navigation.navigate('Home')
    }
    
    getToken();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(login({
        userToken: response.authentication.accessToken
      }));

      userToken !== null && fetchUserInfo();
    }
  }, [response, userToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    await AsyncStorage.setItem('token', userToken);
    
    const {given_name,family_name, email, picture } = await response.json();

    const user = { first_name: given_name, second_name: family_name, username: email, email: email, password: null, image: picture, social: 'Google'}

    const userRow = await newUser(user);

    navigation.navigate('Home');

  }

  const loginValidationSchema = yup.object().shape({
    username: yup
      .string("Input your username")
      .required("*Username is required"),
  
    password: yup
      .string("Input your Password")
      .required("*Password is required")
  });

  const validateUser = async (values) => {
      try {
        const userRow = await getUser(values);
       
        if (userRow.data.length > 0) {
          await AsyncStorage.setItem('token', userRow.token);

          dispatch(
            login({
              userToken: userRow.token,
            })
          );

          setUser(initialState);
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

  const handleSubmit = (values) => {
    setUser(values);
    validateUser(values);
  }

  {isLoading && <Text>Esta cargando</Text> }
   return (
    <>      
        <View
          style={tw `absolute top-0 left-0`}
        >
          {user.username.length > 0 && user.password.length > 5? (
            <View 
              style={{
                width: 100, height: 100, backgroundColor: 'rgba(0,204,187,0.5)', borderBottomRightRadius: '100% 100%'
              }} 
            />
          ) : (
            <View 
              style={{ 
                width: 100, height: 100, backgroundColor: 'rgba(0,204,187,0.1)', borderBottomRightRadius: '100% 100%'
              }} 
            />
          ) }
        </View>

        <View style={tw `flex h-screen w-screen my-auto relative`}>  
          <Text style={styles.formulario}> Login </Text>
 
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{ username:'', password: '' }}
            onSubmit={(values) => {
              handleSubmit(values)
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
                <TextInput 
                  style={styles.username} 
                  placeholder="JhonDoe"
                  onChangeText={handleChange('username')
                    // setUser({...user, username: values.username})
                  }
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  keyboardType="default" 
                /> 
 
                  {(errors.username && touched.username) &&
                    <Text style={styles.errorText}>{errors.username}</Text>
                  }

                <TextInput 
                  style={styles.password} 
                  placeholder="**********"
                  onChangeText={
                    handleChange('password')
                    // setUser({...user, password: values.password})
                  }
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  keyboardType="visible-password" 
                /> 
 
                {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
         
                {user.username.length > 0 && user.password.length > 5? 
                  (
                    <TouchableOpacity
                      style={styles.colorBtn}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.colorTxtBtn}>Confirm</Text> 
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.colorBtnDisabled}
                      onPress={handleSubmit}
                      disabled
                    >
                      <Text style={styles.colorTxtBtn}>Confirm</Text> 
                    </TouchableOpacity>
                  )
                }
 
              </>
            )}
          </Formik>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 30,
              marginLeft: 20,
              marginRight: 20,
            }}>

            <Text style={{textAlign: 'center', color: '#666', marginBottom: 20, width: '100%'}}>
              Or, login with ...
            </Text>
            <TouchableOpacity
              onPress={() => {promptAsync()}}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >

              <Image
                source={require(`../assets/images/misc/google.svg`)}
                style={tw `h-5 w-5 rounded-sm object-fill`}
              />

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >

              <Image
                source={require(`../assets/images/misc/facebook.svg`)}
                style={tw `h-5 w-5 rounded-sm object-fill`}
              />

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >

              <Image
                source={require(`../assets/images/misc/twitter.svg`)}
                style={tw `h-5 w-5 rounded-sm object-fill`}
              />

            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')} 
            style={tw `mx-auto my-2`}
          >
            <Text>¿You do not have an account? Register</Text>
          </TouchableOpacity>

        </View> 

        <View
          style={tw `absolute bottom-0 right-0 bg-yellow`}
        >
          {user.username.length > 0 && user.password.length > 5? (
            <View 
              style={{
                width: 100, height: 100, backgroundColor: 'rgba(0,204,187,0.5)', borderTopLeftRadius: '100% 100%'
              }} 
            />
          ) : (
            <View 
              style={{ 
                width: 100, height: 100, backgroundColor: 'rgba(0,204,187,0.1)', borderTopLeftRadius: '100% 100%'
              }} 
            />
          ) }
        </View>
    </>
  )
};

export default LoginScreen
 
const styles = StyleSheet.create({
 
  formulario: {
    color: '#000',
    fontSize: 18,
    marginTop: 5,
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
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#000',
    paddingRight: 12,
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
    margin: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 7,
  },

  colorBtnDisabled: {
    borderWidth: 1,
    borderColor: 'rgba(0,204,187,0.3)',
    backgroundColor: 'rgba(0,204,187,0.3)',
    padding: 15,
    margin: 20,
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
    marginLeft: 20,
    paddingTop: 5,
  } 
});