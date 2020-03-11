import React , {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


import axios from 'axios'

function MaterialCardWithImageAndTitle(props) {
  const [data, setData] = useState({ chats: [], unread_count: 0 });
  const [toks, setToks] = useState('');
 
  useEffect(() => {
    AsyncStorage.getItem("token")
    .then((result)=> {
      setToks(result.replace(/"/g, ""))
      console.warn("tokenh", toks) 
    }) 


    const fetchData = async () => {
      const result = await axios.get(
        'https://kogakam.com/api/v1/get_chats', {
          headers: {
            app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag=',
            session_token: toks
          }
        }
      );  
      setData(result.data.successData);
    };
    fetchData();

  }, []);



  return (
    <View style={[styles.container, props.style]}>


{data.chats.map((item, index) => (
         <>
      <TouchableOpacity   onPress={()=>{props.navigation.navigate('inboxView')}}>
      <View style={styles.cardBody}>
      <Image
          source={require("../assets/images/slide3.jpg")}
          style={styles.cardItemImagePlace}
        ></Image>
        <View style={styles.bodyContent}>
          <View style={styles.cardBody}>
          <Text style={styles.titleStyle}>Jon Doe </Text>
          <Text style={styles.time}>3 mins ago</Text>
          </View>
          <Text style={styles.subtitleStyle}>...a few content spoken of ere</Text>
          
        </View>
    
      </View>
      </TouchableOpacity>
    
    
      </>
       ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    
    overflow: "hidden"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
 
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 14,
    borderRadius: 2,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: "rgba(16,108,199,1)",
    paddingBottom: 2,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  subtitleStyle: {
    color: "#333",
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Montserrat-Medium',
  },
  time: {
    color: "#333",
    opacity: 0.5,
    fontSize: 10,
    lineHeight: 22,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    fontFamily: 'Montserrat-Medium',
  },
  cardItemImagePlace: {
    width: 48,
    height: 48,
    backgroundColor: "#ccc",
    margin: 16,
    borderRadius: 50
  }
});

export default MaterialCardWithImageAndTitle;
