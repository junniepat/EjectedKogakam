import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialSearchBar1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect1}>
        <TouchableOpacity style={styles.leftIconButton}
        onPress={() => props.navigation.goBack()}>

          <MaterialCommunityIconsIcon
            name="arrow-left"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>

        </TouchableOpacity>

        <View style={styles.inputStyleStack}>
          <TextInput placeholder="Search" style={styles.inputStyle}></TextInput>
          <TouchableOpacity style={styles.rightIconButton}>
            <MaterialCommunityIconsIcon
              name="close"
              style={styles.rightIcon2}
            ></MaterialCommunityIconsIcon>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#233159",
    padding: 1,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  
  },
  rect1: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    flex: 1,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2
  },
  leftIconButton: {
    padding: 11,
    marginLeft: 5,
    marginTop: 5
  },
  leftIcon2: {
    backgroundColor: "transparent",
    color: "#000",
    fontSize: 24,
    opacity: 0.6
  },
  inputStyle: {
    top: 0,
    left: 0,
    width: 257,
    height: 48,
    color: "#000",
    position: "absolute",
    alignSelf: "flex-start",
    paddingRight: 5,
    fontSize: 16,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 16
  },
  rightIconButton: {
    top: 1,
    alignSelf: 'flex-end',
    alignItems: "center",
    right: 24,
    padding: 11
  },
  rightIcon2: {
    backgroundColor: "transparent",
    color: "#000",
    fontSize: 24,
    opacity: 0.6
  },
  inputStyleStack: {
    width: 290,
    height: 48,
    marginLeft: 21,
    marginTop: 4
  }
});

export default MaterialSearchBar1;
