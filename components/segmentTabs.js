import React, {Component} from 'react'
import SegmentedControlTab from "react-native-segmented-control-tab";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import Timeline from '../screens/Timeline';

class ProfileSegment extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }
 
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });

    console.warn(this.state.selectedIndex)
  };
 
  render() {
    return (
      <View>
        <SegmentedControlTab
          values={["Timeline", "Ads", "Settings"]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}


          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          firstTabStyle={styles.firstTabStyle}
          lastTabStyle={styles.lastTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        
          allowFontScaling={false}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
    tabsContainerStyle: {
      //custom styles
      marginTop: 5,
    },
    tabStyle: {
      borderColor: '#f2f2f2'
    },
    firstTabStyle: {
      //custom styles
    },
    lastTabStyle: {
      //custom styles
    },
    tabTextStyle: {
      //custom styles
    },
    activeTabStyle: {
      //custom styles
    },
    activeTabTextStyle: {
      //custom styles
    },
    tabBadgeContainerStyle: {
      //custom styles
    },
    activeTabBadgeContainerStyle: {
      //custom styles
    },
    tabBadgeStyle: {
      //custom styles
    },
    activeTabBadgeStyle: {
      //custom styles
    }
  });

export default ProfileSegment;