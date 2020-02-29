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

import MaterialCard5 from "../components/MaterialCard5";
import MaterialBasicFooter from "../components/MaterialBasicFooter";
import EntypoIcon from "react-native-vector-icons/Entypo";

import MaterialButtonWithVioletText from "../components/MaterialButtonWithVioletText";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import MaterialSearchBar1 from "../components/MaterialSearchBar1";

export default class Services extends Component {
  constructor(props){
    super(props);
  }
    render(){
      const { Img } = this.props;
        return (
            <>


<TouchableOpacity
     onPress={() => {
      this.props.navigation.push('ProductsPage', {
        name: this.props.roundedName
      })}}
  >
    <View style={styles.roundedCover}>
            <View style={{...styles.rounded, backgroundColor: this.props.color }}>
            
     {this.props.children}

            </View>
            <Text style={styles.roundedName}>{this.props.roundedName}</Text>
          </View>
  </TouchableOpacity>

            </>
        )
    }
} 



const styles = StyleSheet.create({

    roundedCover: {
        margin: 9, 
        width: 100,
        alignSelf: 'center',  
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:  'center',
      },
      rounded: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignSelf: 'center', 
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: 15,
        shadowColor: "#f2f2f2",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      },
      roundedName: {
        width: 85,
        textAlign: 'center',
        fontSize: 9,
        fontFamily: 'Montserrat-Medium',
        textTransform: 'uppercase',
        marginTop: 5,
        color: '#525c7a',
        fontWeight: '700'
      },
    
  });
  

 