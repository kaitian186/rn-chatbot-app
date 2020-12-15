import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export const Header:React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Chat Bot App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EBEBEB',
    height: 90,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECF4F6',
  },
  headerTitle: {
    fontSize: 24,
    textAlign: 'center',
  },  
});