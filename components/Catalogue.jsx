import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { fonts, colors} from '../styles/styles'
import { Button } from 'react-native-paper';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { byteLength, fromByteArray, toByteArray } from 'base64-js';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import { API_BASE_URL } from '../config';


const Catalogue = () => {


 const handleUpload = async () => {
  //desactivé
  //   const url = `${API_BASE_URL}/download`;
  //   const dest = RNFS.DocumentDirectoryPath + 'Catalogue.pdf';

    
  //   try {
  //     const response = await axios.get(url, { responseType: 'arraybuffer' });
  //     //console.log('status', response.status)
  //     if (response.status === 200) {
  //         const base64Data = fromByteArray(new Uint8Array(response.data));
  //         await RNFS.writeFile(dest, base64Data, 'base64'); 
  //         //console.log('Fichier téléchargé avec succès à:', dest);
  //         Alert.alert('Succès', 'Catalogue téléchargé');

  //     } else {
  //         //console.error('Erreur lors du téléchargement:', response.status);
  //         Alert.alert('Erreur', 'Erreur de chargement');
  //     }
  // } catch (error) {
  //     //console.error('Erreur lors du téléchargement du fichier:', error.message);
  //     Alert.alert('Erreur', 'Erreur lors du chargement');
  // }
}

  return (
    <View style={styles.container}>
      <View style={styles.container_image}>
            <Image
                  // source={require('../assets/catalogue1.jpeg')} 
                  source={{uri:'https://cdn.lepaindujour.io/assets/catalogue1.jpeg'}}
                  style={{...styles.images, borderTopLeftRadius:10, borderTopRightRadius:10}}
                />
            <Image
                  // source={require('../assets/catalogue2.jpeg')} 
                  source={{uri:'https://cdn.lepaindujour.io/assets/catalogue2.jpeg'}}
                  style={{...styles.images, borderBottomLeftRadius:10, borderBottomRightRadius:10}}
                />
      </View>
      <View style={styles.catalogueTitle}>
        <Text style={styles.catalogueTitleStyle}>Réservez vos plaisirs</Text>
        <Text style={styles.catalogueTitleStyle}>sucrés ou salés</Text>
        <Text style={styles.catalogueText}> Vous pouvez ici trouver le catalogue de nos produits disponibles pour des commandes de type traiteur
             ou en grandes quantités. N’hésitez pas à contacter votre établissement si avez plus de questions.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <View style={{flexDirection:'row', justifyContent: 'center', gap:10, alignItems:'center', paddingHorizontal:10}}>
        <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.textButton}>Télécharger notre</Text>
            <Text style={styles.textButton}>catalogue</Text>
        </View>
        <Image
                  source={require('../assets/upload.png')} 
                  style={styles.icon}
                />  
        </View>
          
        </TouchableOpacity>
      
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        margin:30
      },
      container_image:{
        height:300
      },
      images:{
        width: 312, 
        height: 150, 
        resizeMode:'cover'
      },
      catalogueTitle:{
        margin:15, 
        flexDirection:'column',
        alignItems:'center',
      },
      catalogueTitleStyle:{
        fontSize:24,
        fontFamily:fonts.font3,
        fontWeight: "700",
        color:colors.color1
      },
      catalogueText:{
        textAlign:'center',
        margin:10,
        fontSize:12,
        fontFamily:fonts.font3,
        fontWeight: "700",
        color:colors.color1
      },
      button:{
        backgroundColor:colors.color3,
        //backgroundColor:colors.color2,
        borderRadius:5,
        padding:5,
        width:'auto'
      },
      textButton:{
        color:'white',
        fontSize:16,
        fontFamily:fonts.font3,
        fontWeight: "600",
      },
      icon:{
        width:30,
        height:30,
       
      }
  });


export default Catalogue