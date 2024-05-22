import React from 'react';
import { View, Text , TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles/styles'
import ArrowLeft from '../SVG/ArrowLeft';

const PopUp = ({ onClose, title, text, image }) => {

    const images = {
        sun: require('../assets/sun.jpg'),
        halles: require('../assets/halles_solanid.jpg')
      };
  return (
    <View style={{flex:1, backgroundColor:'white', padding:30, height:"100%"}}>
        
        {/* <TouchableOpacity onPress={onClose} style={style.back}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
        </TouchableOpacity> */}
        <TouchableOpacity  onPress={onClose} activeOpacity={1} style={{position:'absolute', right:20, top:20, backgroundColor:'white', borderRadius:25, borderColor:'white', borderWidth:5}}>
                    {/* <Icon name="keyboard-arrow-left" size={40} color="#000" style={{}}  /> */}
                    <ArrowLeft fill="#273545"/>
                </TouchableOpacity>

        <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', height:"80%", gap:30, marginTop:50}}>
            <Text>{title}</Text>
            <Text style={{textAlign:'justify'}}>{text}</Text>
            <Image source={images[image]} style={{width: 250, height: 150}}/>  
        </View>
      
    </View>
  )
}

const style = StyleSheet.create({

    
    back:{
      backgroundColor: colors.color1,
      width:40,
      height:40,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      position:'absolute',
      right:30,
      top:30
    },
})

export default PopUp;
