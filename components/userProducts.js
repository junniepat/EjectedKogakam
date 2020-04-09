import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';


import axios from 'axios'

function UserProducts(props) {

  const [data, setData] = useState({ products: [] });
  const [dataImg, setDataImg] = useState({ images: [] });

  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'get_user', {
          headers: {
            app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
          }
        }
      ); 
      setData(result.data.successData.user);
     console.warn( 'imae', result.data.successData.user.products)
     console.warn(data.products, 'prod')
    };



    const fetchImg = async () => {
      const result = await axios.get(
        'https://kogakam.com/api/v1/get_all_products', {
          headers: {
            app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
          }
        }
      );
      setDataImg([result.data.successData.products]);
     
    };

    fetchImg();
    fetchData();
  }, []);
 
  console.warn('img', data.products['id']);

  return (
    <>
      <View style={styles.scrollAreaStack}>
    <View style={styles.scrollArea_contentContainerStyle}>
    <ActivityIndicator size="large"/>
    {data.products.map((item, index) => (
      <>
    
           <View style={styles.materialCard}>
<TouchableOpacity  key={index} style={styles.materialCard1} onPress={()=>{props.navigation.push('ProductView', {
  itemId: item.id,
})}}>
<View>

 
  <Image
    source={{uri: `${'https://kogakam.com/storage/app/products/'+ item.images[0].path}` }} 
    resizeMode="cover"
    style={styles.cardItemImagePlace}
  ></Image> 



  <View style={styles.titleStyleStack}>
    <Text style={styles.titleStyle}>{item.currency} {item.price}</Text>
    <Text style={styles.subtitleStyle}>{item.title} </Text>
  </View>
  <View style={styles.locationRow}>
   
    <Text style={styles.location}>  
    <Ionicons name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} size={12} color="#555" style={{marginRight: 6,}} />
{item.location.substring(0,17)}</Text>
    

    <Text style={styles.loremIpsum}>23 Hrs</Text>
  </View>
</View>
</TouchableOpacity>
</View>



</>

      ))}
      </View>
      </View>

    </>
   );
}

const styles = StyleSheet.create({
  container: {
    top: 30,
    left: 3,
    right: 10,
    width: "49%",
    height: 185,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  scrollArea_contentContainerStyle: {
    top: 4,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 10,
  },


  scrollAreaStack: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },

  materialCard: {
    top: 30,
    left: 3,
    right: 10,
    width: "49%",
    height: 205,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  
  materialCard1: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderColor: "#CCC",
    borderWidth: 1,

    overflow: "hidden",
    paddingBottom: 5,
    marginBottom: 5,
    
    width: '100%',
    flex: 1
  },

  cardItemImagePlace: {
    borderRadius: 2,
    height: 135,
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
});

export default UserProducts;
