
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function RadioButton(props)  {
  
  const select = (value) => {
    props.onSelecting(value);
  }

  const { buttonContainer, circle, checkedCircle } = styles;

  return (
    <View style={buttonContainer}>
      <TouchableOpacity
        style={circle}
        onPress={() => select(props.value)}
      >
        { props.selected === props.value && (<View style={checkedCircle} />) }
      </TouchableOpacity>    
      <Text>{props.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
    button: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20
    },
    checkedButton: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor:'#04549b'
    }
  });
  

