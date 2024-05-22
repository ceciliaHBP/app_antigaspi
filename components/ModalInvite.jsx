import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Linking, Platform,Image } from 'react-native';
import {  colors, fonts } from '../styles/styles'
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'
import { stylesInvite } from '../styles/invite';

const ModaleInvite = ({ isModalVisible, setIsModalVisible}) => {

    const navigation = useNavigation()

    const handleClose = () => {
        setIsModalVisible(!isModalVisible);
    }

    const handleLogin = () => {
        navigation.navigate('login')
        setIsModalVisible(!isModalVisible);
    }
    const handleSignup = () => {
        navigation.navigate('signup')
        setIsModalVisible(!isModalVisible);
    }
    const openLink = (url) => {
      if (Platform.OS === 'android') {
          Linking.openURL(url)
            .then((supported) => {
              if (!supported) {
                console.log("Can't handle URL: " + url);
              } else {
                return Linking.openURL(url);
              }
            })
            .catch((err) => console.error('An error occurred', err));
      } else if (Platform.OS === 'ios') {
          Linking.canOpenURL(url)
            .then((supported) => {
              if (!supported) {
                console.log("Can't handle URL: " + url);
              } else {
                return Linking.openURL(url);
              }
            })
            .catch((err) => console.error('An error occurred', err));
      }
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      
    >
      <View style={stylesInvite.modalContainer}>
        <View style={stylesInvite.modalContent}>
            <TouchableOpacity onPress={handleClose} style={{ alignItems: 'center', position:'absolute', top:0, right:10, zIndex:99}}>
                <Text style={{ fontSize: 36, color:colors.color2}}>&times;</Text>
              </TouchableOpacity>
            <Text style={{color:colors.color2, marginVertical:5, fontSize:24, fontFamily:fonts.font1}}>Attention</Text>
            <Text style={{ color:colors.color2,marginVertical:5, fontSize:14, textAlign:'center', fontFamily:fonts.font2, fontWeight:"700"}}>Vous êtes connecté en tant qu'invité</Text>
            <Text style={{ marginVertical:15, fontSize:14, textAlign:'justify', color:colors.color6}}>Pour profiter de tous les avantages de l’application Le Pain du Jour, vous pouvez vous connecter 
          avec votre compte ou vous inscrire en quelques clicks !</Text>
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <TouchableOpacity style={{...stylesInvite.btn, backgroundColor:colors.color5}} onPress={handleLogin}>
                <Svg width="17" height="15" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8.5 8.4C10.7091 8.4 12.5 6.5196 12.5 4.2C12.5 1.8804 10.7091 0 8.5 0C6.29086 0 4.5 1.8804 4.5 4.2C4.5 6.5196 6.29086 8.4 8.5 8.4Z" fill="#ECECEC"/>
                    <Path d="M16.5 16.275C16.5 18.8842 16.5 21 8.5 21C0.5 21 0.5 18.8842 0.5 16.275C0.5 13.6657 4.082 11.55 8.5 11.55C12.918 11.55 16.5 13.6657 16.5 16.275Z" fill="#ECECEC"/>
                </Svg>
                <Text style={stylesInvite.textBtn}>Se connecter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesInvite.btn} onPress={handleSignup}>
                <Svg width="17" height="17" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8.5 8C10.7091 8 12.5 6.20914 12.5 4C12.5 1.79086 10.7091 0 8.5 0C6.29086 0 4.5 1.79086 4.5 4C4.5 6.20914 6.29086 8 8.5 8Z" fill="#ECECEC"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M13 20C11.35 20 10.525 20 10.013 19.487C9.5 18.975 9.5 18.15 9.5 16.5C9.5 14.85 9.5 14.025 10.013 13.513C10.525 13 11.35 13 13 13C14.65 13 15.475 13 15.987 13.513C16.5 14.025 16.5 14.85 16.5 16.5C16.5 18.15 16.5 18.975 15.987 19.487C15.475 20 14.65 20 13 20ZM13.583 14.944C13.583 14.7894 13.5216 14.6411 13.4122 14.5318C13.3029 14.4224 13.1546 14.361 13 14.361C12.8454 14.361 12.6971 14.4224 12.5878 14.5318C12.4784 14.6411 12.417 14.7894 12.417 14.944V15.917H11.444C11.2894 15.917 11.1411 15.9784 11.0318 16.0878C10.9224 16.1971 10.861 16.3454 10.861 16.5C10.861 16.6546 10.9224 16.8029 11.0318 16.9122C11.1411 17.0216 11.2894 17.083 11.444 17.083H12.417V18.056C12.417 18.2106 12.4784 18.3589 12.5878 18.4682C12.6971 18.5776 12.8454 18.639 13 18.639C13.1546 18.639 13.3029 18.5776 13.4122 18.4682C13.5216 18.3589 13.583 18.2106 13.583 18.056V17.083H14.556C14.7106 17.083 14.8589 17.0216 14.9682 16.9122C15.0776 16.8029 15.139 16.6546 15.139 16.5C15.139 16.3454 15.0776 16.1971 14.9682 16.0878C14.8589 15.9784 14.7106 15.917 14.556 15.917H13.583V14.944Z" fill="#ECECEC"/>
                    <Path d="M12.178 11.503C11.705 11.508 11.264 11.526 10.88 11.577C10.237 11.664 9.533 11.87 8.952 12.452C8.37 13.033 8.164 13.737 8.078 14.38C8 14.958 8 15.664 8 16.414V16.586C8 17.336 8 18.042 8.078 18.62C8.138 19.071 8.258 19.552 8.525 20H8.5C0.5 20 0.5 17.985 0.5 15.5C0.5 13.015 4.082 11 8.5 11C9.826 11 11.077 11.181 12.178 11.503Z" fill="#ECECEC"/>
                </Svg>
                <Text style={stylesInvite.textBtn}>Inscription</Text>
              </TouchableOpacity>
            </View>
              <Text style={{color:colors.color2,marginVertical:30, fontSize:16, fontFamily:fonts.font1}}>Informations importantes</Text>
              
                <View style={{flexDirection:'row',  flexWrap:'wrap', justifyContent:'center'}}>
     
                <TouchableOpacity   style={stylesInvite.btn_cookies}  onPress={() => openLink('https://www.lepaindujour.io/politique-de-gestion-des-cookies/')}>
                  <Text>Cookies</Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>

                <TouchableOpacity   style={stylesInvite.btn_cookies}  onPress={() => openLink('https://lepaindujour.io/page-de-confidentialite')}>
                  <Text>Données personnelles</Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>
            
                <TouchableOpacity   style={stylesInvite.btn_cookies}  onPress={() => openLink('https://lepaindujour.io/mentions-legales')}>
                  <Text>Mentions légales</Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>

                <TouchableOpacity   style={{...stylesInvite.btn_cookies,}}  onPress={() => openLink('https://www.lepaindujour.io/cgv-cgu/')}>
                  <Text>   CGU, CGV  </Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>

                <TouchableOpacity   style={stylesInvite.btn_cookies}  onPress={() => openLink('https://www.lepaindujour.io/formulaire-de-consentement/')}>
                  <Text>          Formulaire de consentement           </Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>

                <TouchableOpacity   style={stylesInvite.btn_cookies}  onPress={() => openLink('https://www.lepaindujour.io/formulaire-de-demande-dacces/')}>
                  <Text>        Formulaire de demande d'acces       </Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>

                <TouchableOpacity   style={stylesInvite.btn_cookies}  onPress={() => openLink('https://www.lepaindujour.io/formulaire-de-suppression-des-donnees-personnelles//')}>
                  <Text>  Formulaire de suppression des données</Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>
            </View>
          
        </View>
        
      </View>
    </Modal>
  );
};



export default ModaleInvite;
