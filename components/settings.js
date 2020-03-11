import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, AsyncStorage } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { Button } from 'react-native-elements';

import axios from 'axios'


function ProfileSettings(props) {

  const [name, setName] = useState("")
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

  const [toks, setToks] = useState(null);
  const [user, setUser] = useState([]); 

  const [image, setImage] = useState(null);

  useEffect(() => {

    getPermissionAsync();

    AsyncStorage.getItem("token")
    .then((result)=> {
      setToks(result.replace(/"/g, ""))
      // console.warn("tokenh", toks) 
    })  
    
    

    AsyncStorage.getItem("user")
    .then((result)=>
    { 
      setUser(JSON.parse(result))
      setTimeout(() => { 
        setUser(JSON.parse(result))
      }, 1000)
      console.warn("user", user)

    })
  }, [])

  

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.warn(result, 'result');

    if (!result.cancelled) {
        setImage(result.uri);

        saveImage()
    }
  }

  async function saveImage(){
    const formData = new FormData();
    formData.append('profile_image', image);

    await axios.post('https://kogakam.com/api/v1/change_profile_image', formData, {
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag=',
          session_token: toks
        }
      })
      .then(res => {
        console.warn(res, 'imae')})
    
      .catch(error => {
        console.warn(error, 'image')}
        )
  }
  

  console.warn(image, 'im')

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

  await axios.post('change_profile', formData, {
    headers: {
      app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag=',
      session_token: toks
    }
  })
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

  
  return (
    <View style={styles.container}>


<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Select Profile Picture"
          onPress={_pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 170, height: 170, marginTop: 8 }} />}
      </View>


<Text style={styles.text}>Update Profile </Text>

{/* <ErrorText error={error}/> */}
 
<Text>{user['name']}</Text>

    <View
      style={styles.materialUnderlineTextbox}>
    <TextInput
        placeholder={'Full name'}
        style={styles.inputStyle}
        onChangeText={text => setName(text)}
        value={name}
      ></TextInput>
    </View>
    
    <View
      style={styles.materialUnderlineTextbox}>
    <TextInput
        placeholder={"Email Address"}
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
        placeholder={"Phone"}
        style={styles.inputStyle}
        onChangeText={text => setPhone(text)}
        value={phone}
      ></TextInput>
    </View>

    <View
      style={styles.materialUnderlineTextbox}>
    <TextInput
        placeholder={"Address"}
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




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: "95%",
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

export default ProfileSettings;
