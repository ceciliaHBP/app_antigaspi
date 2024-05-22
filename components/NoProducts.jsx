import {View, Text} from 'react-native';
import React from 'react';

const NoProducts = () => {
  return (
    <View style={{backgroundColor: 'white', marginHorizontal: 20, borderRadius: 5, marginVertical: 100,}}>
      <View style={{padding:50, flexDirection: 'column', gap: 10}}>
        <Text style={{textAlign:'center'}}>Plus de produits disponibles !</Text>
        <Text style={{textAlign:'center'}}>Revenez demain à 21H pour en profiter.</Text>

      </View>
    </View>
  );
};

export default NoProducts;
