import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";

import CupertinoButtonInfo from "../components/CupertinoButtonInfo";
import Icon from "react-native-vector-icons/Feather";

import MaterialSearchBar1 from "../components/MaterialSearchBar1";
import Swiper from "react-native-web-swiper";

import MaterialCard5 from "../components/MaterialCard5";

import Carousel from "../components/carousel";

import { Ionicons } from '@expo/vector-icons';


function ProductView(props) {
  return (
<>
<View style={styles.container}>
    <MaterialSearchBar1
        style={styles.materialSearchBar1}
        navigation={props.navigation}
      ></MaterialSearchBar1>



<ScrollView>
<View style={styles.ramanOsmanStackColumn}>
            
            <View >

            <Carousel/>
            
             </View>
            
        

              <View style={styles.priceArea}>
                <Text style={styles.price}>Rs 34.53</Text>
                <Text><Ionicons name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'} size={12} color="#555" style={{marginRight: 6,}} /></Text>
                
              </View>
              <Text style={{marginLeft: 9, fontSize:9}}>23 mins ago</Text>

                  <View style={styles.rect2}>
                    <Text style={styles.details}>Details</Text>
                    <Text style={styles.detailsDescription}>
                        mpdiiofdwio iowoi fw fiow ufiw uiw oie ep9o wuw  wu ou iowiu
                        o ewuewuwuw iwowewo wpoiwoiwppowowi wio i oiw hiwo ow wo
                    </Text>
                  </View>

                  <Text style={styles.productDetails}>Product Details</Text>
                  <Text style={styles.detailsDescription}>
                        mpdiiofdwio iowoi fw fiow ufiw uiw oie ep9o wuw  wu ou iowiu
                        o ewuewuwuw iwowewo wpoiwoiwppowowi wio i oiw hiwo ow wo
                    </Text>
    </View>

<Text style={{marginLeft: 9}}>Posted In</Text>
    <View style={styles.map}>
      <Text>Map</Text>
    </View>

    <Text style={styles.loremIpsum2}>Fresh Recommendations</Text>
  
  <View style={styles.scrollAreaStack}>
          <View 
             style={styles.scrollArea_contentContainerStyle}>
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

 <View style={styles.PersonInfo}>
 <View style={styles.ramanOsmanStack}>
                    <Text style={styles.ramanOsman}>Raman Osman</Text>
                    <Text style={styles.loremIpsum1}>
                      Member since Nov 2019
                    </Text>
                  </View>

                  
                  <View style={styles.cupertinoButtonInfoRow}>
                    <CupertinoButtonInfo
                      style={styles.cupertinoButtonInfo}
                    ></CupertinoButtonInfo>
                    <Icon name="phone" style={styles.icon}></Icon>
                    <Text style={styles.loremIpsum}>(0770) 144-9277</Text>
                  </View>
 </View>

    </View>
</>

  )}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    map: {
      width: "95%",
      height: 186,
      backgroundColor: '#f2f2f2',
      marginLeft: 9,
      marginTop: 10,
    },

    Profilerect: {
        width: "50%",
        height: 186,
        backgroundColor: '#333',
        marginLeft: 9,
        marginTop: 10,
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
      ramanOsmanStackColumn: {
        width: "100%",
        marginLeft: 3,
      },
      ramanOsmanStack: {
        width: "100%",
        height: 44,
        marginLeft: 9,
    fontFamily: 'Montserrat-Medium',
      },
      ramanOsman: {
        top: 0,
        left: 0,
        color: "rgba(16,108,199,1)",
        position: "absolute",
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 26,
      },
      productDetails: {
        color: "#333",
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 9,
        
        fontFamily: 'Montserrat-Medium',
      },
      details: {
        color: "#333",
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 26,
        marginTop: 16,
        marginLeft: 9
      },
      detailsDescription: {
        color: "#555",
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 12,
        marginTop: 2,
        marginLeft: 9,
        marginBottom: 10,
      },
      
  loremIpsum2: {
    color: "rgba(0,0,0,1)",
    fontSize: 13,
    marginLeft: 10,
    fontFamily: 'Montserrat-Medium',
  },
  loremIpsum1: {
    color: "rgba(0,0,0,1)",
    fontSize: 13,
    marginLeft: 1,
    marginTop:  25,
    fontFamily: 'Montserrat-Medium',
  },
  
  scrollAreaStack: {
    width: '100%',
  },
  scrollArea_contentContainerStyle: {
    top: 4,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 10,
  },
  priceArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',

    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    padding: 9,
    marginBottom:3,
    marginLeft: 9,
  },
  price: {
    color: "rgba(21,97,195,1)",
    fontSize: 13,
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


      slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        height: 100,
        width: 100,
        backgroundColor: 'red'
    },
    slide1: {
        backgroundColor: "rgba(20,20,200,0.3)"
    },
    slide2: {
        backgroundColor: "rgba(20,200,20,0.3)"
    },
    slide3: {
        backgroundColor: "rgba(200,20,20,0.3)"
    },
})
  
export default ProductView;
