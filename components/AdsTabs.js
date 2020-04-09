import React, {Component} from 'react'
import { Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, TextInput
  } from 'react-native';
import Timeline from '../screens/Timeline';
import { Button } from 'react-native-elements';


import UserProducts from './userProducts'

import axios from 'axios' 

class AdsTabs extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      //Default selected Tab Index for single select SegmentedControlTab
      selectedIndices: [0],
      //Default selected Tab Indexes for multi select SegmentedControlTab
      customStyleIndex: 0,
      //Default selected Tab Indexes for cusatom SegmentedControlTab
    };
   
  }



  changeInput = (event) => {
    this.setState({
      [event.target.name]: [event.target.value]
    })
  }

  
  handleCustomIndexSelect = (index) => {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
  };
 
  render() {
    const { selectedIndex, selectedIndices, customStyleIndex } = this.state;
    return (
      <ScrollView>
      <View>
       

      <Tabs tabBarUnderlineStyle={{backgroundColor: '#0F52BA'}}>
          <Tab heading={ <TabHeading style={{backgroundColor: '#fff'}}>
            <Text style={{color: '#0F52BA'}}>Timeline</Text>
           </TabHeading>}>

          <UserProducts/>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#fff'}}>
            <Text style={{color: '#0F52BA'}}>Ads</Text>
           </TabHeading>}>
            <Text>Ads</Text>
          </Tab>
        </Tabs>




      </View>
      
</ScrollView>
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
    tabContent: {
      marginTop: 9,
      paddingBottom: 19,
      backgroundColor: '#fff'
    },
    materialButtonViolet: {
      marginBottom: 15
    },
    inputStyle: {
      height: 44,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 4,
      padding: 5,
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

export default AdsTabs;