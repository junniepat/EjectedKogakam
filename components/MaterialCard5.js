import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function MaterialCard5(props) {
  return (
    <TouchableOpacity  style={[styles.container, props.style]}  onPress={()=>{props.navigation.navigate('ProductView')}}>
    <View >
      <Image
        source={require("../assets/images/slide3.jpg")}
        resizeMode="cover"
        style={styles.cardItemImagePlace}
      ></Image>
  
      <View style={styles.titleStyleStack}>
        <Text style={styles.titleStyle}>Rs 3.00</Text>
        <Text style={styles.subtitleStyle}>Full Desktop Computer</Text>
      </View>
      <View style={styles.locationRow}>
       
        <Text style={styles.location}>  
        <Ionicons name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} size={12} color="#555" style={{marginRight: 6,}} />
    Pakistan</Text>
        
    
        <Text style={styles.loremIpsum}>23 Hrs</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,

    overflow: "hidden",
    paddingBottom: 5,
    marginBottom: 5,
  },
  cardItemImagePlace: {
    height: 75,
    flex: 1,
    backgroundColor: "#333",
    width: undefined,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 10,
  },
  titleStyle: {
    top: 0,
    left: 0,
    width: 105,
    height: 28,
    color: "#000",
    fontSize: 13,
    textAlign: "left",
    fontFamily: 'Montserrat-Medium',
  },
  subtitleStyle: {
    top: 20,
    left: 2,
    width: '100%',
    height: 10,
    color: "#000",
    position: "absolute",
    opacity: 0.5,
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 10,
    textTransform: 'uppercase'
  },
  titleStyleStack: {
    width: 105,
    height: 38,
    marginTop: 6,
    marginLeft: 9
  },
  location: {
    color: "rgba(0,0,0,1)",
    fontSize: 9,
    height: 30,
    fontFamily: 'Montserrat-Medium',
  },
  loremIpsum: {
    color: "rgba(0,0,0,1)",
    fontSize: 9,
    height: 30,
    marginLeft: 69,
    fontFamily: 'Montserrat-Medium',
  },
  locationRow: {
    height: 8,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 5,
  }
});

export default MaterialCard5;
