import {View, Text} from 'react-native';
import React from 'react';

const NoAntigaspi = () => {
  return (
    <View style={{backgroundColor: 'white', marginHorizontal: 20, borderRadius: 5, marginVertical: 100,}}>
      <View style={{padding:50, flexDirection: 'column', gap: 10}}>
        <Text style={{textAlign:'center'}}>Notre offre antigaspi n'est pas encore disponible.</Text>
        <Text style={{textAlign:'center'}}>Revenez pour 21h</Text>

      </View>
    </View>
  );
};

export default NoAntigaspi;
