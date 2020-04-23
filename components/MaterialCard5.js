import React, { Component, useState, useEffect, Fragment } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import moment from 'moment'
import axios from 'axios'

function MaterialCard5(props) {

  const [data, setData] = useState({ products: [] });
  const [dataImg, setDataImg] = useState({ main_image: [] });

  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'get_all_products', {
          headers: {
            app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
          }
        }
      );
      setData(result.data.successData);
     
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
 

  return (
    <>
    {data.products.map((item, index) => (
      <Fragment  key={index}>


        
<TouchableOpacity  key={index} style={[styles.container, props.style]}  onPress={()=>{props.navigation.navigate('ProductView', {
  itemId: item.id,
})}}>
  
<View>

 
      <Image
      source={{uri: `https://kogakam.com/storage/app/products/${item.images[0] && item.images[0].thumb}`}} 
      resizeMode="cover"
      style={styles.cardItemImagePlace}
    ></Image>
    

 

  <View style={styles.titleStyleStack}>
    <Text style={styles.titleStyle}>{item.currency}  {item.price}</Text>
    <Text style={styles.subtitleStyle}>{item.title} </Text>
  </View>
  <View style={styles.locationRow}>
   
    <Text style={styles.location} numberOfLines={1}  ellipsizeMode="tail">  
    <Ionicons name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} size={12} color="#555" style={{marginRight: 12,}} />
    &nbsp;
{item.state}</Text>
    

    <Text style={styles.loremIpsum}>{moment.utc(item.created_at).local().format("YYYY-MM-DD")}</Text>
  </View>
</View>
</TouchableOpacity>

</Fragment>

      ))}

    </>
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

    width: '100%'
  },
  cardItemImagePlace: {
    height: 75,
    flex: 1,
    backgroundColor: "#f2f2f2",
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

export default MaterialCard5;
