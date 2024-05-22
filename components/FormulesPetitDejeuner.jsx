import { View, Text, ScrollView, TouchableOpacity  } from 'react-native'
import React, { useState} from 'react'
import { useSelector,  } from 'react-redux'
import { styles} from '../styles/home'; 
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ModaleFormulePetitdej from './ModaleFormulePetitDej';


const FormulesSalees = () => {

    const navigation = useNavigation();
    const user = useSelector((state) => state.auth.user);
    const [modalVisible, setModalVisible] = useState(false);


    const openFormuleArtisan = () => {
        // if (user.role  === 'SUNcollaborateur'){
        //     setModalVisible(true)
        // }
        // else {
        //     navigation.navigate('artisan')
        // }

        setModalVisible(true)
       
    }
    const openFormulePetitDejeuner = () => {
        // if (user.role  === 'SUNcollaborateur'){
        //     setModalVisible(true)
        // }
        // else {
        //     navigation.navigate('petitdej')
        // }
        setModalVisible(true)
       
    }
    const openFormulePetitDejeunerGourmand = () => {
        // if (user.role  === 'SUNcollaborateur'){
        //     setModalVisible(true)
        // }
        // else {
        //     navigation.navigate('petitdejgourmand')
        // }
        setModalVisible(true)
    }
  
  return (
    <View style={{marginLeft:30, marginTop:10}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={styles.text1formule}>Les formules du <Text style={styles.text2formule}>petit déjeuner </Text></Text>

        </View>
              
              <ScrollView horizontal={true} style={{marginVertical:10}}>

                {/* artisan */}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleArtisan} activeOpacity={0.8}>  
                    <FastImage
                    source={require('../assets/Formuleartisan.jpg')}
                    style={{ width: 315, height: 200, resizeMode:'cover' }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Artisan</Text>
                        <Text style={styles.textFormule}>Un café et un en-cas de 6h à 8h</Text>
                    </View>
                </TouchableOpacity>

                {/* petit dej */}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormulePetitDejeuner} activeOpacity={0.8}>
                     <FastImage
                    source={require('../assets/FormulePetitdejeuner.jpg')}
                    style={{ width: 315, height: 200, resizeMode:'cover' }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Petit Déjeuner </Text>
                        <Text style={styles.textFormule}>Une viennoiserie, un jus d'orange et un café</Text>
                    </View>
                </TouchableOpacity>

                {/* petit dej gourmand*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormulePetitDejeunerGourmand} activeOpacity={0.8}>
                     <FastImage
                    source={require('../assets/FormulepetitdejeunerGourmand.jpg')}
                    style={{ width: 315, height: 200, resizeMode:'cover' }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Petit déjeuner gourmand</Text>
                        <Text style={styles.textFormule} numberOfLines={2}>Une viennoiserie, un jus d'orange et une boisson gourmande</Text>
                    </View>
                </TouchableOpacity>
                    
                
              </ScrollView>
              <ModaleFormulePetitdej modalVisible={modalVisible} setModalVisible={setModalVisible}  />

          </View>
  )
}

export default FormulesSalees