import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonPrimary2(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}
    onPress={()=>{props.navigation.push(`${props.link}`)}}
   >
<Text style={styles.caption}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 6,
    shadowColor: "#f2f2f2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4.65,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  }
});

export default MaterialButtonPrimary2;
