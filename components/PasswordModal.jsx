import { View, Text, Modal, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState} from 'react';
import { Button  } from 'react-native-paper'
import {fonts, colors} from '../styles/styles'
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import { API_BASE_URL } from '../config'; 
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const PasswordModal = ({ isVisible, onClose, onChangePassword }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const user = useSelector((state) => state.auth.user);
    const userId = user.userId
  
    const handlePasswordChange = async () => {
      
      if (newPassword !== confirmPassword) {
        // Afficher une alerte ou un message indiquant que les mots de passe ne correspondent pas
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
        return;
      }
      
      try {
        await axios.put(`${API_BASE_URL}/updatePassword`, {  
          userId,
          newPassword
        });
        
        Alert.alert('Succès', 'Mot de passe mis à jour avec succès');
        onClose();
      } catch (error) {
        // Gérer les erreurs ici - peut-être afficher une alerte ou un message à l'utilisateur
        Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du mot de passe');
        // console.error(error);
      } 
    };
  
    return (
    <View style={style.container}>
      <Modal visible={isVisible} onRequestClose={onClose} transparent={true} animationType="slide">
        
        <View style={style.centeredView}>
          
          <View style={style.modalView}>
          <TouchableOpacity onPress={onClose} style={style.container_cross} >
            <Text style={style.cross}>&times;</Text>
          </TouchableOpacity>
            <Text style={style.title}>Changer votre mot de passe</Text>

            <View style={style.viewText}>
            <Text style={style.texte}>Bonjour {user.firstname},</Text>
            <Text style={{...style.texte, textAlign:'justify'}}>Il semble que vous souhaitiez changer votre mot de passe. La sécurité de votre compte est notre priorité,
             et un mot de passe fort est essentiel pour protéger vos informations personnelles.
            Veuillez saisir votre nouveau mot de passe, ci-dessous</Text>
            </View>
            
           
            <TextInput 
              secureTextEntry 
              placeholder='Nouveau mot de passe'
              placeholderTextColor={colors.color5}
              style={style.input}
              onChangeText={setNewPassword}
              value={newPassword}
            />
            <TextInput 
              secureTextEntry 
              placeholder='Confirmer le mot de passe'
              placeholderTextColor={colors.color5}
              style={style.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />

          <View style={style.viewText}>
            <Text style={style.rules}><Text style={style.title_rules}>Longueur Minimale :</Text> Votre mot de passe doit contenir au moins 5 caractères.</Text>
            <Text style={style.rules}><Text style={style.title_rules}>Diversité des Caractères :</Text>  Utilisez une combinaison de majuscules, de minuscules, de chiffres et de caractères spéciaux (ex. @, #, $).</Text>
          </View>

        <View style={style.container_btn}>
          <Button
              style={style.button} 
              textColor={'white'} 
              onPress={onClose}
              >
              Annuler
          </Button>
          <Button
              style={{...style.button, backgroundColor:colors.color9, borderColor:colors.color9} }
              textColor={'white'} 
              onPress={handlePasswordChange}
              >
              Valider
          </Button>
        </View>
            
          </View>
        </View>
      </Modal>
      </View>
    );
  };
  
  const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
      position:'relative',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        height:"80%",
    },
    container_cross:{
      position:"absolute", top:10, right:15, color:colors.color1
    },
    cross:{
      fontSize: 30, 
      color:colors.color1
    },
    input: {
        height: 40, 
        borderColor: colors.color4, 
        borderWidth: 1,
        marginBottom: 20, 
        width: '100%', 
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor:colors.color4,
    },
    title:{
      marginVertical:30,
      fontFamily:fonts.font1,
      color: colors.color2,
      fontWeight:"700",
      fontSize:16,
      textAlign:'center'
    },
    button:{
      backgroundColor: colors.color8,
      borderRadius:6,
      borderWidth:1,
      borderStyle:'solid',
      marginVertical:10,
      paddingHorizontal:20,
      borderColor:colors.color8
    },
    container_btn:{
      flexDirection:'row', 
      justifyContent:'center',
      gap:30
    },
    viewText:{
      marginBottom:20
    },
    texte:{
      textAlign:'left', 
      color:colors.color1, 
      fontSize:12
    },
    rules:{
      textAlign:'justify', 
      color:colors.color5, 
      fontSize:11,
      marginBottom:10
    },
    title_rules:{
      fontWeight:"bold",
      color:colors.color5, 
    }
    
});


export default PasswordModal

