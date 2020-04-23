


import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect, Fragment} from 'react';
import {
  StyleSheet, View, ScrollView, Alert,  Image, TouchableOpacity, Dimensions, Animated, Linking, Platform, ActivityIndicator
} from 'react-native';

import MaterialButtonWithVioletText from "../components/MaterialButtonWithVioletText";
import MaterialSearchBar from "../components/MaterialSearchBar";
import { List, ListItem, Text, Right, Button, Left, Thumbnail, Body  } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import moment from 'moment';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Overlay } from 'react-native-elements';

// import MapView from 'react-native-maps';



export default function ProductView(props) {
  const [activity, setactivity] = useState(true)
  const [data, setData] = useState({ product: [], related_proucts: [] });
  const [Adjoindata, setAdjoinData] = useState({ make: [], user: [], images: [] });
const [latitude, setlatitude] = useState('') 
const [longitude, setlongitude] = useState('') 

const dialNumber= (item)=>{
  
   let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber =  `tel:${item}`;
  }
  else {
    phoneNumber = `telprompt:${item}`;
  }
  Linking.openURL(phoneNumber);

}


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `product_detail/${props.navigation.getParam('itemId')}`
      );
     
      setlatitude(result.data.successData.product.lat)
      setlongitude(result.data.successData.product.lng)
      setData(result.data.successData);
      setactivity(false)
    };
    fetchData();


    const fetchAdjoinData = async () => {
      const result = await axios.get(
        `product_detail/${props.navigation.getParam('itemId')}` 
      );
     
      setAdjoinData(result.data.successData.product);
    };
    fetchAdjoinData();


  }, []);


  async function viewProduct(item) {
    setactivity(true)
  
     let result = await axios.get(
        `product_detail/${item}`
      );
      setData(result.data.successData);
      setactivity(false)
   
      let resultTwo = await axios.get(
      `product_detail/${item}` 
    );
    setAdjoinData(resultTwo.data.successData.product);
  
  }
  


        const checkRadio = (value) => {
          setReason(value)
        }
      
        const [menuVisible, setMenuVisible] = React.useState(false);

        const toggleMenu = () => {
          setMenuVisible(!menuVisible);
        };
      
        const renderMenuAction = () => (
          <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
        );

       
      
const BackIcon = (props) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#fff" style={{textShadowColor: "#555",
  textShadowRadius: 1,}} />
);


const MenuIcon = (props) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'} size={20} color="#fff" style={{textShadowColor: "#555",
  textShadowRadius: 1,}} />
);

        const renderRightActions = () => (
          <React.Fragment>
            <TopNavigationAction />
          </React.Fragment>
        );

        const renderBackAction = () => (
          <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.goBack()}/>
        );

  return (
   

    <View style={styles.container}>
 

<View style={styles.bgGradient}>

<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingLeft: 20, paddingRight: 20}}>

</View>
<TopNavigation
style={{backgroundColor: 'transparent', textShadowColor: "red",
textShadowRadius: 1,
textShadowRadius: 10}}
        alignment='center'
        title=''
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
    

</View>


<ScrollView>
{activity && <ActivityIndicator size='large'/>}
<ScrollView horizontal scrollEventThrottle={200} style={{marginTop: -20}}
     showsHorizontalScrollIndicator={false}
      pagingEnabled
 onScroll={
  Animated.event(
    [{ nativeEvent: { contentOffset: { x: 10 } } }]
  )
}

decelerationRate="fast"
pagingEnabled>

{Adjoindata && Adjoindata.images.map((item, index) => (
  <Fragment key={index}>
<Image
    source={{uri: `${'https://kogakam.com/storage/app/products/'+ item.thumb}` }} 
    resizeMode="cover"
    style={styles.SliderImage}
  ></Image>
  
 
</Fragment>

)
  )}

</ScrollView>   







<View style={styles.ramanOsmanStackColumn}>
            

            
            <List>                  
           <ListItem style={styles.priceArea}>
             <View style={{width: '100%', flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'space-between',}}>
                 <View>
                   <Text style={styles.price}>{data.product['currency']} {data.product['price']}</Text>
                   <Text style={{alignSelf: 'flex-start', color: "#0F52BA",
                     fontSize: 15, alignSelf: 'flex-start',
                     fontFamily: 'Montserrat-Medium',}}>{Adjoindata.make && Adjoindata.make['title']}</Text>
                   {/* <Text style={styles.headers}>{data.product['location']}</Text> */}
                 </View>

                 <View>
 
                 <Text style={{fontSize:9, marginTop: 10}}>{moment.utc(data.product['updated_at']).local().format('LL')} </Text>
                 </View>
             </View>


           <Left>
          
           
           {/* <Text style={{fontSize:12, marginTop: 7, alignSelf: 'flex-start' }}>Viewed {data.product.viewed} times</Text> */}

          </Left>
          
           </ListItem>
           </List>


                 <View style={styles.rect2}>
                   <Text style={styles.headers}>Description</Text>
                   <Text style={styles.detailsDescription}>
                   {data.product['description']}
                   {'\n'}
                   </Text>
                 </View>

         <List style={{ borderColor: '#f2f2f2', borderBottomWidth: 3, borderStyle: 'solid',}}>
           <ListItem avatar onPress={() => {props.navigation.push('userProfile', 
           { itemId: data.product.user_id, })}}>
             <Left>
               <Thumbnail source={{ uri: `https://kogakam.com/storage/app/ProductView_images/${Adjoindata.user['image']}` }} />
             </Left>
             <Body>
               <Text style={{color: '#0F52BA', textTransform: 'capitalize'}}> {Adjoindata.user && Adjoindata.user['name']}</Text>
               <Text note> Member since {moment.utc(data.product['created_at']).local().format('LL')} </Text>
         
                   <Text note style={{color: 'dodgerblue', fontSize: 12, paddingLeft: 4}}>See Profile</Text>
            
             </Body>
             <Right>
             <Text style={{alignSelf: 'flex-end', marginTop: 21}}><Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-dropright'} size={27} color="#555" style={{marginRight: 6,}} /></Text>
             </Right>
            
           </ListItem>
         </List>


   </View>
      
 <Text  style={styles.headers}>Ad posted at</Text>
     <View style={styles.map}>

