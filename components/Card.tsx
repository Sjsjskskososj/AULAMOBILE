import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Card(props:{texto:string}){
    return(
      <View style={styles.card}>
        <Text style={styles.cardText}>{props.texto}</Text>
      </View>
    )
  }
  const styles = StyleSheet.create({
    card: {
    backgroundColor: '#90EE90',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
})