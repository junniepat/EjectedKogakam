import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MaterialButtonPink2 from "./MaterialButtonPink2";
import MaterialMessageTextbox1 from "./MaterialMessageTextbox1";
import MaterialHelperTextBox from "./MaterialHelperTextBox";
import MaterialMessageTextbox2 from "./MaterialMessageTextbox2";
import MaterialButtonPrimary1 from "./MaterialButtonPrimary1";

function ProfileData(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.scrollAreaStack}>
        <View style={styles.scrollArea}>
          <ScrollView>

<View style={styles.scrollArea_contentContainerStyle}>

        <MaterialMessageTextbox1
          style={styles.materialMessageTextbox1}
        ></MaterialMessageTextbox1>

        <MaterialHelperTextBox
          style={styles.materialHelperTextBox}
        ></MaterialHelperTextBox>

        <MaterialMessageTextbox2
          style={styles.materialMessageTextbox2}
        ></MaterialMessageTextbox2>

        <MaterialButtonPrimary1
          style={styles.materialButtonPrimary1}
        ></MaterialButtonPrimary1>

        <MaterialButtonPink2
          style={styles.materialButtonPink2}
        ></MaterialButtonPink2>


</View>
          </ScrollView>
        </View>

        
        <Text style={styles.profileSettings}>Profile Settings</Text>
     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  scrollArea: {
    width: '100%',
    height: '78%',
    marginTop: '14%',
    marginLeft: -1,
  },
  scrollArea_contentContainerStyle: {
    top: 4,
    width: '100%',
    minHeight: 400,
  },
  materialButtonPink2: {
    width: 100,
    height: 36,
    marginLeft: 242
  },
  profileSettings: {
    top: 16,
    left: 20,
    color: "rgba(0,0,0,1)",
    position: "absolute",
    fontSize: 12,
  },
  materialMessageTextbox1: {
    marginTop: 10,
    left: 20,
    width: '100%',
    height: 90,
  },
  materialHelperTextBox: {
    marginTop: 10,
    left: 20,
    width: '100%',
    height: 90,
  },
  materialMessageTextbox2: {
    marginTop: 10,
    left: 20,
    width: '100%',
    height: 90,
  },
  materialButtonPrimary1: {
    marginTop: 10,
    left: 20,
    width: 100,
    height: 36,
  },
  scrollAreaStack: {
    width: '100%',
    height: 471
  }
});

export default ProfileData;
