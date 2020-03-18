import React , {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from "react-native";

import CupertinoButtonInfo from "../components/CupertinoButtonInfo";

import Icon from "react-native-vector-icons/Entypo";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";


import axios from 'axios'
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

function inboxView(props) {
  const [data, setData] = useState({ chat_messages: [], user: [], product: [] });
  const [isPlaying, setisPlaying] = useState(false)
  
  const [message, setmessage] = useState("")
  const [file, setfile] = useState("")
  const [audio_file, setaudio] = useState("")
  const [messageIcon, setMessageIcon] = useState(false)
  const [micIcon, setMicIcon] = useState(true)

  useEffect(() => { 
    
    const fetchData = async () => { 
      const result = await axios.get(
        `get_chat_message/${props.navigation.getParam('itemId')}`
      );  
      setData(result.data.successData);
    }; 
    fetchData();

    console.warn(data, 'data')
  }, []);


  const fetchData = async () => { 
    const result = await axios.get(
      `get_chat_message/${props.navigation.getParam('itemId')}`
    );  
    setData(result.data.successData);
  }; 


  function setmessagefunc(item) {
    setmessage(item)
    setMicIcon(false)
    setMessageIcon(true)
  }
  
  
 async function onsubmit() {
  const formData = new FormData(); 
  formData.append('receiver_id', props.navigation.getParam('receiver_id'));
  formData.append('product_id',  data.product['id']);
  formData.append('lat',  data.product['lat']);

  formData.append('lng',  data.product['lng']);
  formData.append('file', file);
  formData.append('location',  data.product['location']);

  formData.append('audio_file', audio_file);
  formData.append('message', message);

  console.warn(formData)
  await axios.post(
    `add_message`, formData
  )
  .then(response => 
    { 
      console.warn(response)
      fetchData();
    })
.catch(error => {
  // setLoading(false)
  // setError(error.message)
})

    
  }


 
  return (
<>
<View style={styles.container}>
 
 <View style={styles.header}>

 <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>

          <MaterialCommunityIconsIcon
            name="arrow-left"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>

        </TouchableOpacity>


<View style={{flexDirection: 'row',}}>
<Image
        source={require("../assets/images/slide3.jpg")}
        resizeMode="cover"
        style={styles.profileImg}
      ></Image> 
    <Text style={styles.headerText}>&nbsp;
  {data.user['name']}</Text>
</View>

    


        <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>

          <MaterialCommunityIconsIcon
            name="phone"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>

        </TouchableOpacity>

        <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>

          <MaterialCommunityIconsIcon
            name="flag"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>

        </TouchableOpacity>

        <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>

      
<Icon name="dots-three-vertical" style={styles.leftIcon2}></Icon>

        </TouchableOpacity>


    


 </View>



<ScrollView>


<View style={styles.ramanOsmanStackColumn}>
            
<View style={styles.productText}>

<Image
        source={require("../assets/images/slide3.jpg")}
        resizeMode="cover"
        style={styles.cardItemImagePlace}
      ></Image>

    <View style={{paddingLeft: 10,}}>
        <Text style={styles.textBold}>  {data.product['title']} </Text>
        <Text style={styles.textMoney}>{data.product['currency']} {data.product['price']}</Text>
    </View>
</View>


{data.chat_messages.map((item, index) => 
  <>

{/* <Text style={styles.details}>
{moment(item.created_at,  "YYYYMMDD").fromNow()}
            </Text> */}



{data.current_id === item.sender_id ? (
  <>
    
<View style={styles.detailsDescriptionRit}>

<Text style={styles.messagedetails}>
{item.message || item.file+'ok'}
</Text>

<Text style={styles.time}>
<MaterialCommunityIconsIcon
name="check"
style={styles.leftIcon2}
></MaterialCommunityIconsIcon>
{moment(item.created_at,"YYYYMMDD").fromNow()}
</Text>
</View>

   </>
) : (
  <>

<View style={styles.detailsDescription}>
                  <Text style={styles.bluemessagedetails}>
                      {item.message || item.file+'ok'}
                        </Text>

                        <Text style={styles.bluetime}>
                        <MaterialCommunityIconsIcon
            name="check"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>
          {moment(item.created_at,"YYYYMMDD").fromNow()}
          </Text>
                    </View>
  

 </>
)}

  
                    </>
)}
  </View>



    </ScrollView>
  

    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <View style={styles.messageBox}>

    <View>
        <Text  style={styles.icon2}>
        <Icon name="attachment"></Icon>
        </Text>
    </View>

    <View>
        <TextInput placeholder={"Enter Message"} onChangeText={text => setmessagefunc(text)} style={styles.TextInputb}></TextInput>
    </View>

    <View>
    {micIcon && (<>
      <Text  style={styles.icon2}>
        <Icon name="mic"></Icon>
        </Text>
    </>)}
    
    {messageIcon && (<>
      <TouchableOpacity  onPress={()=> onsubmit()}>
        <Text style={styles.icon2}>
          <Icon name="paper-plane"></Icon>
        </Text>
      </TouchableOpacity>  
    </>)}
      
    </View>
    </View>
    </KeyboardAvoidingView>


    </View>
</>

  )}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    keyboardMsg: {

    },
    messageBox:{
      bottom: 0,
      width: '100%',
      backgroundColor: '#f2f2f2',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      padding: 6
    },
    TextInputb: {
        alignSelf: 'flex-start',
        minWidth: 270,
        padding: 5,
        color: '#333'
    },
    icon2:{
        paddingTop: 11,
        fontSize: 29,
        height: 50,
        width: 30,
        textAlign: 'center'
    },
    leftIcon2:{
        fontSize: 15,
    },
    leftIconButton: {
        padding: 11,
        marginLeft: 5,
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
    cardItemImagePlace: {
        height: 50,
        width: 50
    },
    productText: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
        width: '95%',
        alignSelf: 'center',
        padding: 5, 
        marginTop: 5,
        marginBottom: 5,
    },
    textBold: {
        marginTop: 5,
        fontWeight: 'bold',
        width: 140,
    },
    textMoney: {
        marginTop: 1,
        width: 140,
    },
    bluemessagedetails: {
        color: '#fff',
        width: '100%',
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 12,
    },
    bluetime: {
        color: '#fff',
        textAlign: 'right',
        width: '100%',
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 12,
    },
    messagedetails: {
        color: '#333',
        width: '100%',
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 12,
    },
    time: {
        color: '#555',
        textAlign: 'right',
        width: '100%',
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        height: 70,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderStyle: "solid" ,
        paddingTop: 30
    },
    profileImg: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    headerText: {
        width: 165,
        paddingTop: 5,
        fontFamily: 'Montserrat-Medium',
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
         productDetails: {
        color: "#333",
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 9,
        
        fontFamily: 'Montserrat-Medium',
      },
      details: {
        color: "#333",
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 26,
        marginTop: 10,
        marginLeft: 9,
        textAlign: 'center'
      },
      detailsDescription: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'dodgerblue',
        padding: 10,
        color: "#fff",
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 12,
        marginTop: 2,
        marginLeft: 9,
        marginBottom: 10,
        width: '70%',
      },
      detailsDescriptionRit: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        padding: 10,
       
        marginTop: 2,
        marginRight: 14,
        marginBottom: 10,
        width: '70%',
        alignSelf: 'flex-end'
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
  
export default inboxView;
