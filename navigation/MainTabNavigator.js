import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import TabBarIcon2 from '../components/TabBarIcon2';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/Login' 
import ForgotPassword from '../screens/ForgotPassword'
import RegisterScreen from '../screens/Register'
import ProductView from   '../screens/ProductView'
import InboxScreen from '../screens/Inbox';
import ProductsPage from   '../screens/ProductsPage'
import AdsScreen from '../screens/AdsScreen'
import Timeline from '../screens/Timeline'
import inboxView from '../screens/inboxView'
import inboxViewTwo from '../screens/inboxViewTwo';
import SeeAll from '../screens/SeeAll'
import userType from '../screens/userType'
import LinksItems from '../screens/Linksitems'

import AddProducts from '../screens/AddProducts'
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
    SeeAll: SeeAll, 
    ProductView: ProductView,
    ProductsPage: ProductsPage,
    userProfile: userProfile,
    
  },
  {
    defaultNavigationOptions:{
      headerShown:false
     }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'HOME',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="home-variant-outline"
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    Timeline: Timeline,
    LinksItems: LinksItems,
    AddProducts: AddProducts
  },
  {
    defaultNavigationOptions:{
     headerShown:false
    }
  },
);

LinksStack.navigationOptions = {
  tabBarLabel: 'SELL',
  tarBarColor: '#333',
  tabBarIcon: ({ focused }) => (
    <View style={{background: '#333'}}>
    <TabBarIcon focused={focused} name="camera-outline" />
    </View>
  ),
};

LinksStack.path = '';


const InboxStack = createStackNavigator(
  {
    Inbox: InboxScreen,
    inboxView: inboxView,
    inboxViewTwo: inboxViewTwo
  },
  {
    defaultNavigationOptions:{
     headerShown:false
    }
  },
);

InboxStack.navigationOptions = {
  tabBarLabel: 'ALL CHATS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon2
      focused={focused}
      name="chat-bubble-outline"
    />
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
  tabBarLabel: 'MY ADS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="newspaper" />
  ),
};

AdsStack.path = '';




export const AuthStack = createStackNavigator(
  {
    userType: userType,
    Login: LoginScreen,
    Register: RegisterScreen,
    ForgotPassword: ForgotPassword
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
  tabBarLabel: 'PROFILE',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon2 focused={focused} name='person-outline' />
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
