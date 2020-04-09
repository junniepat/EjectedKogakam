import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import MaterialBasicFooter from "../components/MaterialBasicFooter";
import MaterialButtonPrimary2 from "../components/MaterialButtonPrimary2";
import MaterialSwitch from "../components/MaterialSwitch";
import MaterialSearchBar from "../components/MaterialSearchBar";
import AdsTabs from '../components/AdsTabs'


import axios from 'axios'

export default function AdsScreen(props) {
  
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
    <View style={styles.container}>
    <MaterialSearchBar
        style={styles.materialSearchBar1}
      ></MaterialSearchBar>

    <ScrollView>
     {data.products !== '' ?  <AdsTabs/> : <>

       <Image 
          source={require("../assets/images/ads.png")}
          style={styles.image}
        ></Image>
     <Text style={styles.products5}>Adverts</Text>
     
    <Text style={styles.thereAreNoAds}>There are no Adverts
      If you want to post something you can do it now.
    </Text>

    <MaterialButtonPrimary2 name='Post Ads' link="Timeline"
      style={styles.materialButtonPrimary2}
    ></MaterialButtonPrimary2>
         </>}
   


     

       
    
    </ScrollView>
    </View>
  );
}

AdsScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1
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

  image: {
    width: '60%',
    height: 250,
    marginLeft: '15%' ,
    marginRight: '15%' ,
  },
  materialButtonPrimary2: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    height: 36,
  },
  materialSwitch: {
    alignSelf: 'flex-end'
  },
  products5: {
    top: 14,
    color: "#121212",
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center'
  },

  thereAreNoAds: {
    color: "#121212",
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
});
