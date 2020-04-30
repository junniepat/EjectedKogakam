import React , {useState, useEffect, ImageBackground} from 'react';
import { Container, Content, List, ListItem, Text, Form,Item, Label, 
     Icon,  Picker, View, Title, Textarea  } from 'native-base';
 
    import {Button, Input} from '@ui-kitten/components'
import axios from 'axios'
import {TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import * as ImagePicker from 'expo-image-picker';

export default function AddProducts(props) {

    const [data, setData] = useState({ cats: [] });

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [condation, setCondation  ] = useState("")
    const [currency, setCurrency] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")

 
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);

    const [preview1, setpreview1] = useState(null);
    const [imagesOne, setImageOne] = useState(null);

    const [preview2, setpreview2] = useState(null)
    const [imagesTwo, setImageTwo] = useState(null)

    const [preview3, setpreview3] = useState(null)
    const [imagesThree, setImageThree] = useState(null)

    const [address, setAddress] = useState(null)
    const [state, setState] = useState(null)
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)
   const [latitude, setlatitude] = useState(null)
   const [longitude, setlongitude] = useState(null)


    const [disableBtn, setDisableBtn] = useState(false)
   const [number, setNumber] = useState('')
   

   
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
		// 	position => {
    //     const latitude = JSON.stringify(position.coords.latitude);
    //     const longitude = JSON.stringify(position.coords.longitude);

        
    //     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'AIzaSyCqVdsEiP5jMfTWaiHaOO5CjRyCvylHtS4')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.warn('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[1].formatted_address));
    //     setAddress(responseJson.results[1].formatted_address)
    //     setCity(responseJson.results[1].address_components[1].long_name)
    //     setState(responseJson.results[1].address_components[3].long_name)
    //     setCountry(responseJson.results[1].address_components[4].long_name)
        
    //     })

    //     setlatitude(latitude);
    //     setlongitude(longitude);
		// 	},
		// 	error => Alert.alert(error.message),
		// 	{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
    
    askPermissionsAsync();
  }, [])
  



    const askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // you would probably do something to verify that permissions
      // are actually granted, but I'm skipping that for brevity


      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };


    const generateFileName = (length) =>{
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
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
        
          formData.append('city', city);
          formData.append('location', state);
          formData.append('state', state);
          formData.append('country', country);
    
          formData.append('address', address);
          formData.append('lng', longitude);
          formData.append('lat', latitude);

          formData.append('cat_id',  props.navigation.getParam('catId'));
          formData.append('sub_cat_id',  props.navigation.getParam('subCatid'));
          images.forEach(e=>formData.append('images[]', e));
          
         

          console.warn(formData)
          axios.post('/add_product',  formData)
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

 

    
     const  _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,    
        });
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
          let uri = result.uri
          let fileType = uri.substring(uri.lastIndexOf(".") + 1)
          let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
          let fileName = generateFileName(5)+'.'+fileType;
          
          setImages(images.concat({type: 'image/'+fileType, uri: uri,name:fileName}))
 
      }


      const selectImageOne = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,    
        });
        if (!result.cancelled) {
          setpreview1(result.uri);
      }

      
          let uri = result.uri
          let fileType = uri.substring(uri.lastIndexOf(".") + 1)
          let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
          let fileName = generateFileName(5)+'.'+fileType;
          
          setImages(images.concat({type: 'image/'+fileType, uri: uri,name:fileName}))
      
      }
     

      const selectImageTwo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,    
        });
    
        if (!result.cancelled) {
            setpreview2(result.uri);
        }
          let uri = result.uri
          let fileType = uri.substring(uri.lastIndexOf(".") + 1)
          let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
          let fileName = generateFileName(5)+'.'+fileType;
          
          setImages(images.concat({type: 'image/'+fileType, uri: uri,name:fileName}))
      }


     const selectImageThree  = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,    
        });
    
        if (!result.cancelled) {
            setpreview3(result.uri);
        }
          let uri = result.uri
          let fileType = uri.substring(uri.lastIndexOf(".") + 1)
          let Imagefile = uri.substring(uri.lastIndexOf("/") + 1)
          let fileName = generateFileName(5)+'.'+fileType;
          
          setImages(images.concat({type: 'image/'+fileType, uri: uri,name:fileName}))
      
      }

      console.warn('images', images)
    
    return (
      <Container style={styles.container}>
         <View style={{height: 50,  marginTop: 25,  lineHeight: 50, flexDirection: 'row', borderBottomColor: '#f2f2f2', borderBottomWidth: 1, borderStyle: 'solid'}}
      >
          <TouchableOpacity style={{ padding: 11, marginLeft: 5,}} onPress={() => props.navigation.goBack()}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={20} color="#555" style={{marginRight: 6,}} />
          </TouchableOpacity>
          <Text style={{fontWeight: '600', marginTop: 6,  fontFamily: 'Montserrat-Medium', fontSize: 20}}>Add Product</Text>
      </View>

        <KeyboardAvoidingView  behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}>
        <Content style={{marginLeft: 10, marginRight: 10, padding:10}}>
       
        <ScrollView style={{  marginBottom: 40,}}>
          
       <Text style={{fontSize: 15, fontFamily: 'Montserrat-Medium', marginTop: 4}}>Add Product to {props.navigation.getParam('subCatTitle')}</Text>


