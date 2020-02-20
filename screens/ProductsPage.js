import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import CupertinoButtonInfo from "../components/CupertinoButtonInfo";
import Icon from "react-native-vector-icons/Feather";

import MaterialSearchBar1 from "../components/MaterialSearchBar1";
import { Ionicons } from '@expo/vector-icons';

import MaterialCard5 from "../components/MaterialCard5";

function ProductsPage(props) {
  return (
<>
<View style={styles.container}>
    <MaterialSearchBar1
        style={styles.materialSearchBar1}
        navigation={props.navigation}
      ></MaterialSearchBar1>




       <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <Text style={styles.details}>
            {props.navigation.getParam('name')}
          </Text>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.button}>Filter    
            <Ionicons name={Platform.OS === 'ios' ? 'ios-funnel' : 'md-funnel'} size={12}  style={{marginRight: 6,marginLeft: 6, paddingLeft: 6,}} /></Text>
          </TouchableOpacity>
       </View>

        <ScrollView
        style={styles.container}>
 <View style={styles.scrollAreaStack}>
         <View 
            style={styles.scrollArea_contentContainerStyle}>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>

                <View style={styles.adsContainer}>
                  <Text style={styles.adsText}>You can place your ads here</Text>
                  <Text style={styles.adsText1}>Sell your things in your community, its quick and easy. </Text>
                </View>

                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>

                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
                <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
        </View>
        </View>
       
      
      </ScrollView>

 

    </View>
</>

  )}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    adsContainer: {
      backgroundColor: '#4630EB',
      marginTop: 5,
      marginBottom: 5,
      paddingTop: 20,
      paddingLeft:20,
      paddingBottom: 20,
      width: '100%',
      textAlign: 'center',
      alignContent:  'center',
    },
    adsText: {
      textAlign:  'center',
      alignContent:  'center',
      color: '#fff',
      fontSize: 15
    },
    adsText1: {
      textAlign:  'center',
      alignContent:  'center',
      color: '#fff',
      fontSize: 10
    },
    
    button: {
      width: 70,
      marginTop: 2,
      borderStyle: 'solid',
      borderColor: 'dodgerblue',
      borderWidth: 1,
      paddingLeft: 4,
      color: 'dodgerblue',
      marginRight: 18,
      alignSelf: 'flex-end',
      alignItems: 'flex-end'
  },
  materialCard5: {
    top: 30,
    left: 3,
    right: 10,
    width: "49%",
    height: 185,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
    PersonInfo:{
        width: "100%",
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: '#eee',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fcfcfc'
    },

   
  scrollAreaStack: {
    width: '100%',
  },

  scrollArea_contentContainerStyle: {
    top: 4,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingLeft: 5,
    paddingRight: 10,
  },

    materialSearchBar1: {
      width: "97%",
      height: 46,
      marginTop: 25,
      marginLeft: 6,
  
      marginBottom: 15,
  
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      borderStyle: 'solid'
      },
    
     
   
      details: {
        color: "#333",
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 26,
        marginTop: 5,
        marginLeft: 9,
        textTransform: 'uppercase'
      },
    
     
      cupertinoButtonInfoRow: {
        height: 33,
        flexDirection: "row",
        marginTop: 7,
        marginLeft: 9,
      },
      cupertinoButtonInfo: {
        width: 91,
        height: 32,
        marginTop: 1,
        
    fontFamily: 'Montserrat-Medium',
      },
      icon: {
        color: "rgba(21,97,195,1)",
        fontSize: 20,
        height: 24,
        width: 24,
        marginLeft: 7,
        marginTop: 6,
        
    fontFamily: 'Montserrat-Medium',
      },
      loremIpsum: {
        color: "rgba(16,108,199,1)",
        fontSize: 13,
        
    fontFamily: 'Montserrat-Medium',
        lineHeight: 26,
        marginLeft: 2
      },
})
  
export default ProductsPage;
