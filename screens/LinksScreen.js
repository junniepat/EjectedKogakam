import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import MaterialBasicFooter from "../components/MaterialBasicFooter";
import MaterialButtonPrimary2 from "../components/MaterialButtonPrimary2";
import MaterialSwitch from "../components/MaterialSwitch";
import MaterialSearchBar from "../components/MaterialSearchBar";

export default function LinksScreen(props) {
  return (
    <View style={styles.container}>
    <MaterialSearchBar
        style={styles.materialSearchBar1}
      ></MaterialSearchBar>

    <ScrollView >
     
     <Image
          source={require("../assets/images/ads.png")}
          style={styles.image}
        ></Image>


     <Text style={styles.products5}>Products</Text>
        <MaterialSwitch style={styles.materialSwitch}></MaterialSwitch>
     

        <Text style={styles.thereAreNoAds}>There are no Products
          If you want to post something you can do it now
        </Text>


    
            <MaterialButtonPrimary2  name='Start Selling' link="Timeline" navigation={props.navigation}
              style={styles.materialButtonPrimary2}
            ></MaterialButtonPrimary2>
         
    
    </ScrollView>
    </View>
  );
}

LinksScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1
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

  image: {
    width: '60%',
    height: 250,
    marginLeft: '15%' ,
    marginRight: '15%' ,
  },
  materialButtonPrimary2: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    height: 36,
  },
  materialSwitch: {
    alignSelf: 'flex-end'
  },
  products5: {
    top: 14,
    left: 16,
    color: "#121212",
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },

  thereAreNoAds: {
    color: "#121212",
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
});
