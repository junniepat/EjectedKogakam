import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function CupertinoSegmentWithThreeTabs(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textWrapper}>
        <TouchableOpacity style={styles.segmentTextWrapper1}>
          <Text style={styles.text1}>Timeline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentTextWrapper2}>
          <Text style={styles.text2}>Add Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentTextWrapper3}>
          <Text style={styles.text3}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center"
  },
  textWrapper: {
    height: 29,
    flex: 1,
    flexDirection: "row",
    paddingRight: 30,
    paddingLeft: 30
  },
  segmentTextWrapper1: {
    flex: 1,
    backgroundColor: "#007AFF",
    alignItems: "center",
    padding: 6,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  segmentTextWrapper2: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 6,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  text2: {
    color: "#007AFF",
    fontSize: 13,
  },
  segmentTextWrapper3: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 6,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  text3: {
    color: "#007AFF",
    fontSize: 13,
  }
});

export default CupertinoSegmentWithThreeTabs;