{/* {data.product['lat'] === '' ? <Text>Map Unavailable</Text>:   <MapView 
     initialRegion={{
      latitude:  data.product['lat'],
      longitude: data.product['lng'], 
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}

    style={styles.mapStyle} />} */}
   


    </View>



<List>                  
             <ListItem style={styles.priceArea}>
               <View style={{width: '100%', flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'space-between',}}>
                   <View>
                  
                     <Text style={{alignSelf: 'flex-start', color: "#0F52BA",
                      fontSize: 15, alignSelf: 'flex-start',
                      fontFamily: 'Montserrat-Medium',}}>AD ID: {data.product['id']}</Text>
                    {/* <Text style={styles.headers}>{data.product['location']}</Text> */}
                  </View>

                  <View>
  
                  </View>
              </View>


            <Left>
           
            
            {/* <Text style={{fontSize:12, marginTop: 7, alignSelf: 'flex-start' }}>Viewed {data.product.viewed} times</Text> */}

           </Left>
           
            </ListItem>
            </List>



    


             <View >
 <Text style={styles.headers}>Related Ads</Text>

 <ScrollView horizontal  scrollEventThrottle={10}
          pagingEnabled style={{height: 240, paddingBottom: 20}}>
{data.related_proucts.map((item, index) => (
      <Fragment key={index}>
   
   <View style={styles.materialCard} >
<TouchableOpacity   style={styles.materialCard5}  onPress={()=> viewProduct(item.id)}>
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
    &nbsp; {item.state}</Text>
    

    <Text style={styles.loremIpsum}>{moment.utc(data.product['created_at']).local().format("YYYY-MM-DD")} </Text>
  </View>
</View>
</TouchableOpacity>
</View>

</Fragment>
))}
          </ScrollView>
 </View>




</ScrollView>

<View style={styles.PersonInfo}>

<Left>
<TouchableOpacity style={styles.cupertinoButtonInfo} onPress={() => dialNumber(Adjoindata.user['phone'])}>
    <Text style={styles.caption}><Ionicons name={Platform.OS === 'ios' ? 'ios-call' : 'md-call'} size={22} color="#fff" style={{marginRight: 12,}} /> Call</Text>
  </TouchableOpacity>
</Left>

<Right>
  <TouchableOpacity style={styles.cupertinoButtonInfo} onPress={() => {props.navigation.push('inboxViewTwo', 
  { userID: Adjoindata.user['id'], productId: data.product['id'] })}}>
   <Text style={styles.caption}><Ionicons name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} size={22} color="#fff" style={{marginRight: 12,}} /> Chat</Text>
 </TouchableOpacity>
</Right>
</View>

  </View>
    
  );
}

ProductView.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: '100%',
    height: 190,
  },
  PersonInfo:{
      height: 50,
      width: "100%",
      flexDirection: 'row',
      paddingRight: 5,
      paddingLeft:5
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
    marginBottom: 20
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
    height: 26,
    marginTop: 25,
    marginLeft: 6,

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
    headers: {
      color: "#0F52BA",
      fontSize: 15,
      lineHeight: 26,
      alignSelf: 'flex-start',
      marginLeft: 11,
      
      fontFamily: 'Montserrat-Medium',
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
  borderColor: '#f2f2f2',
  borderBottomWidth: 3,
  borderTopWidth: 1,
  borderStyle: 'solid',

  width: '95%',

  marginBottom:3,
  marginLeft: 9,
},
rect2: {
  borderColor: '#f2f2f2',
  borderBottomWidth: 3,
  borderStyle: 'solid',
    },
price: {
  color: "rgba(21,97,195,1)",
  fontSize: 15,
  fontWeight: 'bold',
  alignSelf: 'flex-start'
},
materialCard:{
  top: 10,
  marginRight: 10,
  marginBottom: 10,
  left: 3,
  right: 10,
  width: 190,
  height: 205,
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
  
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
},
materialCard5: {
  top: 5,
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


    cupertinoButtonInfoRow: {
      height: 33,
      flexDirection: "row",
      marginTop: 7,
      marginLeft: 9,
    },
    cupertinoButtonInfo: {
      width: '98%',
      height: 42,
      marginTop: 11,
      paddingTop: 6,
      paddingBottom: 6, 
      paddingLeft: 14,
      backgroundColor: "#2B65EA",
      fontFamily: 'Montserrat-Medium',
    },
    caption: {
      color: "#fff",
      fontSize: 18,
      textTransform: 'uppercase',
      alignSelf: 'flex-start',
      fontFamily: 'Montserrat-Medium',
      alignContent: 'flex-start'
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
      color: "#555",
      fontSize: 7,
      marginTop: -4,
      fontWeight: 'bold',
      width: 45,
      fontFamily: 'Montserrat-Medium',
      lineHeight: 26,
     
    },


    cardItemImagePlace: {
      borderRadius: 2,
      height: 110,
      backgroundColor: "#333",
      width: undefined,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },

    SliderImage: {
      marginTop: -20,
      marginRight: 10,
      marginBottom: 10,

      right: 5,
      width: 420,
      height: 235,
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
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
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: 'space-between', 
      marginLeft: 10,
      marginRight: 20,
      marginBottom: 5,
      width: '92%'
    },


})