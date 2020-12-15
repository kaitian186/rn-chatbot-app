import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface MessageInputBoxProps {
  message: string,
  secureText: boolean,
  onSubmit: () => void,
  onMessageChange: (text: string) => void
}

export const MessageInputBox: React.FC<MessageInputBoxProps> = (props) => {
  return (
    <View style={styles.messageInputBoxContainer}>
      <TextInput 
        value={props.message} 
        style={styles.messageInput}
        secureTextEntry={props.secureText}
        placeholder='Type here ...' 
        onChangeText={(text) => {
          props.onMessageChange(text)
        }}
        onSubmitEditing={()=>{
          props.onSubmit();
        }}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => { props.onSubmit() }}
      >
        <Text style={styles.sendButtonTitle}>send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  messageInputBoxContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EBEBEB',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECF4F6',
  },
  messageInput: {
    height: 50,
    width: '75%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFF',
  },
  sendButton: {
    width: '23%',
    height: 50,
    backgroundColor: '#516AFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonTitle: {
    fontSize: 16,
    color: '#FFF',
  },  
});