import {View, Text} from 'react-native';
import React from 'react';
import Background from './Background.jsx';
import Btn from './Btn.jsx';
import { darkgreen, green } from './Constant.jsx';

const Home = ({navigation}) => {
  return (
    <Background>
      <View style={{marginHorizontal: 20, marginVertical: 100}}>
        <Text style={{color: 'white', fontSize: 64}}>Let's Start</Text>
        <Text style={{color: 'white', fontSize: 64, marginBottom:40}}>Coding</Text>
        <Btn bgcolor={green} textColor='white' btnlabel="Login"  Press={()=> navigation.navigate("Login")}/>
        <Btn bgcolor='white' textColor={darkgreen} btnlabel="Signup" Press={()=> navigation.navigate("Signup")}/>
      </View>
    </Background>
  );
};

export default Home;
