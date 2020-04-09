import React,  {useState, useEffect, Fragment}  from "react";
import { StyleSheet, View, ScrollView,  Image, TouchableOpacity, Dimensions, Animated, Linking, Platform } from "react-native";
import { List, ListItem, Text, Right, Button, Left, Thumbnail, Body  } from 'native-base';
import MapView from 'react-native-maps';

import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import moment from 'moment'

function ProductView(props) {

   
  const [data, setData] = useState({ product: [], related_proucts: [] });
  const [Adjoindata, setAdjoinData] = useState({ make: [], user: [], images: [] });

  
async function dialNumber(item) {
  
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
      setData(result.data.successData);
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

  



  return (
<>
<View style={styles.container}>
 


<LinearGradient
          colors={['rgba(0, 0, 0, .8)', 'rgba(0, 0, 0, .3)', 'rgba(0, 0, 0, .1)']}
          style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10}}>
         
         
          <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>
 <Text style={{marginTop: 20}}><Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={27} color="#fff" style={{marginRight: 6,}} /></Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>
 <Text style={{marginTop: 20}}><Ionicons name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'} size={27} color="#fff" style={{marginRight: 6,}} /></Text>
        </TouchableOpacity>

        </LinearGradient>
            

<ScrollView>
<View style={styles.ramanOsmanStackColumn}>
            
            <View>

 
 <ScrollView horizontal scrollEventThrottle={10} 
     showsHorizontalScrollIndicator={false}
      pagingEnabled
 onScroll={
  Animated.event(
    [{ nativeEvent: { contentOffset: { x: 10 } } }]
  )
}>
{Adjoindata && Adjoindata.images.map((item, index) => (
  <>
<Image
    source={{uri: `${'https://kogakam.com/storage/app/products/'+ item.path}` }} 
    resizeMode="cover"
    style={styles.SliderImage}
  ></Image>
  
 
</>

)
  )}

 

</ScrollView>        
            
             </View>
            
             <List>                  
            <ListItem style={styles.priceArea}>
              <View style={{width: '100%', flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'space-between',}}>
                  <View>
                    <Text style={styles.price}>{data.product['currency']} {data.product['price']}</Text>
                    <Text style={{alignSelf: 'flex-start', color: "#0F52BA",
                      fontSize: 15, alignSelf: 'flex-start',
                      fontFamily: 'Montserrat-Medium',}}>{Adjoindata.make['title']}</Text>
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
                <Thumbnail source={{ uri: `https://kogakam.com/storage/app/profile_images/${Adjoindata.user['image']}` }} />
              </Left>
              <Body>
                <Text style={{color: '#0F52BA', textTransform: 'capitalize'}}> {Adjoindata.user['name']}</Text>
                <Text note> Member since {moment.utc(data.product['created_at']).local().format('LL')} </Text>
                <TouchableOpacity>
                    <Text note style={{color: 'dodgerblue', fontSize: 12, paddingLeft: 4}}>SEE PROFILE</Text>
                </TouchableOpacity>
              </Body>
              <Right>
              <Text style={{alignSelf: 'flex-end', marginTop: 21}}><Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-dropright'} size={27} color="#555" style={{marginRight: 6,}} /></Text>
              </Right>
             
            </ListItem>
          </List>


    </View>

<Text  style={styles.headers} >Ad posted at</Text>
    <View style={styles.map}>
    <MapView 
     initialRegion={{
      latitude: data.product.lat,
      longitude: data.product.lng,
    }}
    style={styles.mapStyle} />
    </View>

    

    <List style={{ borderColor: '#f2f2f2', borderBottomWidth: 3,  borderTopWidth: 3, borderStyle: 'solid',}}>
            <ListItem onPress={() => {props.navigation.push('userProfile', 
            { itemId: data.product.user_id, })}}>
              <Left>
                <Text style={{fontSize: 13,}}>AD ID: {data.product['id']}</Text>
              </Left>
  
              {/* <Right>
                <TouchableOpacity>
                  <Text style={{alignSelf: 'flex-end', fontSize: 12,color: '#0F52BA', width: 100, fontWeight: '700'}}>REPORT THIS AD</Text>
                </TouchableOpacity>
              </Right> */}
             
            </ListItem>
          </List>
  
  
  <View >
  <Text style={styles.headers}>Related Ads</Text>

<ScrollView horizontal  scrollEventThrottle={10}
          pagingEnabled style={{height: 240, paddingBottom: 20}}>
{data.related_proucts.map(item => (
      <>
   
   <View style={styles.materialCard}>
<TouchableOpacity  key={item.id} style={styles.materialCard5}  onPress={()=>{props.navigation.navigate('ProductView', 
{
  itemId: id,
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
    

    <Text style={styles.loremIpsum}>{moment.utc(data.product['created_at']).local().format("YYYY-MM-DD")} </Text>
  </View>
</View>
</TouchableOpacity>
</View>

</>
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
                <TouchableOpacity style={styles.cupertinoButtonInfo} onPress={() => {props.navigation.push('inboxView', 
                 { itemId: Adjoindata.user['id'], productId: data.product['id'] })}}>
                  <Text style={styles.caption}><Ionicons name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} size={22} color="#fff" style={{marginRight: 12,}} /> Chat</Text>
                </TouchableOpacity>
              </Right>
           
         


 </View>
 
    </View>
</>

  )}


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

        left: 3,
        right: 10,
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
  
export default ProductView;
