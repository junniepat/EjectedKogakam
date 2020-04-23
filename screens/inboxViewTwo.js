

import React , {useState, useEffect, Fragment} from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert} from "react-native";
import { Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Button, Card, Layout, Modal, Avatar } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import ReportUser from '../components/ReportUser'

export default function inboxView(props) {
  const [data, setData] = useState({ messages: [], user: [], product: [] });
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [chatMessage, setchatMessage] = useState("")
  const [messageDB, setmessageDB] = useState([])

  useEffect(() => { 
    fetchData();
    getPermissionAsync();
  }, []);


  
  const fetchData = async () => { 
    const result = await fetch(
      `https://kogakam.com/api/v1/get_chat_by_user/${props.navigation.getParam('userID')}/${props.navigation.getParam('productId')}`, {
        headers: {
          app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag=',
          session_token: '$2y$10$plOODHqJcdTw6zlTzcS19OycVaaZwVXEHkOcrSNziwIWIynfKNj.q'
        }
      }
    );  

    let response = await result.json();
    setData(response.successData);

    console.warn(response.successData)
  }; 


  

  function setmessagefunc(item) {
    setmessage(item)
    setMicIcon(false)
    setMessageIcon(true)
  }
  
  
 const onsubmit = () => {
   if (!chatMessage) {
     Alert.alert('no way')
   }
   else {
  const formData = new FormData(); 
  formData.append('receiver_id', props.navigation.getParam('userID'));
  formData.append('product_id', props.navigation.getParam('productId'));
  formData.append('lat',  data.product['lat']);

  formData.append('lng',  data.product['lng']);
  formData.append('file', '');
  formData.append('location',  data.product['location']);

  formData.append('audio_file', '');
  formData.append('message', chatMessage);

  console.warn(formData)
  axios.post(
    `add_message`, formData
  )
  .then(response => 
    { 
      console.warn(response)
      fetchData();
      setchatMessage('')
      setMessageIcon(false)
      setMicIcon(true)
    })
.catch(error => {
  // setLoading(false)
  // setError(error.message)
})
}
    
  }


  
  const addReport = () => {

    const formData = new FormData();
    formData.append('reported_user', props.navigation.getParam('itemId'));
    formData.append('comment', comment);
    formData.append('reason', reason);
    

        axios.post(
          `https://kogakam.com/api/v1/report_user`, formData
        )
        .then(response => 
          { 
            console.warn(response)
            // onSuccess(response);
          })
      .catch(error => {
        console.warn(response)
        // setLoading(false)
        // setError(error.message)
      })
      
    }


    
    const  block= () => {
      const formData = new FormData();
      formData.append('user_id', props.navigation.getParam('itemId'));
          axios.post(
            `https://kogakam.com/api/v1/block_user`, formData
          )
          .then(response => 
            { 
              console.warn(response)
              // onSuccess(response);
            })
        .catch(error => {
          console.warn(response)
          // setLoading(false)
          // setError(error.message)
        })

       
        
      }
 
      const  unblock = ()=> {
        const formData = new FormData();
        formData.append('user_id', props.navigation.getParam('itemId'));
            axios.post(
              `unblock_user`, formData
            )
            .then(response => 
              { 
                console.warn(response)
                // onSuccess(response);
              })
          .catch(error => {
            console.warn(response)
            // setLoading(false)
            // setError(error.message)
          })
          
        }

  const  getPermissionAsync = () => {
    if (Constants.platform.ios) {
      const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }




  

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });

    console.warn(result);

    if (!result.cancelled) {
      setImage({ image: result.uri });
    }


    
      let uri = result.uri
      console.warn('ok', result.uri)
      let fileType = uri.substring(uri.lastIndexOf(".") + 1)
      let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
       
      console.warn('ok')

      const formData = new FormData(); 
      formData.append('receiver_id', props.navigation.getParam('userID'));
      formData.append('product_id', props.navigation.getParam('productId'));
  formData.append('lat',  data.product['lat']);

  formData.append('lng',  data.product['lng']);
  formData.append('file', {type: 'image/jpg', uri, name: `uploaded.${fileType}` });
  formData.append('location',  data.product['location']);

  formData.append('audio_file', '');
  formData.append('message', '');

  console.warn(formData) 
  await axios.post(
    `add_message`, formData
  )
  .then(response => 
    { 
      console.warn(response)
     fetchData();
      setmessage('')
      setMessageIcon(false)
      setMicIcon(true)
    })
.catch(error => {
  // setLoading(false)
  // setError(error.message)
})

  }




  const BackIcon = (props) => (
    <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={22}  style={{marginRight: 6,marginLeft: 6, paddingLeft: 6,}} />
  );
  

  const MenuIcon = (props) => (
    <Ionicons name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} size={22}  style={{marginRight: 6,marginLeft: 6, paddingLeft: 6,}} />
  );

  
