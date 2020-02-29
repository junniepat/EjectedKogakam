

import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, AsyncStorage
} from 'react-native';

import MaterialCard5 from "../components/MaterialCard5";
import MaterialBasicFooter from "../components/MaterialBasicFooter";
import MaterialButtonWithVioletText from "../components/MaterialButtonWithVioletText";
import MaterialSearchBar from "../components/MaterialSearchBar";
import Services from "../components/services"
import { MonoText } from '../components/StyledText';
import ProfileSegment from "../components/segmentTabs"

export default function SettingsScreen(props) {

  

  return (
    <View style={styles.container}>
<MaterialSearchBar
        style={styles.materialSearchBar1}
      ></MaterialSearchBar>

  <View style={styles.roundedCover}>
            <View style={styles.rounded}>
            <Image
        source={require("../assets/images/slide3.jpg")}
        resizeMode="cover"
        style={styles.profileIm}
      ></Image>
  
            </View>

            <View style={styles.johnDoeColumn}>
              <Text style={styles.johnDoe}>John Doe</Text>
              <Text style={styles.johnGmailCom}>john@gmail.com</Text>
            </View>
          
          </View>


<View style={styles.Wrapdetails}>

          <View style={{borderBottomColor: '#f2f2f2',paddingBottom:5, marginBottom: 5, borderBottomStyle: 'solid', borderBottomWidth: 1}}>
          
          <View style={styles.loremIpsum3Row}>
            <Text style={styles.loremIpsum3}>23 - 3 - 2020</Text>
            <Text style={styles.loremIpsum3}>233</Text>
            <Text style={styles.loremIpsum3}>233</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.memberSince}>Member Since</Text>
            <Text style={styles.products}>Products</Text>
            <Text style={styles.views}>Views</Text>
          </View>

        
          </View>

      <View style={styles.loremIpsumRow}>
        <Text style={styles.loremIpsum3}>233</Text>
        <Text style={styles.loremIpsum3}>233</Text>
        <Text style={styles.loremIpsum3}>233</Text>
      </View>


      <View style={styles.followingRow}>
        <Text style={styles.memberSince}>Following</Text>
        <Text style={styles.products}>Followers</Text>
        <Text style={styles.views}>Blocklist</Text>
      </View>

  

      </View>

      <ScrollView
        style={styles.container}>
          
      <View style={styles.ProfileSegment}>
        <ProfileSegment/>
      </View>
      
      </ScrollView>

    
    </View>
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
  ProfileSegment: {
    paddingLeft: 15,
    paddingRight: 15
  },
  materialSearchBar1: {
    width: "97%",
    height: 46,
    marginTop: 32,
    marginLeft: 6,

    marginBottom: 10,

    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid'
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
    marginTop: 10,
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
    color: "rgba(0,0,0,1.5)",
    fontSize: 15,
    textTransform: 'uppercase',

  },
  johnGmailCom: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    marginTop: 3
  },
  johnDoeColumn: {
    width: 96,
    marginLeft: 15,
    marginBottom: 21,
    marginTop: 12 
  },
  memberSince: {
    color: "rgba(0,0,0,1)",
    fontSize: 12,
    width: '33%',
    marginRight: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  products: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    marginRight: 8,
    width: '33%',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  views: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    width: '33%',
    textAlign: 'center'
  },
  Wrapdetails: {
    width: '80%',
    alignSelf: 'flex-end' 
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
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    width: '33%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
 
 
  following: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    
  },
  followers: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    marginLeft: 38,
    marginTop: 1
  },
  blocklist: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    
    marginLeft: 47
  },
 
});





