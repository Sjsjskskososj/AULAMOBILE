import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
function Header() {
    return(
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Meu app</Text>
      </View>
    )
  }

export default Header;
const styles = StyleSheet.create({
    Header: {
      backgroundColor: '#90EE90',
      padding: 15,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1, // mantém o header na frente
    },
    HeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  