const InfoIcon = (props) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-close-circle-outline' : 'md-close-circle-outline'} size={20} color="#555" style={{marginRight: 6,}} />
);

const LogoutIcon = (props) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'} size={20} color="#555" style={{marginRight: 6,}} />
);
  
    const [menuVisible, setMenuVisible] = React.useState(false);
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  
    const renderMenuAction = () => (
      <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );
  
    const renderRightActions = () => (
      <React.Fragment>
     
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}>
            {data.user && data.user['is_blocked'] === false ? <MenuItem accessoryLeft={InfoIcon} title='Block' onPress={() =>  block()} text='Block'/> : <MenuItem accessoryLeft={InfoIcon} title='Unblock' onPress={() =>  unblock()} text='Unblock'/>}
          
          <MenuItem accessoryLeft={LogoutIcon} title='Report' onPress={() => setVisible(true)} text='Report'/>
        </OverflowMenu>
      </React.Fragment>
    );
 
  
    const renderBackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.goBack()}/>
    );


    const renderTitle = (props) => (
      <View style={styles.titleContainer}>
        {/* <Avatar
          style={styles.logo}
          source={{uri: `${data.user['avatar']}`}} 
        /> */}
        <Text {...props}>{data.user && data.user['name']}</Text>
      </View>
    );

  return(
    <>
    <KeyboardAvoidingView 
      style={styles.container}>
    <TopNavigation
        style={{marginTop: 20}}
        alignment='center'
  
        title={renderTitle}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />


<ScrollView style={{height: '84%' }}>


<View style={styles.ramanOsmanStackColumn}>
            


{data.messages.map((item, index) => (
  <Fragment key={index}>

{!item.receiver ? '' : <View style={styles.detailsDescription}>
                  <Text style={styles.bluemessagedetails}>
                      {item.message}
                        </Text>

    
    
                   
                    
<TouchableOpacity >  
    <Image
    source={{uri: `https://kogakam.com/storage/app/chat_files/${item.images}`}} 
    resizeMode="cover"
   style = {!item.images ? '' : styles.cardItemImagePlace}
 
  ></Image>
</TouchableOpacity>  


<Text style={styles.bluetime}>
        {moment(item.created_at).format('LLL')}
          
        </Text>



</View>
}
    
 


{!item.sender ? '' :
                    <View style={styles.detailsDescriptionRit}>
                        
                          <Text style={styles.messagedetails}>
                      {item.message}
                        </Text>

    <Image
      source={{uri: `https://kogakam.com/storage/app/chat_files/${item.images}`}} 
      resizeMode="cover"
     style = {!item.images ? '' : styles.cardItemImagePlace}
    ></Image>
      <Text style={styles.time}>
      {moment(item.created_at).format('LLL')}
            </Text>
      </View>}
  
  
                    </Fragment>
))}
  </View>



    </ScrollView>
  

  
<View style={styles.messageBox}>

<TouchableOpacity  onPress={() => _pickImage()}>
      <View style={{paddingLeft: 10, paddingRight: 20, }}>
          <Text  style={styles.icon2}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-attach' : 'md-attach'} size={25}  style={{marginRight: 6,marginLeft: 6, paddingLeft: 6,}} />
          </Text>
      </View>
      </TouchableOpacity>


      <View>
          <TextInput placeholder={"Enter Message"} style={styles.TextInputb} onChangeText={text => setchatMessage(text)} value={chatMessage}></TextInput>
      </View>

      <TouchableOpacity onPress={() => onsubmit()}>
      <View  style={{paddingLeft: 15, paddingRight: 10, }}>
    
        <Text  style={styles.icon2}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'} size={25}  style={{marginRight: 6,marginLeft: 6, paddingLeft: 6,}} />
          </Text>
          </View>
        </TouchableOpacity>
         
     
</View>

   

<Modal
        visible={visible}
        style={{width: '80%'}}
        onBackdropPress={() => setVisible(false)}>
        <ReportUser userID={props.navigation.getParam('receiver_id')}/>
      </Modal>



    </KeyboardAvoidingView>

    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageBox:{
      backgroundColor: '#f1f1f1',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      padding: 6,

  },

  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 16,
  },
  TextInputb: {
      alignSelf: 'flex-start',
      width: 300,
      padding: 5,
      color: '#333',
      borderLeftColor: '#ccc',
      borderLeftWidth: 1
  },
  icon2:{
      paddingTop: 7,
      fontSize: 19,
      height: 50,
      width: 20,
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
    height: 60,
    width: 60
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
      width: '100%',
  },
  textMoney: {
      marginTop: 1,
      width: '75%',
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
      fontSize: 9,
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
      fontSize: 9,
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
      borderRadius: 10,
      display: 'flex',
      flex: 1,
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
      borderRadius: 10,
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
