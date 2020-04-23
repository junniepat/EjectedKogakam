
import React, {useEffect, useState, Fragment} from 'react'
import  {View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'

export default function userType(props) {
  useEffect(() => {
      axios.defaults.headers.common['session_token'] = props.navigation.getParam('token')
console.warn(`'ok', ${props.navigation.getParam('token')}`)
  }, [])

        async function UserTypeAction(item) {
            console.warn(item)
            
             const formData = new FormData();
             formData.append('type', item);
         
           await axios.post('select_user_type', formData)
           .then(res => {
             console.warn(res, 'select_user_type')   
             props.navigation.navigate('Home');
           })
           .catch(error => {
             console.warn(error, 'select_user_type')}
             )
           }
   
 

    return (
        <Fragment style={styles.container}>
<Text>{props.navigation.getParam('session_token')}</Text>
        <TouchableOpacity style={styles.userType} onPress={()=> UserTypeAction('shop')}>
          <View>
              <Image 
                source={require("../assets/images/buyer-icon.png")}
                resizeMode="cover"
                style={styles.userTypeImg}
              ></Image>

              <Text style={styles.userTypeText}>Shop</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.userType} onPress={()=> UserTypeAction('user')}>
          <View>
              <Image
                source={require("../assets/images/seller-icon.png")}
                resizeMode="cover"
                style={styles.userTypeImg}
              ></Image>
              <Text style={styles.userTypeText}>User</Text>
          </View>
        </TouchableOpacity>

        </Fragment>
            )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignContent: 'center',
    alignItems: 'center'
  },
  userType: {
    paddingTop: '30%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  userTypeImg: {
    height: 200,
    width: 200,
    borderRadius: 8,
    borderColor: '#f2f2f2',
    borderWidth: 6,
  },
  userTypeText: {
    color: '#0F52BA',
    marginTop: 5,
    fontSize: 25,
    fontFamily: 'Montserrat-Medium',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }

 
});
