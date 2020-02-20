import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCard5 from "../components/MaterialCard5";

import MaterialButtonWithVioletText from "../components/MaterialButtonWithVioletText";
import MaterialSearchBar from "../components/MaterialSearchBar";
import Services from "../components/services"
import { MonoText } from '../components/StyledText';
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";



export default function InboxScreen(props) {
  return (
    <View style={styles.container}>
        
      <MaterialSearchBar
        style={styles.materialSearchBar1}
        navigation={props.navigation}
      ></MaterialSearchBar>

      <View style={{flexDirection: 'row', marginTop: 4,
    flexWrap: 'wrap', justifyContent: 'space-between',}}>
      <Text style={styles.inbox}>Inbox 
       </Text>

       <View  style={{flexDirection: 'row',
    flexWrap: 'wrap', justifyContent: 'space-between',}}>
       <View style={styles.notification}>
           <Text style={styles.textnotif}>4</Text>
           </View>

           <TouchableOpacity style={styles.button}>
            <Text>+ New</Text>
          </TouchableOpacity>


       </View>
      </View>

       <ScrollView>
       <View style={styles.materialCardWithImageAndTitle1Stack}>
         
        <MaterialCardWithImageAndTitle
        navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>

<MaterialCardWithImageAndTitle
navigation={props.navigation}  
          style={styles.materialCardWithImageAndTitle1}
        ></MaterialCardWithImageAndTitle>
        </View>

       </ScrollView>
    </View>

  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      fontFamily: 'Montserrat-Medium',
    },
    textnotif:{
      color: '#fff',
    },
    materialSearchBar1: {
        width: "97%",
    height: 46,
    marginTop: 32,
    marginLeft: 6,

    marginBottom: 10,

    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid'
      },
    notification: {
        backgroundColor: 'dodgerblue',
        color: '#fff',
        paddingLeft: 8,
        paddingTop: 2,
        marginRight: 10,
        fontSize: 10,
        width: 25,
        height: 25,
        borderRadius: 50,
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'flex-end'
    },
    button: {
        borderStyle: 'solid',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        borderRadius: 3,
        padding: 4,
        color: 'dodgerblue',
        marginRight: 10,
    },
    inbox: {
        color: "#000",
        fontSize: 18,
        lineHeight: 26,
        marginLeft: 13,
        marginTop: 5,
      fontFamily: 'Montserrat-Medium',
      textTransform: 'uppercase'
      },
      materialCardWithImageAndTitle1: {
        top: 0,
        left: 0,
        width: '100%',
        shadowOpacity: 0.01
      },
      materialCardWithImageAndTitle1Stack: {
        width: '100%',
        marginTop: 10,
      },
})


