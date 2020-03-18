

import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect, Fragment} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text, TextInput,
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

import { Button, Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';
import axios from 'axios'

export default function SettingsScreen(props) {

  const [user, setUser] = useState([]); 

  const [isVisible, setVisible] = useState(false)
  const [toks, setToks] = useState('');

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [certificate, setCertificate] = useState("")


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
              <View>
              <Text style={styles.johnDoe}>{item.name}</Text>
              {item.email_public === true ? 'Email Hidden' :  <Text style={styles.johnGmailCom}>{item.email}</Text>}
             
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
            <Text style={styles.loremIpsum3}>  {moment(item.created_at, "YYYYMMDD").fromNow()} </Text>
            <Text style={styles.loremIpsum3}>{item.products_count}</Text>
            <Text style={styles.loremIpsum3}>{item.viewed}</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.smText}>Member Since</Text>
            <Text style={styles.smText}>Products</Text>
            <Text style={styles.smText}>Views</Text>
          </View>

        
          </View>

          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum3}>{item.following_count}</Text>
            <Text style={styles.loremIpsum3}>{item.followers_count}</Text>
            <Text style={styles.loremIpsum3}>{item.blocked_count}</Text>
          </View>


          <View style={styles.followingRow}>
            <Text style={styles.smText}>Following</Text>
            <Text style={styles.smText}>Followers</Text>
            <Text style={styles.smText}>Blocklist</Text> 
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
  ProfileSegment: {
    paddingLeft: 15,
    paddingRight: 15,
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
    fontSize: 15,
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
 
});





