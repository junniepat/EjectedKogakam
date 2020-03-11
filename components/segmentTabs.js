import React, {Component} from 'react'
import SegmentedControlTab from "react-native-segmented-control-tab";
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

import ProfileSettings from '../components/settings'

import axios from 'axios' 

class ProfileSegment extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      //Default selected Tab Index for single select SegmentedControlTab
      selectedIndices: [0],
      //Default selected Tab Indexes for multi select SegmentedControlTab
      customStyleIndex: 0,
      //Default selected Tab Indexes for cusatom SegmentedControlTab

      name: undefined,
      email: undefined,
      phone: undefined,

      address: undefined,
      username: undefined,
      city: undefined,

      state: undefined,
      country: undefined,
    };
 
    this._nameEntry = undefined;
    this._emailEntry = undefined;
    this._phoneEntry = undefined;

    this._addressEntry = undefined;
    this._usernameEntry = undefined;
    this._cityEntry = undefined;

    this._stateEntry = undefined;
    this._countryEntry = undefined;
  }


  validateAndSetAttribute(key, value) {

    // Ideally these should be declared in constants.js file
    const nameRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^(\d{0,7}[0–9])(\s\w{1,}[A-Za-z])+/;
    const addressRegex = /^(\d{0,3}[0–9])(\s\w{1,}[A-Za-z])+/;
    const usernameRegex = /^(\d{0,3}[0–9])(\s\w{1,}[A-Za-z])+/;
    const cityRegex = /^(\d{0,3}[0–9])(\s\w{1,}[A-Za-z])+/;
    const stateRegex = /^(\d{0,3}[0–9])(\s\w{1,}[A-Za-z])+/;
    const countryRegex = /^(\w[A-Za-z ]{2,57})/;

    this.setState({ key: value });

    let borderColor;
    switch (key) {

      case "name":
        borderColor = value.match(nameRegex) === null ? "red" : "white";
        this._nameEntry.setNativeProps({
          style: { borderColor }
        });
        break;

      case "email":
        borderColor = value.match(emailRegex) === null ? "red" : "white";
        this._emailEntry.setNativeProps({
          style: { borderColor }
        });
        break;

        case "phone":
          borderColor = value.match(phoneRegex) === null ? "red" : "white";
          this._phoneEntry.setNativeProps({
            style: { borderColor }
          });
          break;

      case "address":
        borderColor = value.match(addressRegex) === null ? "red" : "white";
        this._addressEntry.setNativeProps({
          style: { borderColor }
        });
        break;
        

        case "username":
          borderColor = value.match(usernameRegex) === null ? "red" : "white";
          this._usernameEntry.setNativeProps({
            style: { borderColor }
          });
          break;

          case "city":
            borderColor = value.match(cityRegex) === null ? "red" : "white";
            this._cityEntry.setNativeProps({
              style: { borderColor }
            });
            break;

            case "state":
              borderColor = value.match(stateRegex) === null ? "red" : "white";
              this._stateEntry.setNativeProps({
                style: { borderColor }
              });
              break;

              case "country":
                borderColor = value.match(countryRegex) === null ? "red" : "white";
                this._countryEntry.setNativeProps({
                  style: { borderColor }
                });
                break;
    }
  }


  changeInput = (event) => {
    this.setState({
      [event.target.name]: [event.target.value]
    })
  }

  onSubmit = () => {
    console.warn('ok')
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('phone', this.state.phone);
    formData.append('address', this.state.address);
    formData.append('lat', this.state.lat);
    formData.append('lng', this.state.lng);
    formData.append('city', this.state.city);
    formData.append('state', this.state.statel);
    formData.append('country', this.state.country);

    console.warn(formData)

    axios.post('https://kogakam.com/api/v1/change_profile', formData, {

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
       
        <SegmentedControlTab
          values={['Settings', 'Ads']}
          selectedIndex={customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 40 }}
          tabStyle={{
            backgroundColor: '#F2F2F2',
            borderWidth: 0,
            borderColor: 'transparent',
          }}
          activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
          tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
          activeTabTextStyle={{ color: '#888888' }}
        />


{customStyleIndex === 0 && (
          <View style={styles.tabContent}> 
              <ProfileSettings/>

          </View>
        )}
        {customStyleIndex === 1 && (
          <Text style={styles.tabContent}> Tab two</Text>
        )}

        

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

export default ProfileSegment;