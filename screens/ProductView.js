import React,  {useState, useEffect, Fragment}  from "react";
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

import CupertinoButtonInfo from "../components/CupertinoButtonInfo";
import Icon from "react-native-vector-icons/Feather";

import MaterialSearchBar1 from "../components/MaterialSearchBar1";


import MaterialCard5 from "../components/MaterialCard5";


import { Ionicons } from '@expo/vector-icons';


import axios from 'axios'

function ProductView(props) {

   
  const [data, setData] = useState({ product: [], related_proucts: [] });
  const [Adjoindata, setAdjoinData] = useState({ make: [], user: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `product_detail/${props.navigation.getParam('itemId')}`
      );
      setData(result.data.successData);
    };
    fetchData();


    const fetchAdjoinData = async () => {
      const result = await axios.get(
        `product_detail/${props.navigation.getParam('itemId')}` 
      );
      console.warn(result.data.successData.product)
      setAdjoinData(result.data.successData.product);
    };
    fetchAdjoinData();
  }, []);



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

            
             </View>
            
           
             <Text style={styles.title}>{Adjoindata.make['title']} </Text> 
              <View style={styles.priceArea}>
                <Text style={styles.price}>{data.product['currency']} {data.product['price']}</Text>
                <Text><Ionicons name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'} size={12} color="#555" style={{marginRight: 6,}} /></Text>
                
              </View>
              <Text style={{marginLeft: 9, fontSize:9}}>23 mins ago</Text>

                  <View style={styles.rect2}>
                    <Text style={styles.details}>Details</Text>
                    <Text style={styles.detailsDescription}>
                    {data.product['description']}
                    {'\n'}
                    Viewed {data.product.viewed} times
                    </Text>
                  </View>

                  <Text style={styles.productDetails}>Product Details</Text>
                  <Text style={styles.detailsDescription}> ow wo
                    </Text>
    </View>

<Text style={{marginLeft: 9}}>Posted In</Text>
    <View style={styles.map}>
      <Text>Map</Text>
    </View>

    <Text style={styles.loremIpsum2}>Related Products</Text>
  
  <View style={styles.scrollAreaStack}>
          <View 
             style={styles.scrollArea_contentContainerStyle}>

{data.related_proucts.map(item => (
      <>
   
 
           
<TouchableOpacity  key={item.id} style={styles.materialCard5}  onPress={()=>{props.navigation.navigate('ProductView', 
{
  itemId: id,
})}}>
<View>
  <Image
    source={require("../assets/images/slide3.jpg")}
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
    

    <Text style={styles.loremIpsum}>23 Hrs</Text>
  </View>
</View>
</TouchableOpacity>


</>
))}
          

        </View>
         </View>
        
    </ScrollView>

 <View style={styles.PersonInfo}>
 <View style={styles.ramanOsmanStack}>

 

       <TouchableOpacity onPress={() => {props.navigation.push('userProfile', 
          {
            itemId: data.product.user_id,
          })}}>
          <Text style={styles.ramanOsman}>   {Adjoindata.user['name']} </Text>
      </TouchableOpacity>




                    <Text style={styles.loremIpsum1}>
                      Member since  {Adjoindata.user['created_at']}
                    </Text>
                  </View>

                  
                  <View style={styles.cupertinoButtonInfoRow}>
                    <CupertinoButtonInfo
                      navigation={props.navigation}
                      style={styles.cupertinoButtonInfo}
                    ></CupertinoButtonInfo>
                    <Icon name="phone" style={styles.icon}></Icon>
                    <Text style={styles.loremIpsum}>{data.product['phone']}</Text>
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
    title:{
      color: "rgba(16,108,199,1)",
      fontSize: 17,
      fontFamily: 'Montserrat-Medium',
      lineHeight: 26,
      marginLeft: 9
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
    marginTop:  3,
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

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
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


    
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,

    overflow: "hidden",
    paddingBottom: 5,
    marginBottom: 5,

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
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





      

      cardItemImagePlace: {
        height: 75,
        flex: 1,
        backgroundColor: "#333",
        width: undefined,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
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
   
      locationRow: {
        height: 8,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 5,
        width: '82%'
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
