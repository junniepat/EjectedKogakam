import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function MaterialCardWithImageAndTitle(props) {
  return (
    <View style={[styles.container, props.style]}>
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
