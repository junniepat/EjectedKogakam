import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, AsyncStorage
} from 'react-native';


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

    console.warn(data, 'data')


    const fetchNotification = async () => { 
      const result = await axios.get(
        'https://kogakam.com/api/v1/read_notifications'
      );  
      setNotificationData(result.data.successData);
    };
    fetchNotification();

    
 
  }, []);



  return (
    <View style={styles.container}>
        
      <MaterialSearchBar
        style={styles.materialSearchBar1}
        navigation={props.navigation}
      ></MaterialSearchBar>

      <View style={styles.navBar}>
        <TouchableOpacity  style={styles.navBarBorder} onPress={()=> switchMessageTab()}>
          <Text style={styles.navBarItems}>Inbox</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.navBarBorder} onPress={()=> switchNotificatioTab()}>
          <Text style={styles.navBarItems}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {Notification && (
        <>
             <View style={{flexDirection: 'row', marginTop: 4,
      flexWrap: 'wrap', justifyContent: 'space-between',}}>
        <Text style={styles.inbox}>Notification 
         </Text>
  
         <View  style={{flexDirection: 'row',
      flexWrap: 'wrap', justifyContent: 'space-between',}}>
         <View style={styles.notification}>
             <Text style={styles.textnotif}>{data.unread_count}</Text>
             </View>
  
  
         </View>
        </View>


        <View>
          {NotificationData && NotificationData.map((item) => (
            <>
              <Text> {item.id}</Text>

            </>
          ))}
        </View>



        </>
      )}


      {InboxMessage  && (
        <>
             
      <View style={{flexDirection: 'row', marginTop: 4,
      flexWrap: 'wrap', justifyContent: 'space-between',}}>
        <Text style={styles.inbox}>Inbox 
         </Text>
  
         <View  style={{flexDirection: 'row',
      flexWrap: 'wrap', justifyContent: 'space-between',}}>
         <View style={styles.notification}>
             <Text style={styles.textnotif}>{data.unread_count}</Text>
             </View>
  
             <TouchableOpacity style={styles.button}>
              <Text>+ New</Text>
            </TouchableOpacity>
  
         </View>
        </View>
  
         <ScrollView>
         <View style={styles.materialCardWithImageAndTitle1Stack}>
           

         {data.chats.map((item, index) => (
         <>
      <TouchableOpacity   onPress={()=>{props.navigation.navigate('inboxView', {
  itemId: item.id,
  receiver_id: item.receiver_id
})}}>
      <View style={styles.cardBody}>
      <Image
          source={require("../assets/images/slide3.jpg")}
          style={styles.cardItemImagePlace}
        ></Image>
        <View style={styles.bodyContent}>
          <View style={styles.cardBody}>
          <Text style={styles.titleStyle}>{item.receiver.name} </Text>
<Text style={styles.time}>{moment(item.created_at,  "YYYYMMDD").fromNow()}</Text>
          </View>
<Text style={styles.subtitleStyle}>{item.last_message.message || item.last_message.file}</Text>
          
        </View>
    
      </View>
      </TouchableOpacity>
    
    
      </>
       ))}


    
          </View>
  
         </ScrollView>
      
        </>
     )}

    </View>

  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      fontFamily: 'Montserrat-Medium',
    },
    textnotif:{
      color: '#fff',
    },
    navBar:{
      flexDirection: 'row',
      marginLeft: 7
    },
    navBarItems: {
      color: "dodgerblue",
      fontSize: 13,
      lineHeight: 26,
      marginLeft: 13,
      marginTop: 5,
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase'
    },
    navBarBorder:{
      borderBottomWidth: 'solid',
        borderBottomColor: 'dodgerblue',
        borderBottomWidth: 2,
        color: 'dodgerblue',
        marginRight: 10,
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
    notification: {
        backgroundColor: 'dodgerblue',
        color: '#fff',
        paddingLeft: 8,
        paddingTop: 2,
        marginRight: 10,
        fontSize: 10,
        width: 25,
        height: 25,
        borderRadius: 50,
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'flex-end'
    },
    button: {
        borderStyle: 'solid',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        borderRadius: 3,
        padding: 4,
        color: 'dodgerblue',
        marginRight: 10,
    },
    inbox: {
        color: "#000",
        fontSize: 18,
        lineHeight: 26,
        marginLeft: 13,
        marginTop: 5,
      fontFamily: 'Montserrat-Medium',
      textTransform: 'uppercase'
      },
      materialCardWithImageAndTitle1: {
        top: 0,
        left: 0,
        width: '100%',
        shadowOpacity: 0.01
      },
      materialCardWithImageAndTitle1Stack: {
        width: '100%',
        marginTop: 10,
      },
      
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
 
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 14,
    borderRadius: 2,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: "rgba(16,108,199,1)",
    paddingBottom: 2,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  subtitleStyle: {
    color: "#333",
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Montserrat-Medium',
  },
  time: {
    color: "#333",
    opacity: 0.5,
    fontSize: 10,
    lineHeight: 22,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    fontFamily: 'Montserrat-Medium',
  },
  cardItemImagePlace: {
    width: 48,
    height: 48,
    backgroundColor: "#ccc",
    margin: 16,
    borderRadius: 50
  }
})


