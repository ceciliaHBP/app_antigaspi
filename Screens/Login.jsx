import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {inputStyling, colors, fonts} from '../styles/styles';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, updateSelectedStore} from '../reducers/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {configureAxiosHeaders} from '../Fonctions/fonctions';
// import {
//   EMAIL_INVITE,
//   PASSWORD_INVITE,
// } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {API_BASE_URL} from '../config';
import axios from 'axios';

//options des input
const inputOptions = {
  style: inputStyling,
  mode: 'outlined',
  outlineColor: 'white',
};

const Login = ({navigation}) => {
  // console.log('api base url :', API_BASE_URL);
  const dispatch = useDispatch();
  const selectedStoreRedux = useSelector(state => state.auth.selectedStore);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const submitHandler = async () => {
    const clientData = {
      email,
      password,
    };
    //console.log('clientData', clientData)
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, clientData);
      // console.log('res', res.data)
      const user = res.data.user;
      const token = res.data.token;

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      await configureAxiosHeaders();

      // console.log('token Login', token)

      const selectedStoreId = user.storeId;

      axios
        .get(`${API_BASE_URL}/getOneStore/${selectedStoreId}`)
        .then(async storeResponse => {
          const selectedStore = storeResponse.data;
          dispatch(updateSelectedStore(selectedStore));
          dispatch(loginUser(user));
          navigation.navigate('home');
          await AsyncStorage.setItem(
            'selectedStore',
            JSON.stringify(selectedStore),
          );
          //console.log('store', selectedStore)
        })
        .catch(error => {
          console.log(
            'Erreur lors de la récupération des informations du magasin:',
            error,
          );
        });
    } catch (error) {
      //console.log('erreur connexion login', error);
      return Toast.show({
        type: 'error',
        text1: `Echec de connexion`,
        text2: `Rentrez correctement votre email et mot de passe`,
      });
    }
  };
  const loginAsGuest = async () => {
    try {
      const getemail = await axios.get(`${API_BASE_URL}/getEmailInvite`);
      const getpasswd = await axios.get(`${API_BASE_URL}/getPsswInvite`);

      const email = getemail.data.EMAIL_INVITE;
      // console.log('email', email);
      const password = getpasswd.data.PASSWORD_INVITE;
      const clientData = {
        email,
        password,
      };

      // console.log('clientData', clientData);

      const res = await axios.post(`${API_BASE_URL}/login`, clientData);
      const user = res.data.user;
      const token = res.data.token;

      await AsyncStorage.setItem('userToken', token);

      const selectedStoreId = user.storeId;

      axios
        .get(`${API_BASE_URL}/getOneStore/${selectedStoreId}`)
        .then(storeResponse => {
          const selectedStore = storeResponse.data;
          dispatch(updateSelectedStore(selectedStore));
          dispatch(loginUser(user));
          navigation.navigate('home');
        })
        .catch(error => {
          console.log(
            'Erreur lors de la récupération des informations du magasin:',
            error,
          );
        });
    } catch (error) {
      // console.log(error);
      return Toast.show({
        type: 'error',
        text1: `Echec de connexion`,
        text2: `Impossible de se connecter en tant qu'invité`,
      });
    }
  };

  // const handleInvite = () => {
  //   console.log('test')
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={style.container}>
      <View style={style.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../assets/logo_pdj.png')}
            style={{width: 140, height: 140, resizeMode: 'contain'}}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={style.title1}>Connexion</Text>
          <Text style={style.title2}>Connectez vous à votre compte</Text>
        </View>

        <Text style={style.label}>Adresse e-mail</Text>
        <TextInput
          {...inputOptions}
          autoCapitalize="none"
          placeholder="exemple.mail@email.com"
          placeholderTextColor={colors.color1}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={style.label}>Mot de passe</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            {...inputOptions}
            placeholder="Mot de passe"
            placeholderTextColor={colors.color1}
            secureTextEntry={isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={style.visibilityToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('pwd')}>
          <Text style={{...style.signup, fontSize: 12, textAlign: 'left'}}>
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
            paddingVertical: 10,
          }}>
          <Button
            style={{...style.btn, backgroundColor: colors.color5}}
            textColor={'white'}
            //inactif si email ou password vide
            onPress={() => navigation.navigate('signup')}>
            Inscription
          </Button>
          <Button
            style={style.btn}
            textColor={'white'}
            //inactif si email ou password vide
            disabled={email === '' || password === ''}
            onPress={submitHandler}>
            Se connecter
          </Button>
        </View>

        <TouchableOpacity onPress={loginAsGuest}>
          <Text style={style.signup}>
            Accédez à l'application en tant qu'invité
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: colors.color1,
  },

  title1: {
    marginVertical: 5,
    color: colors.color6,
    fontSize: 32,
    fontFamily: fonts.font1,
  },
  title2: {
    fontSize: 18,
    color: colors.color6,
    fontFamily: fonts.font3,
    fontWeight: '700',
  },
  back: {
    backgroundColor: colors.color1,
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: colors.color2,
    margin: 5,
    borderRadius: 6,
    // marginHorizontal:80,
    // marginTop:40
  },
  signup: {
    textAlign: 'center',
    color: colors.color6,
    marginVertical: 10,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    color: colors.color2,
    fontFamily: fonts.font2,
    fontWeight: '700',
  },
  visibilityToggle: {
    paddingHorizontal: 10,
  },
});

export default Login;
