import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import React from 'react';
import Background from '../Background';
import {darkgreen} from '../Constant';
import Btn from '../Btn';
import {Formik} from 'formik';
import * as Yup from 'yup';
// import ToastAndroid from 'react-native/Libraries/Components/ToastAndroid';

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const sendCred = values => {
    fetch('http://192.168.250.143:3000/api/login', {
      // set ipconfig in http://ipconfig:3000/api/login
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.warn(data);  //data take only the token
        if (data) {
          // Assuming your API returns a success property on successful login

          ToastAndroid.show('Login Successfull !', ToastAndroid.SHORT);

          navigation.navigate('quiz');
        } else {
          // Handle login failure (show message, etc.)
          console.warn('Login failed');
          ToastAndroid.show('Login Failed !', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error(error);
        ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
      });
  };

  return (
    <Background>
      <View style={{alignItems: 'center', width: 360}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Login
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 700,
          width: 360,
          borderTopLeftRadius: 130,
          paddingTop: 100,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, color: darkgreen, fontWeight: 'bold'}}>
          Welcome Back
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Login to your account
        </Text>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            sendCred(values);
            // console.warn(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                placeholder="Email / Username"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{
                  borderRadius: 100,
                  color: darkgreen,
                  paddingLeft: 20,
                  paddingRight: 5,
                  width: 320,
                  backgroundColor: 'rgb(220,220,220)',
                  marginVertical: 12,
                  fontSize: 17,
                }}
              />
              {touched.email && errors.email && (
                <Text style={{color: 'red', marginBottom: 10}}>
                  {errors.email}
                </Text>
              )}

              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={{
                  borderRadius: 100,
                  color: darkgreen,
                  paddingLeft: 20,
                  paddingRight: 5,
                  width: 320,
                  backgroundColor: 'rgb(220,220,220)',
                  marginVertical: 12,
                  fontSize: 17,
                }}
              />
              {touched.password && errors.password && (
                <Text style={{color: 'red', marginBottom: 10}}>
                  {errors.password}
                </Text>
              )}

              <View
                style={{
                  alignItems: 'flex-end',
                  width: 320,
                  paddingRight: 16,
                  marginBottom: 20,
                }}>
                <Text
                  style={{color: darkgreen, fontWeight: 'bold', fontSize: 16}}>
                  Forget Password?
                </Text>
              </View>

              <Btn
                textColor="white"
                bgcolor={darkgreen}
                btnlabel="Login"
                Press={handleSubmit}
              />
            </View>
          )}
        </Formik>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: darkgreen,
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 5,
              }}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default LoginScreen;
