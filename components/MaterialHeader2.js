import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialHeader2(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton}>
          <MaterialCommunityIconsIcon
            name="menu"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            Title
          </Text>
        </View>
      </View>
      <View style={styles.leftIconButtonRowFiller}></View>
      <View style={styles.rightIconsWrapper}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIconsIcon
            name="magnify"
            style={styles.rightIcon1}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton2}>
          <MaterialCommunityIconsIcon
            name="dots-vertical"
            style={styles.rightIcon2}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    elevation: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  leftIconButton: {
    backgroundColor: "rgba(255,255,255,1)",
    padding: 11
  },
  leftIcon2: {
    backgroundColor: "transparent",
    color: "rgba(73,93,236,1)",
    fontSize: 24
  },
  textWrapper: {
    backgroundColor: "rgba(255,255,255,1)",
    alignSelf: "flex-end",
    marginLeft: 26,
    marginBottom: 14
  },
  title: {
    backgroundColor: "transparent",
    color: "rgba(16,108,199,1)",
    fontSize: 18,
    lineHeight: 18
  },
  leftIconButtonRow: {
    height: 46,
    flexDirection: "row",
    marginBottom: 5
  },
  leftIconButtonRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  iconButton: {
    padding: 11
  },
  rightIcon1: {
    backgroundColor: "transparent",
    color: "rgba(17,97,201,1)",
    fontSize: 24
  },
  iconButton2: {
    padding: 11
  },
  rightIcon2: {
    backgroundColor: "transparent",
    color: "rgba(21,97,195,1)",
    fontSize: 24
  }
});

export default MaterialHeader2;
