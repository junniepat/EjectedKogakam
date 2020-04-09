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
        name: this.props.roundedName,
        id: this.props.id
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
        width: '100%',
        alignSelf: 'center',  
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:  'center',
      },
      rounded: {
        height: 60,
        width: 60,
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
        width: 95,
        textAlign: 'center',
        fontSize: 9,
        fontFamily: 'Montserrat-Medium',
        textTransform: 'uppercase',
        marginTop: 5,
        color: '#525c7a',
        fontWeight: '700'
      },
    
  });
  

 