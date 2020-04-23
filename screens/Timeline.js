

import React , {useState, useEffect} from 'react';
import { Left, Body, Right, Switch, Title  } from 'native-base';
import axios from 'axios'
import {TouchableOpacity, StyleSheet, View, Image, ScrollView, Text, ActivityIndicator} from 'react-native'
import { Ionicons,  } from '@expo/vector-icons'
import { Button, Card, Layout,  } from '@ui-kitten/components';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';



export default function Timeline(props) {
    const [data, setData] = useState({ cats: [] });
    const [activity, setactivity] = useState(true)
    
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            'get_all_cats'
          );  
          setData(result.data.successData);
          setactivity(false)
        };
        fetchData();
    
      
    
      }, []);


      const BackIcon = (props) => (
        <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#555" style={{marginRight: 6,}} />
      );
      
      const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.goBack()}/>
      );
      
    return (
      <Layout styles={{backgroundColor: '#f2f2f2'}}>
      <View style={{height: 50,  marginTop: 25, lineHeight: 50, flexDirection: 'row', borderBottomColor: '#f2f2f2', borderBottomWidth: 1, borderStyle: 'solid'}}
      >
<TopNavigation
    accessoryLeft={BackAction}
    title='What are you offering'
  />

 </View>
     
    
        {activity && <ActivityIndicator size='large'/>}
        <ScrollView>
        <View style={{flexDirection: 'row', width: '96%', paddingLeft: 17, paddingBottom: 160, paddingRight:8, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
      {data.cats.map((item, index) => (
     
     <Card key={index} style={{width: '48%', marginBottom: 6}}>
        <TouchableOpacity icon  onPress={() => {
    props.navigation.push('LinksItems', {
      name: item.title,
      itemId: item.id
    })}} >
          
            
<Image
 source={{uri: 'https://www.kogakam.com/storage/app/cat_images/'  + `${item.image}` }} 
 resizeMode="cover"
 style={{width: 40, height: 40, alignSelf: 'center'}}
></Image> 

         
          <View style={{paddingBottom: 8, paddingTop: 8}}>
            <Text style={styles.mobilePhones2}>{item.title}</Text>
          </View>
         
        </TouchableOpacity>
        </Card>
  
        ))}
  
   
          </View>
          </ScrollView>

      </Layout>
    );
  }

  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingRight: 10,
    paddingLeft: 10
  },
  scrollArea: {
    top: 0,
    left: 9,
    width: 358,
    height: 485,
  
    position: "absolute",
    opacity: 0
  },
  scrollArea_contentContainerStyle: {
    width: 358,
    height: 471
  },
  scrollAreaStack: {
    marginTop: 10,
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
alignContent:'center',
  },

  chooseACategory: {
    color: "#121212",
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
    marginTop: 9,
    marginLeft: 24,
    fontSize: 17,
    },
ImageIcon: {
  width: 44, 
  height: 44,
  alignSelf: 'center'
},
  button2: {
    shadowColor: "#f2f2f2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4.65,
    
    elevation: 6,
    borderRadius: 5,
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    overflow: "hidden",
    paddingBottom: 5,
    paddingTop: 30,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    width: '44%',
    height: 140,
    fontSize: 10,
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    marginTop: 24,
  },
  mobilePhones2: {
    color: "#121212",
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
    textAlign: 'center',
  },
  button3: {
    top: 27,
    left: 203,
    width: 140,
    height: 118,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(230,447,447,1)"
  },
  
});
