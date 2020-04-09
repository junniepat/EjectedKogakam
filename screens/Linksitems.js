
import React , {useState, useEffect} from 'react';
import { Container, Content, Button, Header, List, ListItem, Text, Icon, Left, Body, Right, Switch, View, Title  } from 'native-base';
import axios from 'axios'
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import { Ionicons,  } from '@expo/vector-icons'

export default function LinksItems(props) {
    const [data, setData] = useState({ subcats: [] });
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            `get_sub_cats/${props.navigation.getParam('itemId')}`
          );  
          setData(result.data.successData);
        };
        fetchData();
    
      
    
      }, []);
      
    return (
      <Container styles={{backgroundColor: '#f2f2f2'}}>
      <View style={{height: 50,  marginTop: 25, lineHeight: 50, flexDirection: 'row', borderBottomColor: '#f2f2f2', borderBottomWidth: 1, borderStyle: 'solid'}}
      >


<TouchableOpacity style={{ padding: 11,
    marginLeft: 5,}}
       onPress={() => props.navigation.goBack()}>
<Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#555" style={{marginRight: 6,}} />
     
       </TouchableOpacity>

          <Text style={{fontWeight: '600', marginTop: 6,  fontFamily: 'Montserrat-Medium', fontSize: 20}}>Choose a category</Text>
      </View>
     
        <Content>
        <Text style={{color: "#121212", fontFamily: 'Montserrat-Medium', marginTop: 9,  marginBottom:10, marginLeft: 24,  fontSize: 15,}}>{props.navigation.getParam('name')} sub categories</Text>
        <View style={{width: '96%', paddingLeft: 17, paddingRight:8, }}>
        
        
        <List>
       
      
  {data.subcats.map((item, index) => (
          <>
    
            <ListItem  onPress={() => {
              props.navigation.push('AddProducts', {
                catId: props.navigation.getParam('itemId'),
                subCatid: item.id,
                subCatTitle: item.title
              })}}>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 15,}}>{item.title}</Text>
            </ListItem>
          </>
          ))} 
      
        
          
          </List>
         
          </View>
         </Content>
      </Container>
    );
  }

  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingRight: 10,
    paddingLeft: 10
  },
  scrollArea: {
    top: 0,
    left: 9,
    width: 358,
    height: 485,
  
    position: "absolute",
    opacity: 0
  },
  scrollArea_contentContainerStyle: {
    width: 358,
    height: 471
  },
  scrollAreaStack: {
    marginTop: 10,
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
alignContent:'center',
  },

  chooseACategory: {
    color: "#121212",
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
    marginTop: 9,
    marginLeft: 24,
    fontSize: 17,
    },
ImageIcon: {
  width: 44, 
  height: 44,
  alignSelf: 'center'
},
  button2: {
    shadowColor: "#f2f2f2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4.65,
    
    elevation: 6,
    borderRadius: 5,
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    overflow: "hidden",
    paddingBottom: 5,
    paddingTop: 30,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    width: '44%',
    height: 140,
    fontSize: 10,
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    marginTop: 24,
  },
  mobilePhones2: {
    color: "#121212",
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
    textAlign: 'center',
  },
  button3: {
    top: 27,
    left: 203,
    width: 140,
    height: 118,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(230,447,447,1)"
  },
  
});
