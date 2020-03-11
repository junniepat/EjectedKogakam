import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/Login' 
import RegisterScreen from '../screens/Register'
import ProductView from   '../screens/ProductView'
import InboxScreen from '../screens/Inbox';
import ProductsPage from   '../screens/ProductsPage'
import AdsScreen from '../screens/AdsScreen'
import Timeline from '../screens/Timeline'
import inboxView from '../screens/inboxView'

import userProfile from '../screens/userProfile'

import {View} from 'react-native' 

const config = Platform.select({
  defaultNavigationOptions:{
    headerShown:false
   }
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    ProductView: ProductView,
    ProductsPage: ProductsPage,
    userProfile: userProfile
  },
  {
    defaultNavigationOptions:{
      headerShown:false
     }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    Timeline: Timeline
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Sell',
  tarBarColor: '#333',
  tabBarIcon: ({ focused }) => (
    <View style={{background: '#333'}}>
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} />
    </View>
  ),
};

LinksStack.path = '';


const InboxStack = createStackNavigator(
  {
    Inbox: InboxScreen,
    inboxView: inboxView
  },
  {
    defaultNavigationOptions:{
     headerShown:false
    }
  },
);

InboxStack.navigationOptions = {
  tabBarLabel: 'Inbox',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'} />
  ),
};

InboxStack.path = '';



const AdsStack = createStackNavigator(
  {
    Ads: AdsScreen,
  },
  {
    defaultNavigationOptions:{
     headerShown:false
    }
  },
);

AdsStack.navigationOptions = {
  tabBarLabel: 'My Ads',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'} />
  ),
};

AdsStack.path = '';




export const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
   
    
  },
{
  initialRouteName: 'Login',
  defaultNavigationOptions:{
   headerShown:false
  }
}
);

AuthStack.path = '';



const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  InboxStack,
  LinksStack,
  AdsStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
