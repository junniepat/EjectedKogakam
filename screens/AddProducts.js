import React , {useState, useEffect} from 'react';
import { Container, Content, List, ListItem, Text, Form,Item, Label, 
    Input, Icon,  Picker, View, Title, Textarea  } from 'native-base';
    import {Button} from 'react-native-elements'
import axios from 'axios'
import {TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,  Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { ImageBrowser } from 'expo-multiple-media-imagepicker'

export default function AddProducts(props) {

    const [data, setData] = useState({ cats: [] });
    const [lat, setlatitude] = useState(null)
    const [lng, setlongitude] = useState(null)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [condation, setCondation  ] = useState("")
    const [currency, setCurrency] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    
    const [image, setImages] = useState([])
    const [disableBtn, setDisableBtn] = useState(false)
   
   
     useEffect(() => {
       navigator.geolocation.getCurrentPosition(
         position => {
           const latitude = JSON.stringify(position.coords.latitude);
           const longitude = JSON.stringify(position.coords.longitude);
  
           setlatitude(latitude);
           setlongitude(longitude);
         },
         error => Alert.alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
       );
     }, [])

     let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
    }
 
  
     
      const submitForm = e => {

        // if(title || price || phone || description || cat_id || sub_cat_id == ''){
        //   setError('check to fill all fields')
         
        // }
        // else {
          setDisableBtn(false)
          const formData = new FormData();
          formData.append('title', title);
          formData.append('price', price);
          formData.append('description', description);
          formData.append('manufacturer', manufacturer);
          formData.append('condation', condation);

          formData.append('currency', currency);
          formData.append('phone', phone);
          formData.append('lat', lat);
          formData.append('lng', lng);
          formData.append('location', lat);
          formData.append('cat_id',  props.navigation.getParam('catId'));
          formData.append('sub_cat_id',  props.navigation.getParam('subCatid'));
          formData.append('images', image);

          axios.post('/add_product',  formData )
          .then(res => {
            console.warn(res)
            setDisableBtn(true)
          })
          .catch(error => {
            console.warn(error)
            
            setDisableBtn(false)
          
          })
       
        // }
      }  

     const imageBrowserCallback = (callback) => {
        callback.then((photos) => {
          console.log(photos)

          setimageBrowserOpen(false)
          setPhoto(photos)

        }).catch((e) => console.log(e))
      }
      
    return (
      <Container>
         <View style={{height: 50,  marginTop: 25, lineHeight: 50, flexDirection: 'row', borderBottomColor: '#f2f2f2', borderBottomWidth: 1, borderStyle: 'solid'}}
      >
          <TouchableOpacity style={{ padding: 11, marginLeft: 5,}} onPress={() => props.navigation.goBack()}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#555" style={{marginRight: 6,}} />
          </TouchableOpacity>
          <Text style={{fontWeight: '600', marginTop: 6,  fontFamily: 'Montserrat-Medium', fontSize: 20}}>Add Product</Text>
      </View>

        <KeyboardAvoidingView  behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}>
        <Content style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, padding:10}}>
       
        <ScrollView>
          
       <Text style={{fontSize: 15, fontFamily: 'Montserrat-Medium', marginTop: 4}}>Add Product to {props.navigation.getParam('subCatTitle')}</Text>


<Text>{error}</Text>
       <Form>
           <Item regular  style={styles.textbox}>
             <Label>Title </Label>
             <Input 
             onChangeText={text => setTitle(text)}
             value={title} />
           </Item>

           <Item regular style={styles.textbox}>
             <Label>Price</Label>
             <Input 
             onChangeText={text => setPrice(text)}
             value={price} />
           </Item>


            <Textarea onChangeText={text => setDescription(text)}
            value={description} rowSpan={5} bordered placeholder="Description" />

            <Item regular style={styles.textbox}>
             <Label>Manufacturer</Label>
             <Input 
             onChangeText={text => setManufacturer(text)}
             value={manufacturer}/>
           </Item>


          

           <Item regular style={styles.textbox}>
             <Label>Condation</Label>
             <Input 
             onChangeText={text => setCondation(text)}
             value={condation}/>
           </Item>

           <Item regular style={styles.textbox}>
             <Label>Currency</Label>
             <Input onChangeText={text => setCurrency(text)}
              value={currency}/>
           </Item>

           <Item regular style={styles.textbox}>
             <Label>Phone</Label>
             <Input 
             onChangeText={text => setPhone(text)}
             value={phone} />
           </Item>

           <ImageBrowser
        max={101} // Maximum number of pickable image. default is None
        headerCloseText={'Close'} // Close button text on header. default is 'Close'.
        headerDoneText={'Done'} // Done button text on header. default is 'Done'.
        headerButtonColor={'#E31676'} // Button color on header.
        headerSelectText={'selected'} // Word when picking.  default is 'n selected'.
        mediaSubtype={'screenshot'} // Only iOS, Filter by MediaSubtype. default is display all.
        badgeColor={'#E31676'} // Badge color when picking.
        emptyText={'Nothing selected'} // Empty Text
        callback={() => imageBrowserCallback()} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
          />

           <Button
           outline
           titleStyle={{ color: '#fff'}}
           buttonStyle={{backgroundColor: '#0F52BA'}}
           raised={true}
             title="Create"
             type="submit"
             loading={false}
             disabled={disableBtn}
             onPress={()=> submitForm()} 
           />
         </Form>
       
        </ScrollView>
        </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
    },
    textbox: {
      marginTop: 5,
      marginBottom: 5, 
      paddingLeft: 5,
      borderRadius: 5,
      backgroundColor: "#fff"
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
      shadowColor: '#f2f2f2',
      shadowRadius: 8,
      borderRadius: 15,
      backgroundColor: "#FFF",
      flexWrap: "nowrap",
      borderRadius: 2,
      borderColor: "#ccc",
      borderWidth: 1,
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
  


