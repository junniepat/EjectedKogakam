import React, { Component, useState, useEffect} from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import MaterialSearchBar1 from "../components/MaterialSearchBar1";
import { Ionicons } from '@expo/vector-icons';

import MaterialCard5 from "../components/MaterialCard5";
import moment from 'moment';
import axios from 'axios'

function ProductsPage(props) {

   
  const [data, setData] = useState({ products: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://kogakam.com/api/v1/get_cats_products/${props.navigation.getParam('id')}`
      );
      setData(result.data.successData);
    };
    fetchData();
  }, []);



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
            <Text style={styles.button}>    
            <Ionicons name={Platform.OS === 'ios' ? 'ios-funnel' : 'md-funnel'} size={12}  style={{marginRight: 6,marginLeft: 6, paddingLeft: 6,}} /></Text>
          </TouchableOpacity>
       </View>

        <ScrollView
        style={styles.container}>
 <View style={styles.scrollAreaStack}>
         <View 
            style={styles.scrollArea_contentContainerStyle}>


{data.products.map(item => (
      <>
          
<TouchableOpacity  key={item.id} style={styles.materialCard5}  onPress={()=>{props.navigation.push('ProductView', 
{
  itemId: item.id,
})}}>
<View>
  

<Image
      source={{uri: `https://kogakam.com/storage/app/products/${item.images[0] && item.images[0].path}`}} 
      resizeMode="cover"
      style={styles.cardItemImagePlace}
    ></Image>

  

  <View style={styles.titleStyleStack}>
    <Text style={styles.titleStyle}>{item.currency} {item.price}</Text>
    <Text style={styles.subtitleStyle}>{item.title}</Text>
  </View>
  <View style={styles.locationRow}>
   
    <Text style={styles.location}>  
    <Ionicons name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} size={12} color="#555" style={{marginRight: 6,}} />
{item.location.substring(0,17)}</Text>
    

<Text style={styles.loremIpsum}>{moment.utc(item.created_at).local().format('LL')}</Text>
  </View>
</View>
</TouchableOpacity>

         </>
))}
              
                <View style={styles.adsContainer}>
                  <Text style={styles.adsText}>You can place your ads here</Text>
                  <Text style={styles.adsText1}>Sell your things in your community, its quick and easy. </Text>
                </View>

              
            </View>
        </View>
       
      
      </ScrollView>

 

    </View>
</>

  )}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
     
    details:{
      fontSize: 19,
      fontWeight: '700',
      fontFamily: 'Montserrat-Medium',
      textTransform: 'uppercase',
      marginLeft: 9
    },

  materialCard5: {
    top: 30,
    left: 3,
    right: 10,
    width: "49%",
    height: 185,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',



    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,

    overflow: "hidden",
    paddingBottom: 5,
    marginBottom: 5,

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
        fontSize: 12,
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
        fontFamily: 'Montserrat-Medium',
        height: 30
      },
      loremIpsum: {
        color: "rgba(0,0,0,1)",
        fontSize: 9,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 8,
        height: 30
      },
      locationRow: {
        height: 8,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 5,
        width: '82%'
      }
      
})
  
export default ProductsPage;
