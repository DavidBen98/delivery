import React, { useEffect} from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import tw from 'twrnc';
import { Formik } from 'formik';
import * as yup from 'yup';
import { newUser } from "../api";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = () => {
  const loginValidationSchema = yup.object().shape({
      first_name: yup
          .string("Input your username")
          .required("*First name is required"),
      second_name: yup
          .string("Input your username")
          .required("*Second name is required"),
      username: yup
          .string("Input your username")
          .required("*Username is required"),
      password: yup
          .string("Input your Password")
          .required("*Password is required"),
      confirm_password: yup
          .string("Input your Password")
          .required("*Password is required")
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
      email: yup
      .string("Input your email")
      .required("*Email is required")
      .email("Email is invalid"),
      image: yup
        .mixed()
        .required("*Image is a required file"),
  });

  const navigation = useNavigation();

  //controla que los permisos para acceder a la galería hayan sido dados
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Lo sentimos, se necesitan permisos para acceder a la galería');
        }
      }
    })();
  }, []);

  const register = async (values) => {
      try {
        const userRow = await newUser(values);

        if (userRow.error === null) {
          Alert.alert(
            "Successful registration",
            "Go to login page",
            [
              { text: "OK", onPress: () =>  navigation.navigate('Login')}
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "An error occurred, please try again",
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
          style={tw `relative top-0 left-0`}
        >
          <View 
            style={{
              position: "fixed", width: 100, height: 100, top: 0, left: 0, backgroundColor: 'rgba(0,204,187,0.2)', borderBottomRightRadius: '100%'
            }} 
          />
        </View>

        <View style={tw `flex h-screen w-screen my-auto relative`}>
        
          <Text style={styles.formulario}> Register </Text>
 
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{ first_name: '', second_name: '', username:'', email: '', password: '', confirm_password: '', image: null}}
            onSubmit={values => {
              register(values);
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
              setFieldValue
            }) => (
              <>
                <TextInput 
                  style={styles.input} 
                  placeholder="First Name"
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  keyboardType="default" 
                /> 
 
                {(errors.first_name && touched.first_name) &&
                  <Text style={styles.errorText}>{errors.first_name}</Text>
                }

                <TextInput 
                    style={styles.input} 
                    placeholder="Second Name"
                    onChangeText={handleChange('second_name')}
                    onBlur={handleBlur('second_name')}
                    value={values.second_name}
                    keyboardType="default" 
                /> 
 
                {(errors.second_name && touched.second_name) &&
                  <Text style={styles.errorText}>{errors.second_name}</Text>
                }
 
                <TextInput 
                    style={styles.input} 
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    keyboardType="default" 
                /> 
 
                  {(errors.username && touched.username) &&
                    <Text style={styles.errorText}>{errors.username}</Text>
                  }

                <TextInput 
                    style={styles.input} 
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email" 
                /> 

                    {(errors.email && touched.email) &&
                        <Text style={styles.errorText}>{errors.email}</Text>
                    }

                <TextInput 
                    style={styles.input} 
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    keyboardType="visible-password" 
                /> 
 
                {(errors.password && touched.password) &&
                    <Text style={styles.errorText}>{errors.password}</Text>
                }

                <TextInput 
                    style={styles.input} 
                    placeholder="Confirm password"
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                    keyboardType="visible-password" 
                /> 
 
                {(errors.confirm_password && touched.confirm_password) &&
                    <Text style={styles.errorText}>{errors.confirm_password}</Text>
                }

                <View style={styles.button}>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      setFieldValue("image", e.target.files[0]);
                    }}
                  />
                </View>

                  {(errors.image && touched.image) &&
                    <Text style={styles.errorText}>{errors.image}</Text>
                  }
         
                <TouchableOpacity
                    style={styles.colorBtn}
                    onPress={handleSubmit}
                >
                  <Text style={styles.colorTxtBtn}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>navigation.navigate('Login')} 
                  style={tw `mx-auto my-2`}
                >
                  <Text>¿You have an account? Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>  

        <View
            style={tw `relative w-full bg-yellow`}
        >
            <View 
                style={{
                    position: "fixed", width: 100, height: 100, bottom: 0, right: 0, backgroundColor: 'rgba(0,204,187,0.2)', borderTopLeftRadius: '100%'
                }} 
            />
        </View>
    </>
  )
};

export default RegisterScreen
 
const styles = StyleSheet.create({
 
  formulario: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'center',
  },

  button: {
    padding: 10,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 7,
  },
 
  input: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
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
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15, 
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#000',
    paddingRight: 12,
    marginBottom: 0,
  },
 
  colorBtn: {
    borderWidth: 1,
    borderColor: '#00CCBB',
    backgroundColor: '#00CCBB',
    padding: 15,
    margin: 10,
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
    margin: 5,
    marginLeft: 20,
    paddingTop: 5,
  }
});