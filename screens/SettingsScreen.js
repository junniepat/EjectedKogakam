

import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect, Fragment} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View, AsyncStorage,
 Switch, Picker,
 Alert} from "react-native";

import {  List, ListItem, Row } from 'native-base';
import { Tab, TabView, Input, Button, Card, Layout, Select, SelectItem, Modal, IndexPath } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


import MaterialSearchBar from "../components/MaterialSearchBar";

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';
import axios from 'axios'
import { Checkbox } from 'react-native-paper';


export default function SettingsScreen(props) {

  const [profile, setUser] = useState({user: []}); 
   const [shop, setShop] = useState()
   const [visible, setVisible] = useState(false);
  const [toks, setToks] = useState('');

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [certificate, setCertificate] = useState("")

  const [editProfile, seteditProfile] = useState(false)
  const [viewProfile, setviewProfile] = useState(true)



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
const [username, setusername] = useState("")
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [country, setCountry] = useState(null)
 const [latitude, setlatitude] = useState(null)
 const [longitude, setlongitude] = useState(null)

  const [btnText, setbtnText] = useState("Update")
  const [disableBtn, setDisableBtn] = useState(false)
  const [Message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [image, setImage] = useState(null);
  const [certImage, setcertImage] = useState(null)

  const [emailStatus, setemailStatus] = useState(false);
  const [userType, setUserType] = useState('');
  const [userProfile, setuserProfile] = useState(false);
  const [data, setData] = useState({ user: [] });

  const [shop_title, setShopTitle] = useState("")
  const [shop_description, setShopDescription] = useState("")
  const [shop_location, setShopLocation] = useState("")
  const [categories, setCats] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

 
  const shouldLoadComponent = (index) => index === selectedIndex;
 

  
  const [selectedOptions, setselectedOptions] = React.useState([])


const addselectedOptions = (itemValue) => {
    if(selectedOptions.indexOf(itemValue) !== -1){
        console.warn("Value exists!")
    } else{
       setselectedOptions(selectedOptions.concat(itemValue))
    }
}


const remove = (itemValue) => {
const valueToRemove = itemValue
const filteredItems = selectedOptions.filter(function(item) {
  return item !== valueToRemove
})

setselectedOptions(filteredItems)
}



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
			position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'AIzaSyCqVdsEiP5jMfTWaiHaOO5CjRyCvylHtS4')
        .then((response) => response.json())
        .then((responseJson) => { 
           setLocation(responseJson.results[1].formatted_address)
           setShopLocation(responseJson.results[1].formatted_address)
        setAddress(responseJson.results[1].formatted_address)
        setCity(responseJson.results[1].address_components[1].long_name)
        setState(responseJson.results[1].address_components[3].long_name)
        setCountry(responseJson.results[1].address_components[6].long_name)
        
        })

        setlatitude(latitude);
        setlongitude(longitude);
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
  }, [])
  

   
  useEffect(() => {
       const fetchData = async () => {
      const result = await axios.get(
        `get_user`
      );  
      setUser(result.data.successData);
      
      setName(result.data.successData.user.name)
      setEmail(result.data.successData.user.email)
      setPhone(result.data.successData.user.phone)
      setusername(result.data.successData.user.username)
    }; 

    const fetchShopData = async () => {
      const result = await axios.get(
        `get_shop_data`
      );  
      setShop(result.data.successData);
    }



    const fetchCats = async () => {
      const result = await axios.get(
        'shop_cat'
      );  
      setCats(result.data.successData.cats);
    };


    fetchCats();
    fetchData();
    fetchShopData();
  }, []);

  const fetchData = async () => {
  await axios.get(
      'get_user'
    )
    .then(response => {
      setData(response.data.successData);
    })  
  };

  useEffect(() => {

    getPermissionAsync();

    AsyncStorage.getItem("email_status")
    .then((result)=>
    { 
      console.warn("email_status", result)
    })

  }, []) 


  async function emailStatusSAction(value) {
    setemailStatus(value)
   

    const formData = new FormData();
  formData.append('email_public', value);

  
  await axios.post('change_email_status', formData)
  .then(res => {
    console.warn(res, 'email_public')
    AsyncStorage.setItem("email_public", value).then(
      () => AsyncStorage.getItem("email_public")
            .then((result)=>console.warn(result))
    )
    setemailStatus(result)
     
  })
  .catch(error => {
    console.warn(error, 'email_public')}
    )
  }


  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,    
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }
      let uri = result.uri
      let fileType = uri.substring(uri.lastIndexOf(".") + 1)
      let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
       

      const formData = new FormData(); 
      formData.append('profile_image', {type: 'image/jpg', uri, name: `uploaded.${fileType}` });
  
      await axios.post('https://kogakam.com/api/v1/change_profile_image', formData, 
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
      })
        .then(res => {
          fetchData();
        })
        .catch(error => {
          console.warn(error, 'image')}
          )
    
  }

 const selectCert = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,    
    });

    if (!result.cancelled) {
      setcertImage(result.uri);
    }
      let uri = result.uri
      let fileType = uri.substring(uri.lastIndexOf(".") + 1)
      let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)

      setCertificate({type: 'image/jpg', uri, name: `uploaded.${fileType}` });
  
     
    
  }


 async function onsubmit() {


  setDisableBtn(true)
  setbtnText('Updating ....')


  console.warn('ok')
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('phone', phone);
  formData.append('address', address);
  formData.append('lat', latitude);
  formData.append('lng', longitude);
  formData.append('city', city);
  formData.append('state', state);
  formData.append('country', country);

  console.warn(formData)

  await axios.post('change_profile', formData)
  .then(res => {
    console.warn(res)
    setError('')
    setMessage('Update successful, changes would be effected in your next sign in')
    fetchData();
  })

  .catch(error => {
    setError('Unable to Update')
    setMessage('')
    
    console.warn(error, 'settings')}
    )
    
  }

  async function onshopsubmit() {
    setDisableBtn(true)
    setbtnText('Updating ....')
  
    if (email == null) {
      console.warn('exploded')
    }
  
    console.warn('ok')
    const formData = new FormData();
    formData.append('shop_title', shop_title);
    formData.append('shop_description', shop_description);
    formData.append('shop_location', shop_location);
    formData.append('cats', selectedOption);
    formData.append('shop_lat', latitude);
    formData.append('shop_lng', longitude);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
  
    console.warn(formData)
  
    await axios.post('change_shop', formData)
    .then(res => {
      console.warn(res)
      setError('')
      setMessage('Update successful, changes would be effected in your next sign in')
      fetchData();
    })
  
    .catch(error => {
      setError('Unable to Update')
      setMessage('')
      
      console.warn(error, 'settings')}
      )
      
    }

  useEffect(() => {
   
    AsyncStorage.getItem("token")
    .then((result)=> { 
      setToks(result.replace(/"/g, ""))
      console.warn("token", result)
    })
  
   
  }, []) 


  
  async function requestBadge() {

    const formData = new FormData();
    formData.append('shop_name', name);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('certificate', certificate)
    

        await axios.post(
          `request_badge`, formData
        )
        .then(response => 
          { 
            console.warn(response)
            Alert.alert('Request has been received, Await response for our team.')
            setVisible(false)
          })
      .catch(error => {
        console.warn(response)
        Alert.alert('Request Failed')
      })
      
    }


   async function editProfileo (){
     seteditProfile(true)
     setviewProfile(false)
   }

   async function viewProfileo(){
    seteditProfile(false)
    setviewProfile(true)
  }



  function Logout() {
      AsyncStorage.removeItem('token')
      props.navigation.push('Login')
  }

  return (
    <>
    <View style={styles.container}>
    <LinearGradient
          colors={['rgb(28, 69, 158)', 'rgb(28, 69, 158)', 'rgb(22, 70, 173)']}
          style={{paddingTop: 10, paddingBottom: 10}}>
         
    
<MaterialSearchBar
        style={styles.materialSearchBar1}
      ></MaterialSearchBar>

<>
      <Fragment >
          
         
          
  <View style={styles.roundedCover}>
           
           <View style={{width: '83%', flexDirection: 'row'}}>
                <View style={styles.rounded}>
                  <Image
                    source={{uri: `${profile.user && profile.user['image']}`}}
                    resizeMode="cover"
                    style={styles.profileIm}
                  ></Image>
                </View>

                <View style={styles.johnDoeColumn}>
                  <Text style={styles.johnDoe}>{profile.user && profile.user['name']}</Text>
                  {profile.user && profile.user['email_public'] === true ? 'Email Hidden' :  <Text style={styles.johnGmailCom}>{profile.user && profile.user['email']}</Text>}
                </View>
           </View>
              
            <TouchableOpacity onPress={() => setVisible(true)} style={{alignSelf: 'flex-end', height: 70, paddingTop: 10}} > 
              <Text> 
                <Ionicons name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} size={28} color="#fff" style={{marginTop: '-20%'}} /></Text>
            </TouchableOpacity>

          </View>

     
      <View style={styles.Wrapdetails}>

          <View style={{paddingBottom:5, marginBottom: 5,}}>
          
          <View style={styles.loremIpsum3Row}>
            <Text style={styles.loremIpsum3}>{profile.user && profile.user['products_count']}</Text>
            <Text style={styles.loremIpsum3}>{profile.user && profile.user['following_count']}</Text>
            <Text style={styles.loremIpsum3}>{profile.user && profile.user['followers_count']}</Text>
           
          </View>

          <View style={styles.details}>
            <Text style={styles.smText}>Products</Text>
            
            <Text style={styles.smText}>Following</Text>
            <Text style={styles.smText}>Followers</Text>
          </View>

        
          </View>
      </View>
      </Fragment>
</>
    </LinearGradient>



<ScrollView>


<TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='Profile'>
        <Layout style={styles.tabContainer}>
        {viewProfile  &&   <>
          <List>
            <ListItem itemDivider style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>My Profile</Text>
              <Button onPress={() => editProfileo()} title='Edit'>Edit</Button>
            </ListItem>                    
            <ListItem>
              <Text>Member Since:  {moment.utc(profile.user && profile.user['created_at']).local().format('LL')} </Text>
            </ListItem>
            <ListItem>
              <Text>Views:   {profile.user && profile.user['viewed']} </Text>
            </ListItem>
            <ListItem>
              <Text>BlockList: {profile.user && profile.user['blocked_count']}</Text>
            </ListItem>
          </List>

          <Button style={{marginTop: '55%', marginLeft: 20, marginRight:20}} onClick={() => Logout()} appearance='outline'>Log Out</Button>
        </>
        }


{  editProfile && <>



<Text style={styles.text}>Update Profile </Text>



<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Button onPress={() => _pickImage()}>
        Select Profile Picture
        </Button>
         
        {image &&
          <Image source={{ uri: image }} style={{ width: 170, height: 170, marginTop: 8 }} />} 
      
      </View>


{Message !== '' ? <View style={{backgroundColor: '#9bffad', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: 'green'}}>{Message}</Text>
  </View> : null}

 {error !== '' ? <View style={{backgroundColor: '#ff475c', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: '#fff'}}>{error}</Text>
  </View> : null}

      
<View style={{flexDirection: 'row', justifyContent: 'space-between',
                      backgroundColor: '#f2f2f2', marginTop: 5, marginBottom: 5, paddingBottom:5, padding: 9, borderRadius: 4}}>
              <Text style={{fontFamily: 'Montserrat-Medium',}}>Change email status</Text>
            
              
<Switch
              value={emailStatus}
              onValueChange={v => {
                emailStatusSAction(v);
              }}
            />
        </View>

<View
  style={styles.materialUnderlineTextbox}>
      <Input
      label="Full Name"
        style={styles.input}
        placeholder={'name'}
        value={name}
    onChangeText={text => setName(text)}
      />
</View>

<View
  style={styles.materialUnderlineTextbox}>
     <Input
     disabled={true}
     label="Email"
     placeholder={'email'}
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
</View>


<View
  style={styles.materialUnderlineTextbox}>
     <Input
     label="Username"
     placeholder={'Username'}
        style={styles.input}
        value={username}
        onChangeText={text => setusername(text)}
      />
</View>


<View
  style={styles.materialUnderlineTextbox}>
  <Input
  label="Password"
   placeholder={'Password'}
        style={styles.input}
        value={password}
    secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

</View>

<View
  style={styles.materialUnderlineTextbox}>
    <Input
    type='number'
    label="Phone"
        placeholder={'Phone'}
        style={styles.input}
    onChangeText={text => setPhone(text)}
    value={phone}
      />

</View>

<View
  style={styles.materialUnderlineTextbox}>

<Input
label="Address"
    placeholder={'address'}
    style={styles.inputStyle}
    onChangeText={text => setAddress(text)}
    value={address}
      />
</View>


<View style={{marginLeft: 5, marginTop: 30, marginRight: 9}}>
      <Button onPress={()=> onsubmit()} >
        Update
      </Button>
</View>


  </>
}

        </Layout>
      </Tab>


      {profile.user['type'] === 'shop' ? 
      <Tab title='Shop Settings'>
        <Layout style={styles.tabContainer}>
          
          
        <Text style={styles.text}>Update Shop Details </Text>


{Message !== '' ? <View style={{backgroundColor: '#9bffad', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: 'green'}}>{Message}</Text>
  </View> : null}

 {error !== '' ? <View style={{backgroundColor: '#ff475c', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: '#fff'}}>{error}</Text>
  </View> : null}


  <View
  style={styles.materialUnderlineTextbox}>
    <Input
    label="Shop Title"
        placeholder={'Shop Title'}
        style={styles.input}
    onChangeText={text => setShopTitle(text)}
    value={shop_title}
      />

</View>

 <View
  style={styles.materialUnderlineTextbox}>
    <Input
    label="Shop Description"
        placeholder={'Shop Description'}
        style={styles.input}
    onChangeText={text => setShopDescription(text)}
    value={shop_description}
      />

</View>


<View
  style={styles.materialUnderlineTextbox}>
    <Input
    label="Shop Location"
        placeholder={'Shop Location'}
        style={styles.input}
    onChangeText={text => setShopLocation(text)}
    value={shop_location}
      />

</View>

{/* 
  <ShopSettings/>
 */}

<View style={{marginLeft: 5, marginTop: 30, marginRight: 9}}>
      <Button onPress={()=> onshopsubmit()} >
        Update
      </Button>
</View> 

        </Layout>
      </Tab> : null}
    
 
    </TabView>
  
  </ScrollView>











  <Modal
  style={{width: '80%',}}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
        <Text style={styles.report}>Request Badge</Text>


<Input
  label='Name'
  placeholder={"Name"}
  onChangeText={text => setName(text)}
  value={name}
/>

  <Input
  label='Location'
  placeholder={"Location"}
  onChangeText={text => setLocation(text)}
  value={location}
/>



<View
style={styles.materialUnderlineTextbox2}>
    <Input
    label='Please briefly explain why your account should be verifed?'
   placeholder={"Please briefly explain why your account should be verified?"}
   style={{height: 100}}
   onChangeText={text => setDescription(text)}
   value={description}
/>

</View>

<View
style={styles.materialUnderlineTextbox2}>
 <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Button onPress={() => selectCert()} size='tiny'>
        Select Certificate
        </Button>
         
        {certImage &&
          <Image source={{ uri: certImage }} style={{ width: 60, height: 60, marginTop: 8, marginLeft: 10 }} />} 
      
      </View>
</View>

<View style={{marginLeft: 0, marginRight: 0}}>
    <Button onPress={()=> requestBadge()}> 
      Request Badge
    </Button>
</View>

        </Card>
      </Modal>

  


    </View>
  </>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgGradient: {
    backgroundColor: '#0F52BA',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  materialUnderlineTextbox2: {
    width: "95%",
    height: 70,
    marginLeft: 2,
    marginTop: 10,


    borderRadius: 5,
    padding: 5,
    marginBottom: 12
  },
  report: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
    marginTop: 3,
    marginLeft: 9,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 10,
    fontFamily: 'Montserrat-Medium',
  },
  inputStyle2: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 2,
    paddingRight: 0,
    paddingBottom: 8,
    fontSize: 16,
    height: 100,
    lineHeight: 1,
    textAlign: "left"
  },
  materialSearchBar1: {
    width: "97%",
    height: 46,
    marginTop: 10,
    marginLeft: 6,

    marginBottom: 5,

  },
  
  profileIm: {
    height: 61,
    width: 61,
    borderRadius: 50,
    backgroundColor: '#333',
    alignSelf: 'flex-start', 
    alignItems: 'center',
    alignContent: 'center'
  },

  roundedCover: {
    marginLeft: 10, 
    marginTop: 5,
    width: '100%',
    alignSelf: 'flex-start',  
    flexDirection: "row",
  },
  rounded: {
    height: 65,
    width: 65,
    borderRadius: 50,
    backgroundColor: 'dodgerblue',
    padding: 2,
    alignSelf: 'flex-start', 
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: "dodgerblue",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
   johnDoe: {
     width: 150,
    color: "#fff",
    fontSize: 13,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
  },
  johnGmailCom: {
    width: 140,
    color: "#fff",
    fontSize: 10,
    marginTop: 3,
    fontFamily: 'Montserrat-Medium',
  },
  johnDoeColumn: {
    marginLeft: 15,
    marginBottom: 21,
    marginTop: 12 
  },
  memberSince: {
    color: "#86A8DC",
    fontSize: 11,
    width: '33%',
    marginRight: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  products: {
    color: "#86A8DC",
    fontSize: 11,
    marginRight: 8,
    width: '33%',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  views: {
    color: "#86A8DC",
    fontSize: 11,
    width: '33%',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  Wrapdetails: {
    width: '80%',
    alignSelf: 'flex-end',
    marginBottom: 5
  },
  details: {
    flexDirection: "row",
    width: '90%',
    
  },

 
  followingRow: {
    height: 24,
    flexDirection: "row",
    width: '90%',
    marginTop: 1,
  },
  loremIpsum: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    height: 19, 
    width: "33%",
  },

  loremIpsumRow: {
    height: 22,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: '#86A8DC',
    borderStyle: 'dashed',
    width: '98%'
  },
  path: {
    width: 323,
    height: 2,
    marginTop: 27,
    marginLeft: 23
  },
  loremIpsum3Row: {
    height: 25,
    flexDirection: "row",
    marginTop: 1,
  },


  loremIpsum3: {
    color: "#fff",
    fontSize: 17,
    width: '33%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
 
 
  smText: {
    color: "#86A8DC",
    fontSize: 11,
    width: '33%',
    marginRight: 10,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
  },

  blueBack: {
    backgroundColor: '#4630EB',
    marginTop: 20,
    paddingTop: 40,
    paddingBottom: 40,
    height: '55%'
  },
  lottie: {
    width: 100,
    height: 100
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 8,
    paddingRight: 0,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 16,
    textAlign: "left",
    
    fontFamily: 'Montserrat-Medium',
  },
  buttonAll: {
    flexDirection: 'row', 
    marginTop: 4,
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  materialButtonViolet: {
    width: "95%",
    height: 51,
    marginTop: 32,
    marginLeft: 10,
    marginBottom: 25,


    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },

  caption: {
    color: "#fff",
    fontSize: 14,
  },
  materialRightIconTextbox: {
    width: "95%",
    height: 43,
    marginTop: 30,

    marginLeft: 10
  },
  materialUnderlineTextbox: {
    width: "98%",
    height: 50,
    marginLeft: 5,
    marginTop: 15,


    padding: 5,
    marginBottom: 12
  },
  materialButtonViolet1: {
    top: 0,
    left: 0,
    width: "95%",
    height: 51,
  },
  icon: {
    top: 9,
    left: 86,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 30
  },
  materialButtonViolet1Stack: {
    width: "98.5%",
    height: 51,
    marginLeft: 10
  },
  materialButtonWithShadow: {
    width: "94%",
    height: 51,
    marginTop: 10,
    alignSelf: 'center'
  },
  we: {
    color: "#fff",
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
    marginLeft: 30
  },
  cupertinoButtonBlueTextColor: {
    width: 110,
    height: 44,
    marginTop: 3
},
  and: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 10,
    marginTop: 18
  },
  cupertinoButtonBlueTextColor1: {
    width: 100,
    height: 44,
    marginLeft: 6,
    marginTop: 3
  },
  cupertinoButtonBlueTextColorRow: {
    height: 46,
    flexDirection: "row",
    marginTop: 1,
    marginLeft: 48,
    marginRight: 44
  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 19,
    
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 1,
    fontFamily: 'Montserrat-Medium',
  },
  materialButtonPink1: {
    top: 0,
    left: 0,
    width: "98.5%",
    height: 57,
    position: "absolute"
  },
  icon2: {
    top: 12,
    left: 89,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 30
  },
  materialButtonPink1Stack: {
    width: "95%",
    height: 57,
    marginTop: 9,
    marginLeft: 10
  },
  loremIpsum3StackStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "70%",
    height: 49,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  caption: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  and1: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
    marginRight:5
  },
 
});








