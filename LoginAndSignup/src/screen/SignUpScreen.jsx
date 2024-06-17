import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ToastAndroid
} from 'react-native';
import React, {useState} from 'react';
import Background from '../Background';
import {darkgreen} from '../Constant';
import Btn from '../Btn';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object().shape({
  first: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Invalid First Name')
    .required('FirstName is required'),
  last: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Invalid Last Name')
    .required('LastName is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('ConfirmPassword is required'),
});

const SignUpScreen = ({navigation}) => {
  const [click, setClick] = useState(false);

  const sendCred = (values) => {
    fetch("http://192.168.250.143:3000/api/register", {             // set ipconfig in http://ipconfig:3000/api/register
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "fname":values.first,
        "lname":values.last,
        "email": values.email,
        "password": values.password,
        "confirmpassword": values.confirmpassword
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.warn(data);
      })
      .catch(error => {
        console.error(error);
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
            marginTop: 10,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Create New Account
        </Text>
      </View>

      <View 
        style={{
          backgroundColor: 'white',
          height: 700,
          width: 360,
          borderTopLeftRadius: 130,
          paddingTop: 40,
          alignItems: 'center',
        }}>
        <Formik
          initialValues={{
            first: '',
            last: '',
            email: '',
            password: '',
            confirmpassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            // console.warn(values);
            resetForm();
            sendCred(values);
            
            ToastAndroid.show('Register Successfull !', ToastAndroid.SHORT);
            setTimeout(()=>{
              navigation.navigate('Login');
            },1000)
             // Navigate to Login screen
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
                placeholder="Enter First Name"
                keyboardType="text"
                onChangeText={handleChange('first')}
                onBlur={handleBlur('first')}
                value={values.first}
                style={{
                  borderRadius: 100,
                  color: darkgreen,
                  paddingLeft: 20,
                  paddingRight: 5,
                  width: 320,
                  backgroundColor: 'rgb(220,220,220)',
                  marginTop: 13,
                  fontSize: 17,
                }}
              />
              { touched.first && errors.first ? 
                <Text
                  style={{color: 'red', marginBottom: 2, marginHorizontal: 10}}>
                  {errors.first}
                </Text>
               : <Text> </Text>}

              <TextInput
                placeholder="Enter Last Name"
                keyboardType="text"
                onChangeText={handleChange('last')}
                onBlur={handleBlur('last')}
                value={values.last}
                style={{
                  borderRadius: 100,
                  color: darkgreen,
                  paddingLeft: 20,
                  paddingRight: 5,
                  width: 320,
                  backgroundColor: 'rgb(220,220,220)',
                  fontSize: 17,
                }}
              />
              {touched.last && errors.last ? 
                <Text
                  style={{color: 'red', marginBottom: 2, marginHorizontal: 10}}>
                  {errors.last}
                </Text>
              : <Text> </Text>}

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
                  fontSize: 17,
                }}
              />
              {touched.email && errors.email ? 
                <Text
                  style={{color: 'red', marginBottom: 2, marginHorizontal: 10}}>
                  {errors.email}
                </Text>
              : <Text> </Text>}

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
                  fontSize: 17,
                }}
              />
              {touched.password && errors.password ?
                <Text
                  style={{color: 'red', marginBottom: 2, marginHorizontal: 10}}>
                  {errors.password}
                </Text>
              : <Text> </Text>}

              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={handleChange('confirmpassword')}
                onBlur={handleBlur('confirmpassword')}
                value={values.confirmpassword}
                style={{
                  borderRadius: 100,
                  color: darkgreen,
                  paddingLeft: 20,
                  paddingRight: 5,
                  width: 320,
                  backgroundColor: 'rgb(220,220,220)',
                  fontSize: 17,
                }}
              />
              {touched.confirmpassword && errors.confirmpassword ?
                <Text
                  style={{
                    color: 'red',
                    marginBottom: 10,
                    marginHorizontal: 10,
                  }}>
                  {errors.confirmpassword}
                </Text>
              : <Text> </Text>}

              <View
                style={{
                  alignItems: 'flex-end',
                  width: 320,
                  paddingRight: 16,
                  marginBottom: click ? 12 : 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 13}}>
                    By signing in, you agree to our
                  </Text>
                  <Text
                    style={{
                      color: darkgreen,
                      fontWeight: 'bold',
                      fontSize: 13,
                    }}>
                    Terms & Conditions
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    marginBottom: click ? 6 : 14,
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 13}}>and</Text>
                  <Text
                    style={{
                      color: darkgreen,
                      fontWeight: 'bold',
                      fontSize: 13,
                    }}>
                    Privacy Policy
                  </Text>
                </View>
              </View>

              <Btn
                textColor="white"
                bgcolor={darkgreen}
                btnlabel="Signup"
                Press={() => {
                  setClick(true);
                  handleSubmit();
                }} // handleSubmit is sufficient to handle form submission
              />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Already have an account ?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      color: darkgreen,
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 5,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Background>
  );
};


export default SignUpScreen;
