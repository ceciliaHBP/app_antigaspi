import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ArrowLeft from '../SVG/ArrowLeft';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../styles/styles';
import {validateEmail} from '../validation/validationInput';
import {linkToSUN, cancelLink, linkFromSUN} from '../reducers/authSlice';
import {DemandeConnexionPdjToSun, getStatusSUN, AnnulationApresErreurPdj} from '../CallApi/api';
import logoSun from '../assets/logoSUNPremium.jpg';

const PdjConnect = ({navigation}) => {
  const handleBack = () => {
    navigation.navigate('home');
  };

  const [email, setEmail] = useState('');
  const [isInDemand, setIsInDemand] = useState(false);
  const [statusSun, setStatusSun] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const status = useSelector(state => state.auth.user.statusSUN);

  useEffect(() => {
    const getStatusSun = async () => {
      try {
        const statusSUN = await getStatusSUN(user.userId);
        dispatch(linkFromSUN(statusSUN));
        console.log(statusSUN);
        setStatusSun(statusSUN);
      } catch (error) {
        console.error("Une erreur s'est produite, coté  statusSUn :", error);
      }
    };

    getStatusSun();
  }, [status]);

  const DemandeDeConnexionDePdjVersSun = async () => {

    console.log('email', email)
    const validationResult = validateEmail(email);
    if (validationResult) {
      Alert.alert(validationResult);
      return;
    }
    try {
      const response = await DemandeConnexionPdjToSun(user.userId, email);
      if (response.status === 'success') {
        dispatch(linkToSUN('en attente'));
        setIsInDemand(true);
      }
    } catch (error) {
      Alert.alert('Email non trouvé dans la base de Sun');
    }
  };

  const annulationDeMaDemandeVersSun = async () => {
    try {
      const response = await AnnulationApresErreurPdj(user.userId);
      if (response.status === 'success') {
        dispatch(cancelLink(null));
        setIsInDemand(false);
      }
    } catch (error) {
      // comment bien géré l'erreu coté front si le mail n'est pas trouvé coté SUN
      console.error(
        "Une erreur s'est produite, côté envoi demande de connexion :",
        error,
      );
     
    }
  };

  return (
    <View style={styles.container}>
      <View style={{paddingTop: 50}}></View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.ViewTitle}>
          <Text>Connexion avec Sun</Text>
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={1}
            style={styles.TouchArrow}>
            <ArrowLeft fill="white" />
          </TouchableOpacity>
        </View>

        {/* Formulaire de demande de connexion  PDJ -> SUN*/}

        <View style={styles.textContent}>
          <Text style={styles.textColor}>PDJ Connect </Text>
          <Text style={styles.textColor}>Demande de Connexion vers SUN </Text>
          <Text style={styles.textColor}>Renseigner votre email SUN ?</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text.toLowerCase())}
            value={email}
            autoCapitalize="none"
          />

          <Text style={styles.textColor}>
            StatusSUN: {statusSun === null ? `null` : statusSun}{' '}
          </Text>

          <TouchableOpacity
            onPress={() => {
              DemandeDeConnexionDePdjVersSun();
            }}
            style={styles.btn}>
            <Text style={styles.colorTextBtn}>Envoyer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              annulationDeMaDemandeVersSun();
            }}
            style={{...styles.btn, backgroundColor: colors.color2}}>
            <Text style={styles.colorTextBtn}>Annuler </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    flexGrow: 1,
    // alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchArrow: {
    backgroundColor: 'black',
    borderRadius: 25,
  },
  ViewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  textContent: {
    marginVertical: 20,
    alignItems: 'center',
  },
  textColor: {
    textAlign: 'center',
    color: colors.color1,
    fontSize: 16,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: colors.color9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 150,
    marginVertical: 5,
  },
  colorTextBtn: {
    color: colors.color6,
    textAlign: 'center',
  },
  colorTextBtnInWaiting: {
    color: colors.color1,
    textAlign: 'center',
  },
});

export default PdjConnect;
