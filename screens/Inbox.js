import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  
  TouchableOpacity,
  View, AsyncStorage, ListView, ActivityIndicator } from 'react-native';
import { Container, Header, SwipeRow, Icon, Button, Badge, Tab, Tabs, TabHeading,  Left, Thumbnail, Body, Right,  List, ListItem, Text } from 'native-base';


import MaterialSearchBar from "../components/MaterialSearchBar";
import Services from "../components/services"
import { MonoText } from '../components/StyledText';
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";

import moment from 'moment'
import axios from 'axios'

export default function InboxScreen(props) {
  const [data, setData] = useState({ chats: [], unread_count: 0 });
  const [toks, setToks] = useState(null);
  const [InboxMessage, setInboxMessage] = useState(true)
  const [Notification, setNotification] = useState(false)

  const [NotificationData, setNotificationData] = useState([])
  const [activity, setactivity] = useState(true)

  const switchMessageTab = () => {
    setInboxMessage(true)
    setNotification(false)
  }


  const switchNotificatioTab = () => {
    setInboxMessage(false)
    setNotification(true)
  }
  

  useEffect(() => { 
   
    const fetchData = async () => { 
      const result = await axios.get(
        'https://kogakam.com/api/v1/get_chats'
      );  
      setData(result.data.successData);
    }; 
    fetchData();
    setactivity(false)
    console.warn(data, 'data')


    const fetchNotification = async () => { 
      const result = await axios.get(
        'https://kogakam.com/api/v1/read_notifications'
      );  
      setNotificationData(result.data.successData);
    };
    fetchNotification();
    setactivity(false)

    
 
  }, []);



  return (
    <View style={styles.container}>
        
      <MaterialSearchBar
        style={styles.materialSearchBar1}
        navigation={props.navigation}
      ></MaterialSearchBar>

     

<Tabs tabBarUnderlineStyle={{backgroundColor: '#0F52BA'}}>
          <Tab  heading={ <TabHeading style={{backgroundColor: '#fff'}}>
            <Text style={{color: '#0F52BA'}}>Inbox</Text>
            <Badge  style={{marginTop: 12, marginLeft: 19}}>
              <Text>{data.unread_count}</Text>
            </Badge></TabHeading>}>
          <>
             
          {activity && <ActivityIndicator size='large'/>}

             <View style={{flexDirection: 'row', marginTop: 4,
             flexWrap: 'wrap', justifyContent: 'space-between',}}>
              
                <View  style={{flexDirection: 'row',
             flexWrap: 'wrap', justifyContent: 'space-between',}}>
               
         
                    <TouchableOpacity style={styles.button}>
                     <Text>+ New</Text>
                   </TouchableOpacity>

         
                </View>
               </View>
         
                <ScrollView>
                <View style={styles.materialCardWithImageAndTitle1Stack}>
                  
                <List>
                {data.chats.map((item, index) => (
                <>
                <ListItem avatar  onPress={()=>{props.navigation.navigate('inboxView', {
         itemId: item.id,
         receiver_id: item.receiver_id
       })}}>
                     <Left>
                       <Thumbnail source={{ uri: `${'https://kogakam.com/storage/app/profile_images/' + item.receiver.image}`  }} />
                     </Left>
                     <Body>
                       <Text>{item.receiver.name} </Text>
                       <Text note>{item.last_message.message || item.last_message.file}</Text>
                     </Body>
                     <Right>
                       <Text note>{moment.utc(item.created_at).local().format('LLL')}</Text>
                     </Right>
                   </ListItem>
                  
             </>
              ))}
              </List>
       
           
                 </View>
         
                </ScrollView>
             
               </>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#fff'}}><Text style={{color: '#0F52BA'}}>Notifications</Text></TabHeading>}>
          {activity && <ActivityIndicator size='large'/>}
          {NotificationData && NotificationData.map((item) => (
            <>
              <Text> {item.id}</Text>

            </>
          ))}
          </Tab>
        </Tabs>

    </View>

  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      fontFamily: 'Montserrat-Medium',
    },
  
    materialSearchBar1: {
        width: "97%",
    height: 46,
    marginTop: 32,
    marginLeft: 6,

    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid'
      },
   
    button: {
        borderStyle: 'solid',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        borderRadius: 3,
        padding: 4,
        color: 'dodgerblue',
        marginRight: 10,
        alignSelf: 'flex-end',
        marginLeft: 20
    },
    
 
})


