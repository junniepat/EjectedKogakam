import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView,
  Animated, KeyboardAvoidingView, TouchableOpacity  } from "react-native";

  

import { Button } from 'react-native-elements';
import Logic from '../utils/logic'
import axios from 'axios'
import LocateScript from '../components/Location'

import MaterialButtonWithVioletText1 from "../components/MaterialButtonWithVioletText1";

const RegisterScreen = (props) => {


  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  const [btnText, setbtnText] = useState("Register")
  const [disableBtn, setDisableBtn] = useState(false)

  const [user, setUser] = useState(null); 

 
  const onsubmit = e => {
    setDisableBtn(true)
    setbtnText('...Registering')
    
      if(email === ''){
        console.warn('fool')
      }
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);

      formData.append('address', address);
  
      axios.post('https://kogakam.com/api/v1/register', 
    formData,
      {
        headers: {
          app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
        }
      }  )
      .then(res => {
        setUser(user)
        
      })
      .catch(error => {
        console.warn(error)
        setbtnText('Register')
        setDisableBtn(false)
        setUser(null)})
    }
    



  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <Animated.View style={[styles.container, ]}>
   
      <Text style={styles.text}>REGISTER</Text>


      <ScrollView>
     <LocateScript/>
     
      <View
      style={styles.materialUnderlineTextbox}>
    <TextInput
        placeholder={"Full Name"}
        style={styles.inputStyle}
        onChangeText={text => setFullname(text)}
        value={fullname}
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
        placeholder={"Password"}
        style={styles.inputStyle}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      ></TextInput>
    </View>

  


    

        <View style={{marginLeft: 9, marginRight: 9}}>
  <Button
            title={btnText}
            style={styles.materialButtonViolet}
            disabled={disableBtn}
            onPress={()=> onsubmit()}> 
          >

          </Button>
  

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
    </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0
  },
  blueBack: {
    backgroundColor: '#4630EB',
    marginTop: 20,
    paddingTop: 40,
    paddingBottom: 120,
    height: '65%'
  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 19,
    
    marginTop: 59,
    marginLeft: 126,
    marginBottom: 20,
    fontFamily: 'Montserrat-Medium',
  },
  and1:{
    color: "#fff",
  },
  caption: {
    fontSize: 12,
    color: "#fff",
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
    marginTop: 5,

    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
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
    borderRadius: 2,
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
    width: '95%',
    height: 36,
    alignContent: 'center',
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
