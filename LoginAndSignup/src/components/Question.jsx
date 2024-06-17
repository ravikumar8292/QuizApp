import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
const { height, width } = Dimensions.get('window');

const Question = ({ data, SelectedOption }) => {
  return (
    <View style={{ width: width }}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: "bold",
          marginHorizontal: 15,
          paddingLeft:10,
        }}>
        {'Ques:- ' + data.Question}
      </Text>
      <FlatList
        data={data.Option}
        renderItem={({ item, index }) => {
          return (
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 55,
                  elevation: 3,
                  backgroundColor: data.Marked === index + 1 ? 'skyblue' : '#fff',
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 8
                }}
                onPress={() => {
                  SelectedOption(index + 1);
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    borderRadius: 15,
                    backgroundColor: data.Marked === index + 1 ? '#fff' : 'skyblue',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontWeight: '600',color: data.Marked === index + 1 ? 'black' : '#fff', }}>
                    {index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, marginLeft: 10, paddingRight:35, color: data.Marked === index + 1 ? '#fff' : 'black' }}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Question;















