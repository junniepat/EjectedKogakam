

import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect, Fragment} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, AsyncStorage, TextInput
} from 'react-native';

import MaterialButtonWithVioletText from "../components/MaterialButtonWithVioletText";
import MaterialSearchBar from "../components/MaterialSearchBar";

import { Ionicons } from '@expo/vector-icons';

import axios from 'axios'
import moment from 'moment';

import { Button, Overlay, SocialIcon } from 'react-native-elements';

export default function Profile(props) {
  const [toks, setToks] = useState(null);
  const [comment, setComment] = useState("")
  const [reason, setReason] = useState("")
  const [isVisible, setVisible] = useState(false)
  const [data, setData] = useState({ user: [] });
  const [userData, setuserData] = useState({ comments: [], blocked: [], followers:[], products:[], following: []  });

  const [, forceUpdate] = useState();

  
  useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          `/user_detail/${props.navigation.getParam('itemId')}`
        );  
        setData(result.data.successData);
      }; 

      const fetchUser = async () => {
        const result = await axios.get(
          `/user_detail/${props.navigation.getParam('itemId')}`
        )
          setuserData(result.data.successData.user);
      };

      fetchUser(); 
      fetchData();  
  }, []);



 
  async function follow() {

    const formData = new FormData();
    formData.append('user_id', props.navigation.getParam('itemId'));
  

        await axios.post(
          `follow_user`, formData
        )
        .then(response => 
          { 
            console.warn(response)
            // onSuccess(response);
          })
      .catch(error => {
        // setLoading(false)
        // setError(error.message)
      })
      
      setTimeout(forceUpdate, 2000);
    }


    
  async function unfollow() {

    const formData = new FormData();
    formData.append('user_id', props.navigation.getParam('itemId'));
  

        await axios.post(
          `https://kogakam.com/api/v1/unfollow_user`, formData
        )
        .then(response => 
          { 
            console.warn(response)
            // onSuccess(response);
          })
      .catch(error => {
        // setLoading(false)
        // setError(error.message)
      })
      
    }


    async function addReport() {

      const formData = new FormData();
      formData.append('reported_user', props.navigation.getParam('itemId'));
      formData.append('comment', comment);
      formData.append('reason', reason);
      
  
          await axios.post(
            `https://kogakam.com/api/v1/report_user`, formData
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
  

      async function addComment() {

        const formData = new FormData();
        formData.append('user_id', props.navigation.getParam('itemId'));
        formData.append('comment', comment);
        
    
            await axios.post(
              `https://kogakam.com/api/v1/add_comment`, formData
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
    
    
  
 async function upvote() {
  const formData = new FormData();
  formData.append('user_id', props.navigation.getParam('itemId'));
      await axios.post(
        `https://kogakam.com/api/v1/up_vote`, formData
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


  async function downvote() {
    const formData = new FormData();
    formData.append('user_id', props.navigation.getParam('itemId'));
        await axios.post(
          `https://kogakam.com/api/v1/down_vote`, formData
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
  

    async function block() {
      const formData = new FormData();
      formData.append('user_id', props.navigation.getParam('itemId'));
          await axios.post(
            `https://kogakam.com/api/v1/block_user`, formData
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


      async function unblock() {
        const formData = new FormData();
        formData.append('user_id', props.navigation.getParam('itemId'));
            await axios.post(
              `unblock_user`, formData
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
   

    <View style={styles.container}>
    <ScrollView style={styles.container}>
        
<View style={styles.bgGradient}>
      
<MaterialSearchBar
      style={styles.materialSearchBar1}
    ></MaterialSearchBar>

<View style={styles.roundedCover}>
          <View style={styles.rounded}>
          <Image
      source={{uri: `${data.user['image']}`}} 
      resizeMode="cover"
      style={styles.profileIm}
    ></Image>

          </View>

          <View style={styles.johnDoeColumn}>
            <Text style={styles.johnDoe}>{data.user['name']}</Text>
            <Text style={styles.johnGmailCom}>{data.user['email']}</Text>
          </View>
        
        </View>


<View style={styles.Wrapdetails}>

        <View style={{borderBottomColor: '#f2f2f2',paddingBottom:5, marginBottom: 5, borderBottomStyle: 'solid', borderBottomWidth: 1}}>
            <View style={styles.loremIpsum3Row}>
              <Text style={styles.loremIpsum3}>{moment(data.user['created_at'], "YYYYMMDD").fromNow()} </Text>
              <Text style={styles.loremIpsum3}>{data.user['products_count']}</Text>
              <Text style={styles.loremIpsum3}>{data.user['viewed']}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.memberSince}>Member Since</Text>
              <Text style={styles.products}>Products</Text>
              <Text style={styles.views}>Views</Text>
            </View>        
        </View>

        <View style={styles.loremIpsumRow}>
          <Text style={styles.loremIpsum3}>{data.user['following_count']}</Text>
          <Text style={styles.loremIpsum3}>{data.user['followers_count']}</Text>
          <Text style={styles.loremIpsum3}>{data.user['blocked_count']}</Text>
        </View>


        <View style={styles.followingRow}>
          <Text style={styles.memberSince}>Following</Text>
          <Text style={styles.products}>Followers</Text>
          <Text style={styles.views}>Blocklist</Text>
        </View>


    </View>
</View>


    
    <View style={{flexDirection: 'row', marginLeft: 5,}}>

       <TouchableOpacity
          onPress={()=> upvote()} style={styles.roundedBtn}>
          <Text style={styles.roundedText}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'} size={18} color="#555" style={{marginRight: 6,}} />
         
          </Text>
          <Text style={styles.loremIpsum3}>  {data.user['upvote_count']}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={()=> downvote()}  style={styles.roundedBtn}>
          <Text style={styles.roundedText}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-thumbs-down' : 'md-thumbs-down'} size={18} color="#555" style={{marginRight: 6,}} />
     
          </Text>
          <Text style={styles.loremIpsum3}>{data.user['downvote_count']}</Text>
        </TouchableOpacity>
    

        {data.user['is_blocked'] == 0 ? ( 
            <TouchableOpacity
            onPress={()=> block()}  style={styles.roundedBtn1}>
            <Text style={styles.roundedText1}>Block</Text>
          </TouchableOpacity>

        ):  (
          <TouchableOpacity
          onPress={()=> unblock()} style={styles.roundedBtnred}>
          <Text style={styles.roundedTextwhite}>Unblock</Text>
        </TouchableOpacity>
        )}
      
   

        {data.user['is_blocked'] == 0 ? ( 
          <TouchableOpacity
            style={styles.followBtn} onPress={()=> follow()}> 
            <Text style={styles.roundedText2}>
            <Ionicons name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'} size={15} color="#555" />
          
            </Text>
          </TouchableOpacity>) : (
             <TouchableOpacity
             style={styles.followBtn} onPress={()=> unfollow()}> 
             <Text style={styles.roundedText2}>
             <Ionicons name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'} size={15} color="#555" />
          
             </Text>
           </TouchableOpacity>
          )}
        </View>


    


    <View
    style={styles.materialUnderlineTextbox}>
  <TextInput
      placeholder={"Comment"}
      style={styles.inputStyle}
      onChangeText={text => setComment(text)}
      value={comment}
    ></TextInput>
  </View>


  <View style={{marginLeft: 9, marginRight: 9}}>
        <Button
          title={'Comment'}
          style={styles.materialButtonViolet}
          onPress={()=> addComment()}> 
        >
        </Button>
</View>

{userData.comments.map(item => (
  <View style={styles.comment}>
    
    <View style={{flexDirection: 'row', borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom:5}}>
      <Image
        source={{uri: `${item.writer['image']}`}} 
        resizeMode="cover"
        style={styles.profileImg}
      ></Image>

      <View>
        <Text style={styles.johnDoe2}>{item.writer['name']}</Text>
        <Text style={styles.created_at}>{item.created_at}</Text>
      </View>
    </View>

    <Text style={styles.justText}>{item.comment}</Text>

  </View>
))}


<Text style={styles.johnDoe}>Products</Text>

 
<View style={styles.scrollAreaStack}>
          <View 
             style={styles.scrollArea_contentContainerStyle}>

{userData.products.map(item => (
      <>
<TouchableOpacity  key={item.id} style={styles.materialCard5}  onPress={()=>{props.navigation.navigate('ProductView', 
{
  itemId: id,
})}}>
<View>
  <Image
    source={require("../assets/images/slide3.jpg")}
    resizeMode="cover"
    style={styles.cardItemImagePlace}
  ></Image>

  <View style={styles.titleStyleStack}>
    <Text style={styles.titleStyle}>{item.currency} {item.price}</Text>
    <Text style={styles.subtitleStyle}>{item.title}</Text>
  </View>
  <View style={styles.locationRow}>
   
    <Text style={styles.location}>  
    <Ionicons name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} size={12} color="#555" style={{marginRight: 6,}} />
{item.location.substring(0,17)}</Text>
    

    <Text style={styles.loremIpsum}>23 Hrs</Text>
  </View>
</View>
</TouchableOpacity>


</>
))}
                  </View>
         </View>
   

</ScrollView>


<Overlay  isVisible={isVisible}  onBackdropPress={() => setVisible(false)}>
    <Text style={styles.report}>Report User</Text>

    <View
    style={styles.materialUnderlineTextbox2}>
  <TextInput
      placeholder={"Comment"}
      style={styles.inputStyle2}
      onChangeText={text => setComment(text)}
      value={comment}
    ></TextInput>
  </View>

  <View
    style={styles.materialUnderlineTextbox2}>
  <TextInput
      placeholder={"Reason"}
      style={styles.inputStyle2}
      onChangeText={text => setReason(text)}
      value={reason}
    ></TextInput>
  </View>

  
  <View style={{marginLeft: 9, marginRight: 9}}>
        <Button
          title={'Report'}
          style={styles.materialButtonViolet}
          onPress={()=> addReport()}> 
        >
        </Button>
</View>
</Overlay>

        <Button
          title='Report User'
          button
          style={{color: '#333', marginRight: 10}}
          onPress={()=> setVisible(true)}> 
        />
        </Button>

  </View>
    
  );
}

Profile.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  materialButtonRed: {
    width: "95%",
    height: 51,
    marginTop: 32,
    marginLeft: 10,
    marginBottom: 25,


    backgroundColor: "red",
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
  bgGradient: {
    backgroundColor: '#2B60DE',
    paddingBottom: 5,
    marginBottom: 5
  },
  materialCard: {
    top: 30,
    left: 3,
    right: 10,
    width: "47%",
    height: 185,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 6,

    borderColor: '#f2f2f2',
    borderStyle: "solid",
    borderWidth: 1,
  
    
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  comment: {
    borderRadius:5, 
    borderColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 5,
    paddingBottom: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,

    elevation: 2,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#f2f2f2",
    shadowOpacity: 0.70,
    shadowRadius: 5
  },
  followBtn:{
    height: 35,
    marginLeft: 5,

    fontFamily: 'Montserrat-Medium',

    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight:2,
    paddingLeft: 2,
    elevation: 2,
    minWidth: 58,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  roundedBtn: {
    width: "20%",
    height: 35,
    marginLeft: 5,

    fontFamily: 'Montserrat-Medium',

    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 5,
    paddingLeft: 5,
    elevation: 2,
    minWidth: 58,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  roundedBtn1: {
    width: "32%",
    height: 35,
    marginLeft: 5,

    fontFamily: 'Montserrat-Medium',

    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 5,
    paddingLeft: 5,
    elevation: 2,
    minWidth: 58,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  roundedBtnred: {
    width: "35%",
    height: 35,
    marginLeft: 10,

    fontFamily: 'Montserrat-Medium',

    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 5,
    paddingLeft: 5,
    elevation: 2,
    minWidth: 58,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  roundedText: {
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    fontSize: 24
  },
  roundedText1: { 
    fontFamily: 'Montserrat-Medium',
    color: '#000'
  },
  roundedTextwhite: {
    fontFamily: 'Montserrat-Medium',
    color: '#fff'
  },
  roundedText2: {
    fontFamily: 'Montserrat-Medium',
    color: '#333'
  },
  materialButtonViolet: {
    width: "95%",
    height: 51,
    marginTop: 32,
    marginLeft: 10,
    marginBottom: 25,

    fontFamily: 'Montserrat-Medium',

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
    marginBottom: 12
  },
  materialUnderlineTextbox2: {
    width: "95%",
    height: 100,
    marginLeft: 10,
    marginTop: 10,

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
  profileImg: {
    height: 41,
    width: 41,
    borderRadius: 50,
    backgroundColor: '#333',
    alignSelf: 'flex-start', 
    alignItems: 'center',
    alignContent: 'center'
  },

  roundedCover: {
    marginLeft: 10, 
    marginTop: 1,
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
    color: "#F0FFFF",
    fontSize: 13,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
  },
  johnDoe2: {
    color: "rgba(0,0,0,1.5)",
    fontSize: 13,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
    marginTop: 7,
    marginLeft: 5,
  },
  justText: {
    color: "rgba(0,0,0,1.2)",
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    marginTop: 7,
    marginLeft: 5,
  },
  created_at: {
    color: "rgba(0,0,0,1.5)",
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    marginTop: 1,
    marginLeft: 5,
  },
  johnGmailCom: {
    color: "#F0FFFF",
    fontSize: 10,
    marginTop: 3,
    fontFamily: 'Montserrat-Medium',
  },
  report: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
    marginTop: 3,
    marginLeft: 9,
    
    fontFamily: 'Montserrat-Medium',
  },
  johnDoeColumn: {
    width: 156,
    marginLeft: 15,
    marginBottom: 21,
    marginTop: 12 
  },
  memberSince: {
    color: "#F0FFFF",
    fontSize: 11,
    width: '33%',
    marginRight: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  products: {
    color: "#F0FFFF",
    fontSize: 11,
    marginRight: 8,
    width: '33%',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  views: {
    color: "#F0FFFF",
    fontSize: 11,
    width: '33%',
    fontFamily: 'Montserrat-Medium',
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
    color: "#fff",
    fontSize: 11,
    width: '33%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  scrollAreaStack: {
    width: '100%',
  },
  scrollArea_contentContainerStyle: {
    top: 4,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 10,

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  materialCard5: {
    top: 30,
    left: 3,
    right: 10,
    width: "49%",
    height: 185,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,

    overflow: "hidden",
    paddingBottom: 5,
    marginBottom: 5,

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  cardItemImagePlace: {
    height: 75,
    flex: 1,
    backgroundColor: "#333",
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  titleStyle: {
    top: 0,
    left: 0,
    width: 105,
    height: 28,
    color: "#000",
    fontSize: 12,
    textAlign: "left",
    fontFamily: 'Montserrat-Medium',
  },
  subtitleStyle: {
    top: 20,
    left: 2,
    width: '100%',
    height: 10,
    color: "#000",
    position: "absolute",
    opacity: 0.5,
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 10,
    textTransform: 'uppercase'
  },
  titleStyleStack: {
    width: 105,
    height: 38,
    marginTop: 6,
    marginLeft: 9
  },
  location: {
    color: "rgba(0,0,0,1)",
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    height: 30
  },
  loremIpsum: {
    color: "rgba(0,0,0,1)",
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 8,
    height: 30
  },
  locationRow: {
    height: 8,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 5,
    width: '82%'
  }

 
});