<Text>{error}</Text>
       <Form>
          

           <Input 
             label='Title'
             onChangeText={text => setTitle(text)}
             value={title} />

      
             <Input 
             label='price'
             onChangeText={text => setPrice(text)}
             value={price} />
      

 <Input
        multiline={true}
        textStyle={{ minHeight: 64 }}
        onChangeText={text => setDescription(text)}
        placeholder="Description" 
        value={description} 
      />
     
           <Input 
             label='Manufacturer'
             onChangeText={text => setManufacturer(text)}
             value={manufacturer} />

<Input 
             label='Condition'
             onChangeText={text => setCondation(text)}
             value={condation} />

        
<Input 
             label='Currency'
             onChangeText={text => setCurrency(text)}
             value={currency} />

<Input 
             label='Phone'
             onChangeText={text => setPhone(text)}
             value={phone} />


      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <View>
            <Button style={styles.button} appearance='ghost' status='primary'   onPress={() => _pickImage()}>
              Image 1
            </Button>
            {image &&
            <Image source={{ uri: image }} style={{borderRadius: 7, width: 120, height: 120, marginTop: 8 }} />}
        </View>


        <View>
          <Button style={styles.button} appearance='ghost' status='primary'   onPress={() => selectImageOne()}>
            Image 2
          </Button>
          {preview1 &&
            <Image source={{ uri: preview1 }} style={{borderRadius: 7, width: 120, height: 120, marginTop: 8 }} />}
        </View>


      <View>
        <Button style={styles.button} appearance='ghost' status='primary'   onPress={() => selectImageTwo()}>
          Image 3
        </Button>
        {preview2 &&
          <Image source={{ uri: preview2 }} style={{borderRadius: 7, width: 120, height: 120, marginTop: 8 }} />}
      </View>


      <View>
        <Button style={styles.button} appearance='ghost' status='primary'   onPress={() => selectImageThree()}>
          Image 4
        </Button>
        {preview3 &&
          <Image source={{ uri: preview3 }} style={{borderRadius: 7, width: 120, height: 120, marginTop: 8 }} />}
      </View>

      </View>


           <Button
           outline titleStyle={{ color: '#fff'}}
           buttonStyle={{backgroundColor: '#0F52BA', }}
           raised={true}
             title="Create"  type="submit"  loading={false}
             disabled={disableBtn}
             onPress={()=> submitForm()} 
           >
             Add Product
             </Button>
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
  




