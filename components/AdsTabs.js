import React, {useState, useEffect, Fragment} from 'react'
import { Container, Header, Content } from 'native-base'
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


import { Button, Icon, List, Avatar, ListItem, Layout, Tab, TabView } from '@ui-kitten/components';

import UserProducts from './userProducts'

import axios from 'axios' 
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'


export default function AdsTabs(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;
  const [data, setData] = useState({ products: [] });

 useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(
      'get_all_products', {
        headers: {
          app_key: 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag='
        }
      }
    );
    setData(result.data.successData);
   console.warn(data.products)
  };
 
     fetchData();
  
 }, [])




    return (
      <ScrollView>
      <View>
       
      <TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='My Ads'>
        <Layout style={styles.tabContainer}>
        <UserProducts/>
        </Layout>
      </Tab>
    </TabView>






      </View>
      
</ScrollView>
    );
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

