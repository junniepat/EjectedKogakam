

import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect, Fragment} from 'react';
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

import LinearGradient from 'react-native-linear-gradient';
import ProfileSegment from '../components/segmentTabs'


export default function SettingsScreen(props) {

  const [user, setUser] = useState([]); 

  const [toks, setToks] = useState('');


  useEffect(() => {
    AsyncStorage.getItem("token")
    .then((result)=> { 
      setToks(result.replace(/"/g, ""))
      console.warn("tokenh", result)
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



  return (
    <>
    <View style={styles.container}>
    <View style={styles.bgGradient}>
    
<MaterialSearchBar
        style={styles.materialSearchBar1}
      ></MaterialSearchBar>


<>
    {user && user.map((item, index) => (
      <Fragment key={index}>
          
  
        
          
  <View style={styles.roundedCover}>
            <View style={styles.rounded}>
            <Image
        source={{uri: `${item.image}`}}
        resizeMode="cover"
        style={styles.profileIm}
      ></Image>
    
            </View>

            <View style={styles.johnDoeColumn}>
              <Text style={styles.johnDoe}>{item.name}</Text>
              <Text style={styles.johnGmailCom}>{item.email}</Text>
            </View>
          
          </View>

     
      <View style={styles.Wrapdetails}>

          <View style={{borderBottomColor: '#f2f2f2',paddingBottom:5, marginBottom: 5, borderBottomStyle: 'solid', borderBottomWidth: 1}}>
          
          <View style={styles.loremIpsum3Row}>
            <Text style={styles.loremIpsum3}>  {item.created_at} </Text>
            <Text style={styles.loremIpsum3}>{item.products_count}</Text>
    <Text style={styles.loremIpsum3}>{item.viewed}</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.memberSince}>Member Since</Text>
            <Text style={styles.products}>Products</Text>
            <Text style={styles.views}>Views</Text>
          </View>

        
          </View>

          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum3}>{item.following_count}</Text>
            <Text style={styles.loremIpsum3}>{item.followers_count}</Text>
            <Text style={styles.loremIpsum3}>{item.blocked_count}</Text>
          </View>


          <View style={styles.followingRow}>
            <Text style={styles.memberSince}>Following</Text>
            <Text style={styles.products}>Followers</Text>
            <Text style={styles.views}>Blocklist</Text>
          </View>

      </View>

    
      </Fragment>
))}
</>

    </View>

<ScrollView>
  
<View style={styles.ProfileSegment}>
      {user && user.map((item, index) => (
        <>
          
        </>
      ))}
       <ProfileSegment/> 
      </View>
</ScrollView>

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
    backgroundColor: '#f2f2f2',
  },
  ProfileSegment: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  materialSearchBar1: {
    width: "97%",
    height: 46,
    marginTop: 32,
    marginLeft: 6,

    marginBottom: 5,

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
    color: "rgba(0,0,0,1.5)",
    fontSize: 13,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
  },
  johnGmailCom: {
    width: 140,
    color: "rgba(0,0,0,1)",
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
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    width: '33%',
    marginRight: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  products: {
    color: "rgba(0,0,0,1)",
    fontSize: 11,
    marginRight: 8,
    width: '33%',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  views: {
    color: "rgba(0,0,0,1)",
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
    borderTopColor: '#ccc',
    borderStyle: 'solid'
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
    fontSize: 10,
    width: '33%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
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





