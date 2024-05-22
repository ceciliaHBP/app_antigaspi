import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {fonts, colors} from '../styles/styles';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
        backgroundColor: colors.color2,
        borderRadius: 5,
        width: 160,
        height: 50,
        justifyContent: 'center', // Centrer le contenu verticalement
      alignItems: 'center', // Centrer le contenu horizontalement
      }}>
      <Text
      style={{
        color:'white',
        fontWeight:'bold',
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 15
      }}>Ajouter au panier</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
