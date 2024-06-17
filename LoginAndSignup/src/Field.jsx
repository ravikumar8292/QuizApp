import {TextInput} from 'react-native';
import React from 'react';
import {darkgreen} from './Constant';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: darkgreen,
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor:'rgb(220,220,220)',
        marginVertical:12
      }}
      placeholderTextColor={darkgreen}></TextInput>
  );
};

export default Field;
