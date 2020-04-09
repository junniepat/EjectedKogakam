import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, ToastAndroid,  TouchableOpacity, TextInput, AsyncStorage } from "react-native";

import Toast from 'native-base';


import * as api from "../services/service";
import { useAuth } from "../provider";

import { Button, SocialIcon } from 'react-native-elements';
import axios from 'axios'

// CONTEXT ===================================
const AuthContext = React.createContext();



function ForgotPassword(props) {

  const {navigation} = props;
  const {navigate} = navigation;

 
 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [btnText, setbtnText] = useState("Login")
  const [disableBtn, setDisableBtn] = useState(false)

  const [token, setToken] = useState(null); 
  const [user, setUser] = useState(null); 

  const [Message, setMessage] = useState('')


  // useEffect(() => {
  //   AsyncStorage.getItem("token")
  //   .then((result)=>
   
  //   {
     
  //     if(result !== null){
  //       props.navigation.navigate('Home', {
  //         token: result
  //       })
  //     }
  //   })
   

   
  // }, [])
  

  
 async function onsubmit() {

  setDisableBtn(true)
  setbtnText('...logging you in')

  if (email == null) {
    console.warn('exploded')
  }

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);


      await api.login(formData)
      .then(response => 
        { 
          setMessage('success')
          console.warn(response)
          // onSuccess(response);
          setbtnText('Success')
          setDisableBtn(false);


          setUser(response.user)
          setToken(response.session.session_key)
          console.warn('res', response.user)
          axios.defaults.headers.common['session_token'] = response.session.session_key;

          AsyncStorage.setItem("token", JSON.stringify(response.session.session_key)).then(
            () => AsyncStorage.getItem("token")
                  .then((result)=> {
                    console.warn("token", result)
                    
                    setTimeout(() => {
                      props.navigation.navigate('Settings', {
                        token: response.session.session_key,
                      })
                    }, 1500);
                  
                  })
         )
       

         AsyncStorage.setItem("email_status", JSON.stringify(response.user.email_status)).then(
          () => AsyncStorage.getItem("email_status")
                .then((result)=>console.warn(result))
        )
        
         AsyncStorage.setItem("user", JSON.stringify([response.user])).then(
          () => AsyncStorage.getItem("user")
                .then((result)=>console.warn(result))
        )
         

        })
    .catch(error => {

      console.warn(error)

      setMessage(error)

      setbtnText('Login')
      setDisableBtn(false)
      setToken(null)
    })
    
  }


// AsyncStorage.removeItem("token")


 
 
  
  return (
    <View style={styles.container}>

<Text style={styles.text}>Forgot Password </Text>



<Text>{Message}</Text>

    <View
      style={styles.materialUnderlineTextbox}>
    <TextInput
        placeholder={"Email Address"}
        style={styles.inputStyle}
        onChangeText={text => setEmail(text)}
        value={email}
      ></TextInput>
    </View>
 


  <View style={{marginLeft: 4, marginRight: 9}}>
          <TouchableOpacity
            style={styles.materialButtonViolet}
            disabled={disableBtn}
            onPress={()=> onsubmit()}> 
          <Text style={styles.captionBtn}> Reset Password </Text>
          </TouchableOpacity>
  </View>



<View style={styles.blueBack}>

<TouchableOpacity style={{marginBottom: 30}} onPress={()=>{props.navigation.navigate('Login')}}
       style={styles.RegisterBtn}>
        <Text style={styles.captionBtnr}>Login</Text>
      </TouchableOpacity>


<Text style={styles.we}>
        We won&#39;t share your personal details with anyone
     
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  RegisterBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    width: '95%',
    height: 50,
    marginLeft: 9,
    borderRadius: 50

  },
  captionBtnr: {
    color: "#0F52BA",
    fontSize: 18,
    fontWeight: 'bold',
    
    fontFamily: 'Montserrat-Medium',
  },
  blueBack: {
    backgroundColor: '#4630EB',
    marginTop: 230,
    paddingTop: 50,
    paddingBottom: 40,
    height: '70%'
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
    textAlign: "left"
  },
  buttonAll: {
    flexDirection: 'row', 
    marginTop: 4,
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  materialButtonViolet: {
    width: "97%",
    height: 51,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,


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

  caption: {
    color: "#fff",
    fontSize: 14,
  },

  materialUnderlineTextbox: {
    width: "95%",
    height: 50,
    marginLeft: 10,
    marginTop: 10,

    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 22
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
    
    marginTop: 59,
    textAlign: 'center',
    marginBottom: 30,
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
  captionBtn: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  and1: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
    marginRight:5
  },
  forgot: {
    fontSize: 15,
    color: '#555',
    marginRight:10,
    fontWeight: '700',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default ForgotPassword;