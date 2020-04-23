import React, { Component, useState, useEffect, Fragment } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { Button, ButtonGroup } from '@ui-kitten/components';

import axios from 'axios'


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function UserProducts(props) {
  const [activity, setactivity] = useState(true)
  const [data, setData] = useState({ products: [] });
  const [dataImg, setDataImg] = useState({ images: [] });
  const [refreshing, setRefreshing] = React.useState(false);

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
      setactivity(false)
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


  const fetchData = async () => {
    const result = await axios.get(
      'get_user'
    ); 
    setData(result.data.successData.user);
    setactivity(false)
    
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

 
  const StarIcon = (props) => (
    <Ionicons name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} size={12} color="#fff" style={{marginRight: 6,}} />
  );

  const DeleteIcon = (props) => (
    <Ionicons name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'} size={12} color="#fff" style={{marginRight: 6,}} />
  );


  
  async function productStatus(id, status) {
    const formData = new FormData();
    formData.append('product_id', id);
    formData.append('status', status);
    
        await axios.post(
          `change_product_status`, formData
        )
        .then(response => 
          { 
            fetchData();
            // onSuccess(response);
          })
      .catch(error => {
        // setLoading(false)
        // setError(error.message)
      })
      
    }


    async function productDelete(id) {

          const formData = new FormData();
          formData.append('product_id', id);
          
              await axios.post(
                `delete_product`, formData
              )
              .then(response => 
                { 
                  fetchData();
                  // onSuccess(response);
                })
            .catch(error => {
           
              // setLoading(false)
              // setError(error.message)
            })
            
          }


  return (
    <>
    <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <View style={styles.scrollAreaStack}>
    <View style={styles.scrollArea_contentContainerStyle}>
    {activity && <ActivityIndicator size='large'/>}
    {data.products.map((item, index) => (
      <Fragment key={index}>
    
           <View style={styles.materialCard}>
<TouchableOpacity   style={styles.materialCard1}>
<View>

 
<Image
      source={{uri: `https://kogakam.com/storage/app/products/${item.images[0] && item.images[0].path}`}} 
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
&nbsp; {item.state || "No location"}</Text>
    

    <Text style={styles.loremIpsum}>{moment.utc(item.created_at).local().format('LL')}</Text>
  </View>
</View>

    <ButtonGroup style={{alignSelf: 'center', marginTop:5}}>
      <Button accessoryLeft={StarIcon}/>
      <Button onPress={() => productDelete(item.id)} status='danger' accessoryLeft={DeleteIcon}/>
      {item.status === 'pending' ? ( 
            <Button onPress={() => productStatus(item.id, 'sold')}>{item.status}</Button>) : (
              <Button onPress={() => productStatus(item.id, 'pending')}>{item.status}</Button>
          )}
      
    </ButtonGroup>
</TouchableOpacity>
</View>



</Fragment>

      ))}
      </View>
      </View>
      </ScrollView>
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
    height: 260,
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
  },

  cardItemImagePlace: {
    height: 115,
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

export default UserProducts;
