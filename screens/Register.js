import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView,
  Animated, KeyboardAvoidingView, TouchableOpacity  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Logic from '../utils/logic'

import MaterialButtonWithVioletText1 from "../components/MaterialButtonWithVioletText1";

const RegisterScreen = (props) => {

  const { control, handleSubmit, errors, register } = useForm();

  const onSubmit = data => {
    const register = new Logic()
    register.Register(`/register`, data)

    

  };
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
     
      <Controller
       style={styles.materialUnderlineTextbox1}
        as={<TextInput />}
        control={control}
        placeholder="full name"
        name="name"
        onChange={onChange}
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.fullName && <Text style={styles.errors}>This is required.</Text>}


      <Controller
       style={styles.materialUnderlineTextbox1}
        as={<TextInput />}
        control={control}
        placeholder="Email Address"
        name="email"
        onChange={onChange}
        rules={{ required: true }}
        ref={register({ pattern: /^[A-Za-z]+$/i })} 
        defaultValue=""
      />
      {errors.email && <Text style={styles.errors}>This is required.</Text>}


      <Controller
       style={styles.materialUnderlineTextbox1}
        as={<TextInput />}
        control={control}
        placeholder="Phone"
        name="phone"
        keyboard={'numeric'}
        onChange={onChange}
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.phone && <Text style={styles.errors}>This is required.</Text>}



      <Controller
       style={styles.materialUnderlineTextbox1}
        as={<TextInput />}
        control={control}
        placeholder="Address"
        name="address"
        onChange={onChange}
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.address && <Text style={styles.errors}>This is required.</Text>}



      <Controller
       style={styles.materialUnderlineTextbox1}
        as={<TextInput />}
        control={control}
        placeholder="Password"
        name="password"
        secureTextEntry={true}
        onChange={onChange}
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && <Text style={styles.errors}>This is required.</Text>}



    
<View style={styles.materialButtonViolet2}>
  
<Button style={{backgroundColor: 'transparent'}}
      onPress={handleSubmit(onSubmit)} title="save"/>
</View>




      <View style={styles.loremIpsumStack}>
        <Text style={styles.loremIpsum}>Already have an account?</Text>

        <MaterialButtonWithVioletText1
         navigation={props.navigation}
          style={styles.materialButtonWithVioletText1}
        ></MaterialButtonWithVioletText1>
      </View>

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
   
   
      </ScrollView>
    </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 19,
    
    marginTop: 79,
    marginLeft: 126
  },
  caption: {
    fontSize: 12,
  },
  errors: {
    fontSize: 12,
    color: 'red',
    marginLeft: 13,
    fontFamily: 'Montserrat-Medium',
  },
  materialUnderlineTextbox1: {
    width: "93%",
    height: 43,
    marginTop: 13,
    marginLeft: 14,

    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  materialUnderlineTextbox2: {
    width: "93%",
    height: 43,
    marginTop: 17,
    marginLeft: 13
  },
  materialUnderlineTextbox3: {
    width: "93%",
    height: 43,
    marginTop: 193,
    marginLeft: 11
  },
  materialRightIconTextbox1: {
    width: "93%",
    height: 43,
    marginTop: -215,
    marginLeft: 14
  },
  materialRightIconTextbox2: {
    width: "93%",
    height: 43,
    marginTop: 14,
    marginLeft: 14
  },
  materialUnderlineTextbox4: {
    width: "93%",
    height: 43,
    marginTop: 18,
    marginLeft: 13
  },
  materialButtonViolet2: {
    width: "94%",
    height: 56,
    marginTop: 20,
    marginLeft: 12,

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
    color: "rgba(0,0,0,1)",
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
