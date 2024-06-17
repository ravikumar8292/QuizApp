import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Btn = ({btnlabel, textColor, bgcolor,Press}) => {
  return (
    <TouchableOpacity
    onPress={Press}
      style={{
        backgroundColor: bgcolor,
        borderRadius: 100,
        alignItems: 'center',
        width: 320,
        paddingVertical:8,
        marginVertical:10
      }}>
      <Text style={{color: textColor, fontSize: 18, fontWeight: 'bold'}}>
        {btnlabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;
