
import React from "react";
import{StyleSheet,View,ActivityIndicator,FlatList,Text,TouchableOpacity,Image} from "react-native";
import { Icon } from "react-native-elements";

import {
  Platform,
  ScrollView,} from "react-native";

import {  List, ListItem, Row } from 'native-base';
import { Tab, TabView, Input, Button, Card, Layout, Select, SelectItem, Modal, IndexPath } from '@ui-kitten/components';
import axios from 'axios'


export default class ProfileData extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      shop_description: '',
      shop_location: '',
      shop_title: '',
      Message: '',
      error: '',
      dataSource: [],
     };
  }
  componentDidMount() {this.fetchData();}
  
  fetchData = () => {this.setState({loading: true});
  
  
  fetch("/shop_cat")
  .then(response => console.log(response))
    .then(response => response.json())
    .then(responseJson => {
      responseJson = responseJson.data.successData.cats.map(item => {
        item.isSelect = false;
        item.selectedClass = styles.list;
        
        return item;
      });
   
      this.setState({
        loading: false,
        dataSource: responseJson,
      });
    }).catch(error => {this.setState({loading: false});
   });
  };


  
   onshopsubmit = async =>{
    setDisableBtn(true)
    setbtnText('Updating ....')
  
    if (email == null) {
      console.warn('exploded')
    }
  
    console.warn('ok')
    const formData = new FormData();
    formData.append('shop_title', shop_title);
    formData.append('shop_description', shop_description);
    formData.append('shop_location', shop_location);
    formData.append('cats', selectedOption);
    formData.append('shop_lat', latitude);
    formData.append('shop_lng', longitude);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
  
    console.warn(formData)
  
    axios.post('change_shop', formData)
    .then(res => {
      console.warn(res)
      setError('')
      setMessage('Update successful, changes would be effected in your next sign in')
      fetchData();
    })
  
    .catch(error => {
      setError('Unable to Update')
      setMessage('')
      
      console.warn(error, 'settings')}
      )
      
    }



FlatListItemSeparator = () => <View style={styles.line} />;

selectItem = data => {
  data.item.isSelect = !data.item.isSelect;
  data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

  const index = this.state.dataSource.findIndex(
    item => data.item.id === item.id
  );

  this.state.dataSource[index] = data.item;

  this.setState({
    dataSource: this.state.dataSource,
  });
};

goToStore = () =>this.props.navigation.navigate("Expenses", {selected: this.state.selected,});

renderItem = data =>
  <TouchableOpacity
    style={[styles.list, data.item.selectedClass]}      
    onPress={() => this.selectItem(data)}
  >
  <Image
    source={{ uri: data.item.thumbnailUrl }}
    style={{ width: 40, height: 40, margin: 6 }}
  />
  <Text style={styles.lightText}>  {data.item.title.charAt(0).toUpperCase() + data.item.title.slice(1)}  </Text>
</TouchableOpacity>

render() {
  const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;
  if (this.state.loading) {return (
    <View style={styles.loader}>
     <ActivityIndicator size="large" color="purple" />
    </View>
  );
}
 
 return (
   <View style={styles.container}>

  
{this.state.Message !== '' ? <View style={{backgroundColor: '#9bffad', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: 'green'}}>{this.state.Message}</Text>
  </View> : null}

 {this.state.error !== '' ? <View style={{backgroundColor: '#ff475c', margin: 10, padding: 5, borderRadius: 3}}>
    <Text style={{color: '#fff'}}>{this.state.error}</Text>
  </View> : null}

  <View
  style={styles.materialUnderlineTextbox}>
    <Input
    label="Shop Title"
        placeholder={'Shop Title'}
        style={styles.input}
     onChangeText={(shop_title) => this.setState({shop_title})}
    value={this.state.shop_title}
      />

</View>


 <View
  style={styles.materialUnderlineTextbox}>
    <Input
    label="Shop Description"
        placeholder={'Shop Description'}
        style={styles.input}
    onChangeText={(shop_description) => this.setState({shop_description})}
    value={this.state.shop_description}
      />

</View>


<View
  style={styles.materialUnderlineTextbox}>
    <Input
    label="Shop Location"
        placeholder={'Shop Location'}
        style={styles.input}
    onChangeText={(shop_location) => this.setState({shop_location})}
    value={this.state.shop_location}
      />

</View>


<Text style={styles.title}>Select Categories</Text>
<Text style={styles.number}>{itemNumber}</Text>
<FlatList
     data={this.state.dataSource}
    ItemSeparatorComponent={this.FlatListItemSeparator}
    renderItem={item => this.renderItem(item)}
    keyExtractor={item => item.id.toString()}
    extraData={this.state}
   />




<View style={{marginLeft: 5, marginTop: 30, marginRight: 9}}>
      <Button onPress={()=> onshopsubmit()} >
        Update
      </Button>
</View> 
</View>
);}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal:15,
    position: "relative"
   },
  title: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginBottom: 10
  },
  loader: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  },
  lightText: {
    color: "#555",
    width: '100%',
    paddingLeft: 15,
    fontSize: 12,
    flexWrap: 'wrap',
    width: '90%'
   },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor:"rgba(0,0,0,0.1)"
  },
  icon: {
    position: "absolute",  
    bottom: 20,
    width: "100%", 
    left: 290, 
    zIndex: 1
  },
  numberBox: {
    position: "absolute",
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,  
    left: 330,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center"
  },
  number: {fontSize: 14,color: "#000"},
  selected: {backgroundColor: "#FA7B5F"},
  });