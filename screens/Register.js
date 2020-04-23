import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView,
  Animated, KeyboardAvoidingView, TouchableOpacity, AsyncStorage  } from "react-native";
  import { Input } from '@ui-kitten/components';
import { Button } from 'react-native-elements';
import axios from 'axios'
import * as api from "../services/service";

import MaterialButtonWithVioletText1 from "../components/MaterialButtonWithVioletText1";


const RegisterScreen = (props) => {
  const [Message, setMessage] = useState('')
  const [error, setError] = useState('')



  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  const [btnText, setbtnText] = useState("Register")
  const [disableBtn, setDisableBtn] = useState(false)

  const [user, setUser] = useState(null); 
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [country, setCountry] = useState(null)
 const [latitude, setlatitude] = useState(null)
 const [longitude, setlongitude] = useState(null)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
			position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'AIzaSyCqVdsEiP5jMfTWaiHaOO5CjRyCvylHtS4')
        .then((response) => response.json())
        .then((responseJson) => {
           
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
  

  async function onsubmit(){
    setDisableBtn(true)
    setbtnText('...Registering')
    
     
      const formData = new FormData();
      formData.append('name', fullname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);

      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);

      formData.append('address', address);
      formData.append('lng', longitude);
      formData.append('lat', latitude);
  
      if(!email || !fullname || !phone || !password || !address) {
      
        setError('Please check and fill forms correctly')
        setMessage('')
        setbtnText('Register')
        setDisableBtn(false);
        
      }  
      else {
      
        setError('')
        await api.register(formData)
        .then(response => 
          { 
            console.warn(response)
            setError('')
            setMessage('Register successful')
            console.warn(response)
            // onSuccess(response);
            setbtnText('Success')
            setDisableBtn(false);
            console.warn('res', response.user)
            axios.defaults.headers.common['session_token'] = response.successData.session.session_key;
               
            AsyncStorage.setItem("token", JSON.stringify(response.successData.session.session_key)).then(
              () => AsyncStorage.getItem("token")
                    .then((result)=> {
                      console.warn("token", result)
                      
                      setTimeout(() => {
                        props.navigation.navigate('userType', {
                          token: response.successData.session.session_key,
                        })
                      }, 1500);
                    
                    })
           )


          })
      .catch(error => {
      
        console.warn(error)
        setError('Check your form fields')
      

        setbtnText('Register')
        setDisableBtn(false)
     
      })
        
      } }

     
  return (
    <>
    <KeyboardAvoidingView style={styles.container}  enabled>
 
   
      <Text style={styles.text}>REGISTER</Text>

      {Message !== '' ? <View style={{backgroundColor: '#9bffad', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: 'green'}}>{Message}</Text>
  </View> : null}

 {error !== '' ? <View style={{backgroundColor: '#ff475c', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: '#fff'}}>{error}</Text>
  </View> : null}
  

      <ScrollView>
    
     
      <View
      style={styles.materialUnderlineTextbox}>
  

<Input
label="Full Name"
        placeholder={"Full Name"}
        onChangeText={text => setFullname(text)}
        value={fullname}
    />
    </View>

      <View
      style={styles.materialUnderlineTextbox}>
        
<Input
label="Email Address"
        placeholder={"Email Address"}
        onChangeText={text => setEmail(text)}
        value={email}
    />

    </View>


    <View
      style={styles.materialUnderlineTextbox}>

      <Input
      label="Password"
          placeholder={"Password"}
          style={styles.inputStyle}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
    />

    </View> 
    <View
      style={styles.materialUnderlineTextbox}>
                
<Input
label='Phone'
        placeholder={"Phone"}
        onChangeText={text => setPhone(text)}
        value={phone}
    />

    </View>
 
    <View
      style={styles.materialUnderlineTextbox}>


<Input
label="Address"
         placeholder={"Address"}
        onChangeText={text => setAddress(text)}
        value={address}
    />

    </View>


  

  


    

        <View style={{marginLeft: 9, marginRight: 9}}>
  <TouchableOpacity
            style={styles.materialButtonViolet}
            disabled={disableBtn}
            onPress={()=> onsubmit()}> 
     
<Text style={styles.captionBtn}>{btnText}</Text>
          </TouchableOpacity>
  

</View>




      <View style={styles.loremIpsumStack}>
        <Text style={styles.loremIpsum}>Already have an account?</Text>

        <MaterialButtonWithVioletText1
         navigation={props.navigation}
          style={styles.materialButtonWithVioletText1}
        ></MaterialButtonWithVioletText1>
      </View>



      <View style={styles.blueBack}>
  
  <Text style={styles.loremIpsum2}>
          We won&#39;t share your personal details with anyone.
  
          {'\n'}
          If you continue, you are accepting Kogakam
        </Text>
  
        <View style={styles.loremIpsum3StackStack}>
  
        <TouchableOpacity>
        <Text style={styles.caption}>Terms and Conditions</Text>
      </TouchableOpacity>
  
              <Text style={styles.and1}>and</Text>
  
              <TouchableOpacity>
        <Text style={styles.caption}>Privacy Policy</Text>
      </TouchableOpacity>
       
         
        </View>
     
  </View>
     

      </ScrollView>
 
    </KeyboardAvoidingView>



    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0
  },
  blueBack: {
    backgroundColor: '#4630EB',
    marginTop: 50,
    paddingTop: 30,
    paddingBottom: 120,
    height: '25%',
    bottom: 0,
  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 19,
    
    marginTop: 59,
    marginBottom: 20,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    alignItems: 'center'
  },
  and1:{
    color: "#fff",
  },
  caption: {
    fontSize: 12,
    color: "#fff",
  },
  captionBtn: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errors: {
    fontSize: 12,
    color: 'red',
    marginLeft: 13,
    fontFamily: 'Montserrat-Medium',
  },
  materialUnderlineTextbox: {
    width: "95%",
    height: 50,
    marginLeft: 10,
    marginTop: 15,

    padding: 5,
    marginBottom: 12
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
    textAlign: "left"
  },
  
  materialButtonViolet: {
    width: "95%",
    height: 61,
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
    borderRadius: 50,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },

  loremIpsum: {
    left: 0,
    color: "rgba(0,0,0,1)",
    position: "absolute",
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
  },
  materialButtonWithVioletText1: {
    top: 0,
    left: 241,
    width: 88,
    height: 36,
    position: "absolute"
  },
  loremIpsumStack: {
    width: '80%',
    height: 36,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
    marginLeft: 25,
    marginTop: 9,
    flexDirection: 'row'
  },
  loremIpsum2: {
    color: "#fff",
    fontSize: 11,
    marginTop: 2,
    marginLeft: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center'
  },
 
  cupertinoButtonBlueTextColor1: {
    top: 3,
    left: 27,
    width: 100,
    height: 44,
  },


  loremIpsum3StackStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "70%",
    height: 49,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  }
});

export default RegisterScreen;
