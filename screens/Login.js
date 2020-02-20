import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialButtonWithShadow from "../components/MaterialButtonWithShadow";
import MaterialButtonPink1 from "../components/MaterialButtonPink1";

function Login(props) {
  return (
    <View style={styles.container}>

<Text style={styles.text}>LOGIN</Text>

    
<MaterialUnderlineTextbox
        textInput1=""
        style={styles.materialUnderlineTextbox}
      ></MaterialUnderlineTextbox>

      <MaterialRightIconTextbox
        style={styles.materialRightIconTextbox}
      ></MaterialRightIconTextbox>

     


<MaterialButtonViolet
       navigation={props.navigation}
        style={styles.materialButtonViolet}
      ></MaterialButtonViolet>

<View style={styles.blueBack}>





<View style={styles.buttonAll}>
<View style={styles.materialButtonViolet1Stack}>
        <MaterialButtonViolet1
        navigation={props.navigation}
          style={styles.materialButtonViolet1}
        ></MaterialButtonViolet1>

        <FontAwesomeIcon
          name="facebook-square"
          style={styles.icon}
        ></FontAwesomeIcon>
      </View>

 
    

      <View style={styles.materialButtonPink1Stack}>
        <MaterialButtonPink1
        navigation={props.navigation}
          style={styles.materialButtonPink1}
        ></MaterialButtonPink1>
        <FontAwesomeIcon name="google" style={styles.icon2}></FontAwesomeIcon>
      </View>
</View>

      <MaterialButtonWithShadow
      navigation={props.navigation}
        style={styles.materialButtonWithShadow}
      ></MaterialButtonWithShadow>



<Text style={styles.we}>
        We won&#39;t share your personal details with anyone
     
        If you continue, you are accepting Kogakam
      </Text>

      <View style={styles.cupertinoButtonBlueTextColorRow}>
      
        
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  blueBack: {
    backgroundColor: '#4630EB',
    marginTop: 20,
    paddingTop: 40,
    paddingBottom: 40,
    height: '55%'
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
    marginLeft: 10
  },
  materialRightIconTextbox: {
    width: "95%",
    height: 43,
    marginTop: 30,

    marginLeft: 10
  },
  materialUnderlineTextbox: {
    width: "95%",
    height: 43,
    marginLeft: 10,
    marginTop: 30,
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
    marginTop: 70,
    alignSelf: 'center'
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
  }
});

export default Login;
