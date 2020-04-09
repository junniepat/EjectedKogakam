

import React from 'react'

import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, SafeAreaView, 
  TextInput, Platform, FlatList,  KeyboardAvoidingView} from "react-native";

import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Overlay, Input } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import moment from 'moment';
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'


import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


import { GiftedChat } from 'react-native-gifted-chat'
 import axios from 'axios'

export default class inboxView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      messages: [],
      user: '',
      image: null,
    };
  }
 
 
  componentDidMount() {

    axios.get(`get_chat_by_user/${this.props.navigation.getParam('itemId')}/${this.props.navigation.getParam('productId')}`)
    .then(res => {
      const messages = res.data.successData.messages;
      this.setState({ messages });
      this.setState({
        user: res.data.successData.user
      })
      this.setState({
        product: res.data.successData.product

      })
      this.setState({
        current_id: res.data.successData.current_id

      })
      console.warn(this.state.current_id)
    })


    axios.get(`get_chat_message/${this.props.navigation.getParam('itemId')}/${this.props.navigation.getParam('productId')}`)
    .then(res => {
      const messages = res.data.successData.messages;
      this.setState({ messages });
      this.setState({
        user: res.data.successData.user
      })
      this.setState({
        product: res.data.successData.product

      })
      this.setState({
        current_id: res.data.successData.current_id

      })
      console.warn(this.state.current_id)
    })


    this.getPermissionAsync();

  }


  // function setmessagefunc(item) {
  //   setmessage(item)
  //   setMicIcon(false)
  //   setMessageIcon(true)
  // }
  
  
 onsubmit = (messages) => {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))

  const formData = new FormData(); 
  formData.append('receiver_id', this.props.navigation.getParam('receiver_id'));
  formData.append('product_id',  this.state.product['id']);
  formData.append('lat',  this.state.product['lat']);

  formData.append('lng',  this.state.product['lng']);
  formData.append('file', null);
  formData.append('location',  this.state.product['location']);

  formData.append('audio_file', null);
  formData.append('message', messages);

  console.warn(formData)
  axios.post(
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


  
  addReport = () => {

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


    
    block= () => {
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
 
      unblock = ()=> {
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

  getPermissionAsync = () => {
    if (Constants.platform.ios) {
      const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });

    console.warn(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }


    
      let uri = result.uri
      console.warn('ok', result.uri)
      let fileType = uri.substring(uri.lastIndexOf(".") + 1)
      let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
       
      console.warn('ok')

      const formData = new FormData(); 
  formData.append('receiver_id', this.props.navigation.getParam('receiver_id'));
  formData.append('product_id',  this.state.product['id']);
  formData.append('lat',  this.state.product['lat']);

  formData.append('lng',  this.state.product['lng']);
  formData.append('file', {type: 'image/jpg', uri, name: `uploaded.${fileType}` });
  formData.append('location',  this.state.product['location']);

  formData.append('audio_file', null);
  formData.append('message', null);

  console.warn(formData)
  await axios.post(
    `add_message`, formData
  )
  .then(response => 
    { 
      console.warn(response)
      this.componentDidMount();
      setmessage('')
      setMessageIcon(false)
      setMicIcon(true)
    })
.catch(error => {
  // setLoading(false)
  // setError(error.message)
})

  }


 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
 
  render() {
    let { image } = this.state;
    return (
      <>
              <View style={styles.header}>

 <TouchableOpacity style={styles.leftIconButton}
       onPress={() => this.props.navigation.goBack()}>
<Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#555" style={{marginRight: 6,}} />
     
       </TouchableOpacity>


<View style={{flexDirection: 'row',}}>


<Image
   source={{uri: `${'https://kogakam.com/storage/app/profile_images/' + this.state.user['image']}` }} 
   resizeMode="cover"
   style={styles.profileImg}
 ></Image> 

   <Text style={styles.headerText}>&nbsp;
 {this.state.user['name']}</Text>
</View>

   


       <TouchableOpacity style={styles.leftIconButton}
       onPress={() => props.navigation.goBack()}>

<Ionicons name={Platform.OS === 'ios' ? 'ios-call' : 'md-call'} size={20} color="#555" style={{marginRight: 6,}} />
     
       </TouchableOpacity>

       <TouchableOpacity style={styles.leftIconButton} onPress={()=> setVisible(true)}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'} size={20} color="#555" style={{marginRight: 6,}} />
      </TouchableOpacity>


    <Menu>
      <MenuTrigger style={styles.leftIconButton}><Text>  <Ionicons name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} size={20} color="#555" style={{marginRight: 6,}} /></Text></MenuTrigger>
      <MenuOptions>
        <MenuOption style={{padding: 13}} onSelect={() =>  block()} text='Block' />
      </MenuOptions>
    </Menu>
     
    </View>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onsubmit(messages)}
        isAnimated={true}
        renderAvatarOnTop
        quickReplyStyle={{borderRadius:2}}
        timeTextStyle={{left:{color:'blue'},right:{color:'#fff'}}}
        user={{
          _id: this.state.user && this.state.user.id,
          name: this.state.user && this.state.user.name
        }}
        renderActions={() => (
          <TouchableOpacity onPress={() => this._pickImage()}>
              <Text style={styles.icon2}><Ionicons name={Platform.OS === 'ios' ? 'ios-attach' : 'md-attach'} size={22} color="#555" style={{marginRight: 6, marginTop: 14}} /></Text>
          </TouchableOpacity>
        )}
      />

      </>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  keyboardMsg: {

  },
  messageBox:{
    position: 'absolute',
    zIndex: 99999999,
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
      
      borderRadius: 6
  },
  bluetime: {
      color: '#fff',
      textAlign: 'right',
      width: '100%',
      fontSize: 11,
      fontFamily: 'Montserrat-Medium',
      lineHeight: 12,
      
      borderRadius: 6
  },
  messagedetails: {
      color: '#333',
      width: '100%',
      fontSize: 11,
      fontFamily: 'Montserrat-Medium',
      lineHeight: 12,
      borderRadius: 6
  },
  time: {
      color: '#555',
      textAlign: 'right',
      width: '100%',
      fontSize: 11,
      fontFamily: 'Montserrat-Medium',
      lineHeight: 12,
  },
  inputStyle2: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 5,

    height: 150,
    justifyContent: "flex-start"
   
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
      height: 35,
      width: 35,
      borderRadius: 50,
  },
  bigImg: {
    height: 100,
    width: 100,
    borderRadius: 5,
    alignSelf: 'flex-end'
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
      marginBottom: 50,
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
      backgroundColor: '#EEF6F7',
      padding: 10,
      borderRadius: 5,
     
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