import React, { useState } from 'react';
import { Button } from 'react-native-paper' 
import { View, Text,TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ArrowLeft from '../SVG/ArrowLeft';
import { inputStyling, colors, fonts } from '../styles/styles'
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import { API_BASE_URL } from '../config';
const inputOptions = {
  style:inputStyling,
  mode:"outlined",
  outlineColor:'white',
  borderRadius:5, 
  marginTop:10,
  marginBottom:30,
  color:colors.color1,
  paddingHorizontal:10,
}

const Pwd = ({ navigation }) => {


  const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {

      try {
        // Récupérer le prénom via l'API en utilisant l'email
        const firstNameResponse = await axios.get(`${API_BASE_URL}/getUserByEmail/${email}`);
        // Vérifier si firstname a été retourné dans la réponse
        if (!firstNameResponse.data.firstname) {
          Alert.alert('Erreur', 'Utilisateur introuvable');
          return;
        }
        const firstname = firstNameResponse.data.firstname;
    
        // Utiliser firstname et email dans la requête suivante
        const response = await axios.post(`${API_BASE_URL}/forgotPassword`, {
          email,
          firstname,  
        });
    
        if (response.status === 200) {
          Alert.alert('Succès', 'Vérifiez votre boîte de réception pour les instructions de réinitialisation du mot de passe.');
          navigation.navigate('login')
        }
      } catch (error) {
        if (error.response && error.response.status === 404){
          Alert.alert('Erreur', 'Utilisateur introuvable');        
        } else {
          Alert.alert('Erreur', (error.response && error.response.data.message) || 'Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      }
    
    
  };
  const handleBack = () => {
    navigation.navigate('login')
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10, marginTop:50}}>
                <View style={{width:"68%"}}>
                <Text style={styles.title}>Changer le mot de passe</Text>
                </View>
                <TouchableOpacity  onPress={handleBack} activeOpacity={0.8} style={{backgroundColor:colors.color1, borderRadius:25,}}>                           
                  <ArrowLeft fill={colors.color6}/>
                </TouchableOpacity>  
            </View>

        <View style={{ flex: 1,  justifyContent: 'center' }}>
          <Text style={styles.label}>Votre e-mail</Text>
          <TextInput
              {...inputOptions} 
              placeholder="  exemple.mail@email.com"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={colors.color3}
          />
          <View style={{flexDirection:'column', alignItems:'flex-end'}}>
          <Button
                style={styles.btn} 
                textColor={'white'} 
                onPress={handleForgotPassword}
                >
            Changer votre mot de passe
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.compte}>Vous avez déjà un compte ?</Text>
            </TouchableOpacity>
          </View>
          
          
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.color1,
    paddingHorizontal:30
  },
  title: {
    fontSize: 24,
    fontFamily:fonts.font1,
    color:colors.color6
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label:{
    fontSize:14,
    marginTop:10,
    color:colors.color2,
    fontFamily:fonts.font2,
    fontWeight:"700"
   },
   compte:{
    textAlign:'center',
    color:colors.color6,
    marginVertical:10, 
    textDecorationLine: 'underline',
    fontSize:14
   },
   btn:{
    backgroundColor:colors.color2,
    borderRadius:5,
    width:"75%"
   }
});

export default Pwd;
