import React , {useState, useEffect} from 'react';
import { Container, Content, Button, Header, List, ListItem, Text, Icon, Left, Body, Right, Switch, View, Title  } from 'native-base';
import axios from 'axios'
import {TouchableOpacity} from 'react-native'
import { Ionicons, StyleSheet } from '@expo/vector-icons'

export default function SeeAll(props) {
    const [data, setData] = useState({ cats: [] });
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            'get_all_cats'
          );  
          setData(result.data.successData);
        };
        fetchData();
    
      
    
      }, []);
      
    return (
      <Container>
      <View style={{height: 50, marginTop: 25, lineHeight: 50, flexDirection: 'row', borderBottomColor: '#f2f2f2', borderBottomWidth: 1, borderStyle: 'solid'}}
      
      >

<TouchableOpacity style={{ padding: 11,
    marginLeft: 5,}}
       onPress={() => props.navigation.goBack()}>
<Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#555" style={{marginRight: 6,}} />
     
       </TouchableOpacity>



          <Text style={{fontWeight: '600', marginTop: 6,  fontFamily: 'Montserrat-Medium', fontSize: 20}}>CATEGORIES</Text>
      </View>
     
        <Content>
        <List>
        {data.cats.map((item, index) => (
      <>
          <ListItem icon style={{paddingTop: 10}} onPress={() => {
      props.navigation.push('ProductsPage', {
        name: item.title,
        id: item.id
      })}} >
            <Left>
              <Button style={{ backgroundColor: `${item.color}` }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body style={{paddingBottom: 8, paddingTop: 8}}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15}}>{item.title}</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          </>
          ))}
          </List>
         </Content>
      </Container>
    );
  }

  