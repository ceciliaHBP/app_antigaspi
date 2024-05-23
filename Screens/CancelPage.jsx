import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {colors, fonts} from '../styles/styles';

import FooterProfile from '../components/FooterProfile';
import {SimpleArrowLeft} from '../SVG/SimpleArrowLeft';
import {ApplyCode} from '../SVG/ApplyCode';
import { Echec } from '../SVG/Echec';

const CancelPage = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const order = useSelector(state => state.order.orderId);
  //console.log('order', order)
  const role = user.role;

  const submitHandler = async () => {
    navigation.navigate('home');
  };

  return (
    <>
      <View style={style.container}>
        <View>
          <Echec />
        </View>
        <View style={style.centeredTextContainer}>
          <View style={style.centeredText}>
            <Text style={style.text1Color}>Oups ... paiement échoué !</Text>
          </View>
          <View style={style.centeredText}>
            {role === 'SUNcollaborateur' ? (
              <View>
                <Text style={style.text2Color}>
                  Tu n'es pas allé au bout de ta commande ...
                </Text>
                <Text style={style.text2Color}>Réessaye !</Text>
              </View>
            ) : (
              <Text style={style.text2Color}>
                Votre commande n'a pas été finalisée{' '}
              </Text>
            )}
          </View>
        </View>
        <View style={style.contentWrapper}>
          <View style={style.centeredButton}>
            <TouchableOpacity
              onPress={submitHandler}
              style={{
                ...style.btnBack,
                backgroundColor: colors.color1,
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-around',
              }}>
              <SimpleArrowLeft />
              <Text style={style.textBtnBack}>Retourner à l'accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FooterProfile />
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    //reajustement margin pour laisser de la place au footer
    // marginBottom:70,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 60,
    paddingHorizontal: 30,
  },
  btnBack: {
    backgroundColor: colors.color9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 200,
  },
  textBtnBack: {
    color: colors.color6,
    fontSize: 16,
    textAlign: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    gap: 20,
  },
  centeredTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    marginVertical: 20,
  },
  centeredButton: {
    alignSelf: 'center',
    width: 200,
    gap: 10,
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: colors.color9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.color6,
    fontSize: 16,
  },
  text2Color: {
    color: colors.color1,
    textAlign: 'center',
  },
  text1Color: {
    color: colors.color2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CancelPage;
