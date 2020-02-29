import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";


import EntypoIcon from "react-native-vector-icons/Entypo";

function MaterialBasicFooter(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        onPress={() => console.log("Navigate to Timeline")}
        style={styles.btnWrapper1}
      >
        <MaterialCommunityIconsIcon
          name="television"
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 52.50 52.00" style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(9,81,154,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={26}
            cy={26}
            rx={26}
            ry={26}
          ></Ellipse>
        </Svg>
        <EntypoIcon name="shop" style={styles.icon4}></EntypoIcon>
      </View>
      <TouchableOpacity
        onPress={() => console.log("Navigate to AddProducts")}
        style={styles.btnWrapper3}
      >
        <MaterialCommunityIconsIcon
          name="calendar-text"
          style={styles.icon3}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper2}>
        <MaterialCommunityIconsIcon
          name="shopping"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
      <EntypoIcon name="user" style={styles.icon5}></EntypoIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  icon1: {
    backgroundColor: "transparent",
    color: "rgba(10,56,162,1)",
    fontSize: 24,
    opacity: 0.8
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 53,
    height: 52,
    position: "absolute"
  },
  icon4: {
    top: 13,
    left: 15,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 24
  },
  ellipseStack: {
    top: 0,
    left: 161,
    width: 53,
    height: 52,
    position: "absolute"
  },
  btnWrapper3: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12,
    borderRadius: 100
  },
  icon3: {
    backgroundColor: "transparent",
    color: "rgba(17,58,197,1)",
    fontSize: 24,
    opacity: 0.8
  },
  btnWrapper2: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  icon2: {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    opacity: 0.8
  },
  icon5: {
    top: 16,
    left: 313,
    position: "absolute",
    color: "rgba(1,89,192,1)",
    fontSize: 24
  }
});

export default MaterialBasicFooter;
