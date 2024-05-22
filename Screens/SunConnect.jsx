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
import {ConfirmationDemandeSun,RefusApresDemandeSun,  getStatusSUN} from '../CallApi/api';
import logoSun from '../assets/logoSUNPremium.jpg';

const SunConnect = ({navigation}) => {
  const handleBack = () => {
    navigation.navigate('home');
  };

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
        // console.log('status page sun connect', statusSUN);
        setStatusSun(statusSUN);
      } catch (error) {
        console.error("Une erreur s'est produite, coté  statusSUn :", error);
      }
    };

    getStatusSun();
  }, [status]);


  // je confirme la demande de connection demandée par SUN
  const Confirmation = async () => {
   
    try {
      await ConfirmationDemandeSun(user.userId, user.idSUN);
      dispatch(linkFromSUN('confirmé'))
    } catch (error) {
      // comment bien géré l'erreu coté front si le mail n'est pas trouvé coté SUN
      console.error(
        "Une erreur s'est produite, côté envoi de confirmation de connexion :",
        error,
      );
    }
  };

 // j'annule la demande de lien de sun, le statusSUN = null et je vide l'idSUN
 const Annulation = async () => {
  try {
    await RefusApresDemandeSun(user.idSUN, user.userId);
    dispatch(cancelLink())

  } catch (error) {
    console.error("Une erreur s'est produite, coté  annulation  :", error);
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

        {/* Infos de connexion de SUN - > PDJ */}

        <View style={styles.textContent}>
          <Text style={styles.textColor}>SUN Connect </Text>
          <Text style={styles.textColor}>Demande de Connexion par SUN </Text>
          <Text style={styles.textColor}>
            StatusSUN: {statusSun === null ? `null` : statusSun}{' '}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              Confirmation();
            }}
            style={styles.btn}>
            <Text style={styles.colorTextBtn}>Confirmer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Annulation();
            }}
            style={{...styles.btn, backgroundColor: colors.color2}}>
            <Text style={styles.colorTextBtn}>Refuser</Text>
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

export default SunConnect;
