


import React from 'react';
import { StyleSheet,Text, View, Button, Picker, Alert, TouchableOpacity } from 'react-native';


export default ShopSettings = () => {

  const [selectedOptions, setselectedOptions] = React.useState([])


const addselectedOptions = (itemValue) => {
    if(selectedOptions.indexOf(itemValue) !== -1){
        console.warn("Value exists!")
    } else{
       setselectedOptions(selectedOptions.concat(itemValue))
    }
}


const remove = (itemValue) => {
const valueToRemove = itemValue
const filteredItems = selectedOptions.filter(function(item) {
  return item !== valueToRemove
})

setselectedOptions(filteredItems)
}

  return (
    <>
     <Picker
        selectedValue={selectedOptions}
        style={{ height: 50, width: 150, marginTop: 30,  }}
        onValueChange={(itemValue, itemIndex) => addselectedOptions(itemValue)}
      >
      {
        ["Dallas", "Oregon", "New York", "California"].map((x) =>
         <Picker.Item label={x} value={x}/>
        )
      }
      </Picker>

<View style={{ flexDirection: 'row'}}>
    {selectedOptions.map(item => (
        <View>
           <View style={{minWidth: 120, backgroundColor: 'dodgerblue', padding:5, borderRadius: 50, flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style={{color: '#fff', alignSelf: 'center'}}> {item}</Text>
           <TouchableOpacity style={{padding: 5, marginRight: 5}} title='r' onPress={() => remove(item)} ><Text style={{color: '#fff'}}>X</Text></TouchableOpacity>
           </View>
        </View>
      ))}
      </View>
    </>
  )
}