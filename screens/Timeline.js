import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import MaterialBasicFooter from "../components/MaterialBasicFooter";

function Timeline(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.chooseACategory}>What are you offering</Text>


        <ScrollView>
      <View style={styles.scrollAreaStack}>
          
      
     


        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
            <Image
            source={require("../assets/images/shop.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Shop</Text>
        </TouchableOpacity>
        </View>


        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
            
            <Image
            source={require("../assets/images/monitor.png")}
            resizeMode="center"
            style={styles.ImageIcon} 
         />
          <Text style={styles.mobilePhones2}>Electronics &amp; Computers</Text>
       
        </TouchableOpacity>
        </View>




        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
            <Image
            source={require("../assets/images/car.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Vehicles</Text>
         
        </TouchableOpacity>
</View>        




<View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}>
            <Image
            source={require("../assets/images/shirt.png")}
            resizeMode="center"
            style={styles.ImageIcon}   
         />
          <Text style={styles.mobilePhones2}>Fashion &amp; Beauty</Text>
       
        </TouchableOpacity></View>


        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
            <Image
            source={require("../assets/images/key.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Services</Text>
          
        </TouchableOpacity>
        </View>




        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
           
            <Image
            source={require("../assets/images/babycart.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Kids</Text>
          

        </TouchableOpacity>
        </View>

        

        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
           
            <Image
            source={require("../assets/images/paw.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Animals</Text>
        
        </TouchableOpacity>
        </View>




        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
            
            <Image
            source={require("../assets/images/Guitar.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Accessories</Text>
         

        </TouchableOpacity>
        </View>



        <View style={styles.button2}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddProducts")}
        >
            <Image
            source={require("../assets/images/job.png")}
            resizeMode="center"
            style={styles.ImageIcon}  
         />
          <Text style={styles.mobilePhones2}>Jobs</Text>
         

        </TouchableOpacity>
        </View>


         


      </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea: {
    top: 0,
    left: 9,
    width: 358,
    height: 485,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    opacity: 0
  },
  scrollArea_contentContainerStyle: {
    width: 358,
    height: 471
  },
  scrollAreaStack: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
alignContent:'center',
  },

  chooseACategory: {
    color: "#121212",
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
    marginTop: 9,
    marginLeft: 16
  },
ImageIcon: {
  width: 44, 
  height: 44,
  alignSelf: 'center'
},
  button2: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    borderRadius: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    overflow: "hidden",
    paddingBottom: 5,
    paddingTop: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    width: '46%',
    height: 120,
    fontSize: 10,
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    marginTop: 24,
  },
  mobilePhones2: {
    color: "#121212",
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
    textAlign: 'center',
  },
  button3: {
    top: 27,
    left: 203,
    width: 140,
    height: 118,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(230,447,447,1)"
  },
  
});

export default Timeline;
