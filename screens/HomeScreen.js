import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Picker, AsyncStorage
} from 'react-native';

import MaterialCard5 from "../components/MaterialCard5";

import MaterialSearchBar from "../components/MaterialSearchBar";
import Services from "../components/services"
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios'
export default function HomeScreen(props) {
  
  const [data, setData] = useState({ cats: [] });
  const [user, setUser] = useState(''); 

  const [toks, setToks] = useState(null);



  useEffect(() => {
    AsyncStorage.getItem("token")
    .then((result)=> {
      setToks(result)
      console.warn("tokenh", result)
    })
  
    AsyncStorage.getItem("user")
    .then((result)=>
    { 
      setTimeout(() => {
        setUser(JSON.parse(result))
      }, 1000)
      console.warn("user", user)

    })
   
  }, []) 


//  AsyncStorage.removeItem("token")

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'get_mobile_cats'
      );  
      setData(result.data.successData);
    };
    fetchData();

  

  }, []);
  



  return (
    <View style={styles.container}>

<View style={{flexDirection: 'row', justifyContent: 'space-between', 
    marginTop: 32, marginBottom: 5, width: '98%' }}>
    <View>
          <Picker
        style={styles.picker}>
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Arabic" value="Arabic" />
      </Picker>
    </View>


    <View>
      <Text>
        <Ionicons name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} size={12} color="#555" style={{marginRight: 6,}} />
        &nbsp; Location
      </Text>
    </View>
</View>

<MaterialSearchBar
        style={styles.materialSearchBar1}
        navigation={props.navigation}
      ></MaterialSearchBar>


<ScrollView>

    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.loremIpsum}>Browse Categories 
          </Text>



      <View style={styles.seeAll}>
      <TouchableOpacity onPress={() => props.navigation.push('SeeAll')}>
      <Text style={styles.loremIpsum}>SEE ALL</Text>
    </TouchableOpacity>
      </View>
    </View>


<View style={styles.scrollArea2StackRow}>
{data.cats.map((item, index) => (
      <>
         
<Services key={index} id={item.id} style={{width: '100%'}} color={item.color} roundedName={item.cat.title} id={item.id}  navigation={props.navigation} >


<Image
   source={{uri: 'https://www.kogakam.com/storage/app/cat_images/'  + `${item.cat.image}` }} 
   resizeMode="cover"
   style={{width: 31, height: 31}} 
 ></Image> 

</Services>
         
         {/* <Services color="#f8dd3c"  roundedName="Electronics &amp; Computers"  navigation={props.navigation}  >
<Image
            source={require("../assets/images/monitor.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>


            <Services color="#23e5d8"  roundedName="Vehicles" navigation={props.navigation}  >
<Image
            source={require("../assets/images/car.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>

            <Services color="#d2b982"  roundedName="Fashion &amp; Beauty " navigation={props.navigation}  >
<Image
            source={require("../assets/images/shirt.png")}
            resizeMode="center"
            style={{width: 22, height: 22}}  
         />
</Services>
            <Services color="#8df1ee"  roundedName="Services" navigation={props.navigation}  >
<Image
            source={require("../assets/images/key.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>
            <Services color="#cddcff"  roundedName="Kids" navigation={props.navigation}  >
<Image
            source={require("../assets/images/babycart.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>

            <Services color="#ff645c"  roundedName="Animals" navigation={props.navigation}  >
<Image
            source={require("../assets/images/paw.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>
            <Services color="#ffe894"  roundedName="Accessories" navigation={props.navigation}  >
<Image
            source={require("../assets/images/Guitar.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>
            <Services color="#ff645c"  roundedName="Jobs" navigation={props.navigation}  >
<Image
            source={require("../assets/images/job.png")}
            resizeMode="center"
            style={{width: 22, height: 22}} 
         />
</Services>   */}

</>
 ))}
               </View>   


             
  
 <View style={styles.scrollAreaStack}>

     <Text style={styles.loremIpsum2}>Fresh Recommendations</Text>

         <View 
            style={styles.scrollArea_contentContainerStyle}>
            <MaterialCard5  navigation={props.navigation} style={styles.materialCard5}></MaterialCard5>
        </View>
        </View>
       
      
     


</ScrollView>
  
</View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  seeAll:{
    alignSelf: 'flex-end',
  },
  materialButtonWithVioletText: {
    alignSelf: 'flex-end',
  },
  scrollArea2StackRow: {
    width: undefined,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  materialSearchBar1: {
    width: "97%",
    height: 46,
    marginLeft: 6,

    marginBottom: 10,

    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  
  materialCard5: {
    top: 30,
    left: 3,
    right: 10,
    width: "49%",
    height: 185,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  scrollArea_contentContainerStyle: {
    top: 4,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 10,
  },


  scrollAreaStack: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    paddingTop: 10,
    paddingBottom: 10
  },

  loremIpsum2: {
    color: "rgba(0,0,0,1)",
    fontSize: 13,
    marginLeft: 10,
    fontFamily: 'Montserrat-Medium',
  },

  loremIpsum: {
    color: "#525c7a",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 8,
    marginRight: 15,
    fontFamily: 'Montserrat-Medium',
  },
  userName: {
    color: "#525c7a",
    fontSize: 16, 
    marginTop: 1,
    marginBottom: 5,
    marginLeft: 8,
    fontFamily: 'Montserrat-Medium',
  },
  
  developmentModeText: {
    marginBottom: 30,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  picker: {
    height: 30, 
    width: 170,
    borderBottomColor: '#233159',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontFamily: 'Montserrat-Medium',
  }

});
