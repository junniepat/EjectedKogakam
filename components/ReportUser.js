
import * as React from 'react';
import { View, Alert } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import  {Button, Card} from '@ui-kitten/components';
import {  Textarea} from 'native-base';
import axios from 'axios'

export default class ReportUser extends React.Component {
  state = {
    value: 'Other',
    reason: ''
  };


  addReport = ()=> {

    const formData = new FormData();
    formData.append('reported_user', this.props.userID);
    formData.append('comment', this.state.comment);
    formData.append('reason', this.state.reason);
    
console.warn(formData)
        axios.post(
          `https://kogakam.com/api/v1/report_user`, formData
        )
        .then(response => 
          { 
            Alert.alert('User reported, we would have our team look into it')
          })
      .catch(error => {

        Alert.alert('Unable to report user')
        // setLoading(false)
        // setError(error.message)
      })
      
    }


  render() {

    console.warn(this.state.value)
    return(
    

      
<Card disabled={true}>
        <Text style={{ color: "rgba(0,0,0,1)",
    fontSize: 18,
    marginTop: 3,
    fontFamily: 'Montserrat-Medium',}}>Report User</Text>
    
  
        <RadioButton.Group  style={{color: '#333'}}
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
      >
        <View>
          <RadioButton.Item style={{color: '#333'}} label="Inappropriate Profile Picture" value="Inappropriate Profile Picture" />
      
          <RadioButton.Item label="This user is threatening me " value="This user is threatening me " />
          <RadioButton.Item label="This user is insulting me" value="This user is insulting me" />
          <RadioButton.Item label="Spam" value="Spam" />
          <RadioButton.Item label="Fraud" value="Fraud" />
          <RadioButton.Item label="Other" value="Other" />
        </View>
      </RadioButton.Group>



<Textarea style={{marginBottom: 15}} rowSpan={5} bordered placeholder="Reason" onChangeText={(reason) => this.setState({reason})} 
value={this.state.reason}
    />

    <View>
        <Button
        onPress={() => this.addReport()}>
           
        Report
        </Button>
    </View>

        </Card>
    )
  }
}

