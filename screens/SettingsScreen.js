

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
 Switch } from "react-native";

import { Tab, Tabs, List, ListItem } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


import MaterialSearchBar from "../components/MaterialSearchBar";

import { LinearGradient } from 'expo-linear-gradient';
import { Button, Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';
import axios from 'axios'


export default function SettingsScreen(props) {

  const [profile, setUser] = useState({user: []}); 

  const [isVisible, setVisible] = useState(false)
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
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [city, setCity] = useState("")
  const [state, setStatet] = useState("")
  const [country, setCountry] = useState("")

  const [btnText, setbtnText] = useState("Update")
  const [disableBtn, setDisableBtn] = useState(false)


  const [image, setImage] = useState(null);

  const [emailStatus, setemailStatus] = useState(false);
  const [userType, setUserType] = useState('');
  const [userProfile, setuserProfile] = useState(false);

  const [data, setData] = useState({ user: [] });

  const [latitude, setlatitude] = useState(null)
  const [longitude, setlongitude] = useState(null)
 
   useEffect(() => {
     navigator.geolocation.getCurrentPosition(
       position => {
         const latitude = JSON.stringify(position.coords.latitude);
         const longitude = JSON.stringify(position.coords.longitude);
      
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
      console.warn(result.data.successData)
      setUser(result.data.successData);
    }; 

    fetchData();



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


  _pickImage = async () => {
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

 


 async function onsubmit() {


  setDisableBtn(true)
  setbtnText('Updating ....')

  if (email == null) {
    console.warn('exploded')
  }

  console.warn('ok')
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('phone', phone);
  formData.append('address', address);
  formData.append('lat', lat);
  formData.append('lng', lng);
  formData.append('city', city);
  formData.append('state', state);
  formData.append('country', country);

  console.warn(formData)

  await axios.post('change_profile', formData)
  .then(res => {
    setbtnText('Login')
    setDisableBtn(false)
    console.warn(error, 'settings')})

  .catch(error => {
    setbtnText('Login')
    setDisableBtn(false)
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


  
  async function addReport() {

    const formData = new FormData();
    formData.append('shop_name', name);
    formData.append('location', location);
    formData.append('description', description);
    

        await axios.post(
          `request_badge`, formData
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


   async function editProfileo (){
     seteditProfile(true)
     setviewProfile(false)
   }

   async function viewProfileo(){
    seteditProfile(false)
    setviewProfile(true)
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
            <View style={styles.rounded}>
            <Image
        source={{uri: `${profile.user && profile.user['image']}`}}
        resizeMode="cover"
        style={styles.profileIm}
      ></Image>
    
            </View>

            <View style={styles.johnDoeColumn}>
              <View>
              <Text style={styles.johnDoe}>{profile.user && profile.user['name']}</Text>
              {profile.user && profile.user['email_public'] === true ? 'Email Hidden' :  <Text style={styles.johnGmailCom}>{profile.user && profile.user['email']}</Text>}
             
              </View>

              
        <TouchableOpacity onPress={()=> setVisible(true)}> 
          <Text> 
            <Ionicons name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'} size={18} color="#fff" style={{alignSelf: 'flex-end'}} /></Text>
        </TouchableOpacity>

            </View>
          
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
  
        <View>
              <Tabs>
          <Tab heading="Settings" style={{padding: 15}}>

        {viewProfile  &&   <List>
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
          </List>}

            


{editProfile && 


<>

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Select Profile Picture"
          onPress={() => _pickImage()}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 170, height: 170, marginTop: 8 }} />} 
      
      </View>



      <Text style={styles.text}>Update Profile </Text>

      
<View style={{flexDirection: 'row', justifyContent: 'space-between',
                      backgroundColor: '#f2f2f2', marginTop: 5, marginBottom: 5, padding: 9, borderRadius: 4}}>
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
<TextInput
    placeholder={profile.user && profile.user['name']}
    selectionColor={'#428AF8'}
    style={styles.inputStyle}
    defaultValue={profile.user && profile.user['name']}
    onChangeText={text => setName(text)}
    value={name}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>
<TextInput
    placeholder={profile.user && profile.user['email']}
    style={styles.inputStyle}
    onChangeText={text => setEmail(text)}
    value={email}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>

<TextInput
    placeholder={"Password"}
    style={styles.inputStyle}
    onChangeText={text => setPassword(text)}
    value={password}
    secureTextEntry={true}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>
<TextInput
    placeholder={profile.user && profile.user['phone']}
    style={styles.inputStyle}
    onChangeText={text => setPhone(text)}
    value={phone}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>
<TextInput
    placeholder={profile.user && profile.user['address']}
    style={styles.inputStyle}
    onChangeText={text => setAddress(text)}
    value={address}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>
<TextInput
    placeholder={"City"}
    style={styles.inputStyle}
    onChangeText={text => setCity(text)}
    value={city}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>
<TextInput
    placeholder={"State"}
    style={styles.inputStyle}
    onChangeText={text => setStatet(text)}
    value={state}
  ></TextInput>
</View>

<View
  style={styles.materialUnderlineTextbox}>
<TextInput
    placeholder={"Country"}
    style={styles.inputStyle}
    onChangeText={text => setCountry(text)}
    value={country}
  ></TextInput>
</View>

<View style={{marginLeft: 5, marginRight: 9}}>
      <Button
        title={btnText}
        style={styles.materialButtonViolet}
        disabled={disableBtn}
        onPress={()=> onsubmit()}> 
      >
      </Button>
</View>

</>

}
          </Tab>
          <Tab heading="Shop settings">
    
          </Tab>
        
        </Tabs>


        </View>
  </ScrollView>






















  


<Overlay  isVisible={isVisible}  onBackdropPress={() => setVisible(false)}>
    <Text style={styles.report}>Request Badge</Text>

    <View
    style={styles.materialUnderlineTextbox2}>
  <TextInput
      placeholder={"Shop Name"}
      style={styles.inputStyle2}
      onChangeText={text => setName(text)}
      value={name}
    ></TextInput>
  </View>

  <View
    style={styles.materialUnderlineTextbox2}>
  <TextInput
      placeholder={"Location"}
      style={styles.inputStyle2}
      onChangeText={text => setLocation(text)}
      value={location}
    ></TextInput>
  </View>

  <View
    style={styles.materialUnderlineTextbox2}>
  <TextInput
      placeholder={"Description"}
      style={styles.inputStyle2}
      onChangeText={text => setDescription(text)}
      value={description}
    ></TextInput>
  </View>

  <View
    style={styles.materialUnderlineTextbox2}>
  <TextInput
      placeholder={"certificate Img"}
      style={styles.inputStyle2}
      onChangeText={text => setCertificate(text)}
      value={certificate}
    ></TextInput>
  </View>

  <View style={{marginLeft: 9, marginRight: 9}}>
        <Button
          title={'Request Badge'}
          style={styles.materialButtonViolet}
          onPress={()=> addReport()}> 
        >
        </Button>
</View>
</Overlay>


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
 
  materialUnderlineTextbox2: {
    width: "95%",
    height: 50,
    marginLeft: 10,
    marginTop: 10,

    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 12
  },
  report: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
    marginTop: 3,
    marginLeft: 9,
    
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
    lineHeight: 1,
    textAlign: "left"
  },
  materialSearchBar1: {
    width: "97%",
    height: 46,
    marginTop: 32,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: 5,

    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
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





