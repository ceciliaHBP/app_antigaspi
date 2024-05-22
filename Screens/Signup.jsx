import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import axios from 'axios';
import {inputStyling, fonts, colors} from '../styles/styles';
import {registerUser} from '../reducers/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

import {
  validateLastName,
  validateFirstName,
  validateEmail,
  validatePassword,
  validatePostalCode,
  validateGenre,
  validateDateOfBirth,
  validateIdSun,
  validateTelephone,
} from '../validation/validationInput';
import ArrowLeft from '../SVG/ArrowLeft';
// import {API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS} from '@env';
import { API_BASE_URL } from '../config';

const inputOptions = {
  style: inputStyling,
  mode: 'outlined',
  outlineColor: 'white',
};

const Signup = ({navigation}) => {

  useEffect(() => {
    const getStore = async () => {
      try {
  
        const response = await axios.get(`${API_BASE_URL}/getAllStores`);
        console.log('response store', response.data[0].storeId)
        setStore(response.data[0].storeId);
      } catch (error) {
        console.error('erreur:', error);
      }
    }
    getStore()
  }, []);


  const dispatch = useDispatch();
  // const selectedStore = useSelector(state => state.auth.selectedStore);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cp, setCodePostal] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [idSUN, setIdSun] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [store, setStore] = useState(null);



  const [error, setError] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    cp: '',
    //genre: '',
    date: '',
    idSUN: '',
    role: '',
    telephone: '',
  });

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0 en JavaScript
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

 

  const submitHandler = async () => {

    //suppression des espaces
    const firstname= firstName.trim().replace(/\s+/g, '');
    const lastname = lastName.trim().replace(/\s+/g, '');

    const clientData = {
      lastname,
      firstname,
      email,
      password,
      storeId: store,
      cp: parseInt(cp, 10),
      genre,
      date_naissance: formattedDate,
      idSUN,
      role: 'client',
      telephone,
    };

    // console.log('clientData', clientData);

    let errors = [];

    // Valider chaque champ et ajouter des messages d'erreur si nécessaire
    if (validateLastName(lastname)) errors.push(validateLastName(lastname));
    if (validateFirstName(firstname)) errors.push(validateFirstName(firstname));
    if (validateEmail(email)) errors.push(validateEmail(email));
    if (validatePassword(password)) errors.push(validatePassword(password));
    if (validatePostalCode(cp)) errors.push(validatePostalCode(cp));
    if (validateTelephone(telephone)) errors.push(validateTelephone(telephone));

    // ... autres validations

    // Afficher un toast si des erreurs de validation sont présentes
    if (errors.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Erreur de validation',
        text2: errors.join(', '),
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, clientData);

      // console.log('response.data', response.data);

      const userId = response.data.id;
      const user = {
        userId,
        firstname,
        lastname,
        email,
        password,
        cp,
        genre,
        idSUN,
        role: clientData.role,
        telephone,
        store
      };
      // console.log('user', user);
      dispatch(registerUser(user));

      //ajout route envoi email de creation de compte
      const date = getCurrentDate();
      const res = await axios.post(`${API_BASE_URL}/sendWelcomeEmail`, {
        email,
        firstname,
        date,
      });

      // Navigate and display toast
      navigation.navigate('login');
      Toast.show({
        type: 'success',
        text1: `Inscription validée`,
        text2: `Bienvenue ${user.firstname} ${user.lastname}`,
      });
    } catch (error) {
      console.error('erreur signup', error);

      if (error.response) {
        // Le serveur a répondu avec un statut d'erreur
        console.error('Erreur du serveur:', error.response.status);
        console.error('Détails de l’erreur:', error.response.data);
      } else if (error.request) {
        // La requête a été faite mais pas de réponse reçue
        console.error('Pas de réponse du serveur:', error.request);
      } else {
        // Quelque chose est arrivé lors de la mise en place de la requête
        console.error(
          'Erreur lors de la configuration de la requête',
          error.message,
        );
      }

      if (error.response && error.response.status === 400) {
        console.error(error.response.data.error);
        Toast.show({
          type: 'error',
          text1: `Erreur d'inscription`,
          text2: error.response.data.error[0].message,
        });
      }
    }
  };

  const handleBack = () => {
    navigation.navigate('login');
  };

  function convertDateFormat(dateString) {

    if (!dateString || dateString.split('-').length !== 3) {
      return null;
    }

    const [year, month, day] = dateString.split('-');
  
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <Text style={style.title}>Création de compte</Text>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={1}
              style={{backgroundColor: 'black', borderRadius: 25}}>
              <ArrowLeft fill="white" />
            </TouchableOpacity>
          </View>

          <View style={{paddingBottom: 30}}>
            {/* Email */}
            <Text style={style.label}>Votre mail</Text>
            <TextInput
              {...inputOptions}
              autoCapitalize="none"
              placeholder="exemple@email.com (obligatoire)" 
              keyboardType="email-address"
              value={email}
              onChangeText={value => {
                setEmail(value);
                setError({...error, email: validateEmail(value)});
              }}
              style={
                error.email
                  ? {...inputOptions.style, borderColor: 'red'}
                  : inputOptions.style
              }
            
            />
            {/* {error.email ? <Text style={{color: 'red', textAlign:'center'}}>{error.email}</Text> : null} */}

            {/* Mot de passe */}
            <Text style={style.label}>Votre mot de passe</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <TextInput
              {...inputOptions}
              placeholder="Mot de passe (obligatoire)"
              secureTextEntry={isPasswordVisible}
              value={password}
              onChangeText={value => {
                setPassword(value);
                setError({...error, password: validatePassword(value)});
              }}
              style={{flex:1}}
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
            
            {/* {error.password ? <Text style={{color: 'red', textAlign:'center'}}>{error.password}</Text> : null} */}
            <Text style={style.reglePwd}>
              Le mot de passe doit inclure au moins 8 caractères, avec au moins
              1 lettre majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial
            </Text>
          </View>

          <View style={{marginBottom: 30}}>
            <Text style={style.label}>Votre information personnelle</Text>

            {/* genre */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginVertical: 10,
                justifyContent: 'space-around',
              }}>
              <Text style={style.texteGenre}>Vous êtes :</Text>
              <TouchableOpacity
                style={style.radioButtonOut}
                onPress={() => {
                  setGenre('femme');
                }}>
                {genre === 'femme' && <View style={style.radioButtonIn} />}
              </TouchableOpacity>
              <Text style={style.texteGenre}>Mme.</Text>
              <TouchableOpacity
                style={style.radioButtonOut}
                onPress={() => {
                  setGenre('homme');
                }}>
                {genre === 'homme' && <View style={style.radioButtonIn} />}
              </TouchableOpacity>
              <Text style={style.texteGenre}>M.</Text>
              <TouchableOpacity
                style={style.radioButtonOut}
                onPress={() => {
                  setGenre('nbinaire');
                }}>
                {genre === 'nbinaire' && <View style={style.radioButtonIn} />}
              </TouchableOpacity>
              <Text style={style.texteGenre}>Non-binaire</Text>
            </View>

            {/* Nom */}
            <TextInput
              {...inputOptions}
              placeholder="Nom (obligatoire)"
              keyboardType="default"
              value={lastName}
              onChangeText={value => {
                setLastName(value);
                setError({...error, lastname: validateLastName(value)});
              }}
              style={
                error.lastName
                  ? {...inputOptions.style, borderColor: 'red'}
                  : inputOptions.style
              }
            />
            {/* {error.lastname ? <Text style={{color: 'red', textAlign:'center'}}>{error.lastname}</Text> : null} */}

            {/* Prenom */}
            <TextInput
              {...inputOptions}
              placeholder="Prénom (obligatoire)"
              keyboardType="default"
              value={firstName}
              onChangeText={value => {
                setFirstName(value);
                setError({...error, firstname: validateFirstName(value)});
              }}
              style={
                error.firstName
                  ? {...inputOptions.style, borderColor: 'red'}
                  : inputOptions.style
              }
            />
            {/* {error.firstname ? <Text style={{color: 'red', textAlign:'center'}}>{error.firstname}</Text> : null} */}

            {/* numero de telephone */}
            <TextInput
              {...inputOptions}
              placeholder="Numéro de téléphone"
              keyboardType="numeric"
              value={telephone}
              onChangeText={value => {
                setTelephone(value);
                setError({...error, elephone: validateTelephone(value)});
              }}
              style={inputOptions.style}
            />

            {/* code postal */}
            <TextInput
              {...inputOptions}
              placeholder="Code postal"
              keyboardType="numeric"
              value={cp}
              onChangeText={value => {
                setCodePostal(value);
                setError({...error, cp: validatePostalCode(value)});
              }}
              style={
                error.cp
                  ? {...inputOptions.style, borderColor: 'red'}
                  : inputOptions.style
              }
            />
            {/* {error.cp ? <Text style={{color: 'red', textAlign:'center'}}>{error.cp}</Text> : null} */}

            {/* date de naissance */}
            <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.8}>
            <TextInput
              {...inputOptions}
              // value={formattedDate}
              value={convertDateFormat(formattedDate)} 
              editable={false} // Empêche l'utilisateur de taper manuellement dans ce champ
              placeholder="Date de naissance"
              onTouchStart={() => setOpen(true)} // Ouvre le date picker lorsque le champ est touché
            />
            <DatePicker
              cancelText="Annuler"
              confirmText="Confirmer"
              locale="fr"
              modal
              mode="date"
              minimumDate={new Date(1900, 0, 1)} // 1 Janvier 1900
              maximumDate={new Date()}
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                const formatted = `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`;
                setFormattedDate(formatted);
                setError({...error, date: validateDateOfBirth(date)});
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            </TouchableOpacity>
          </View>

          {/* numero client SUN */}
          {/* <View>
            <Text style={style.label}>Êtes vous client SUN</Text>
            <TextInput
              {...inputOptions}
              placeholder="Votre numéro de compte SUN"
              keyboardType="numeric"
              value={idSUN}
              onChangeText={value => {
                setIdSun(value);
                setError({...error, idSUN: validateIdSun(value)});
              }}
              style={inputOptions.style}
            />
          </View> */}

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              style={style.btn}
              textColor={'white'}
              disabled={
                lastName === '' ||
                firstName === '' ||
                email === '' ||
                password === '' 
              }
              onPress={() => {
                submitHandler();
              }}>
              Suivant
            </Button>
          </View>

          <View style={{marginBottom: 50}}>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={style.login}>Vous avez déja un compte ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    //reajustement margin pour laisser de la place au footer
    // marginBottom:70,
    backgroundColor: colors.color1,
  },
  btn: {
    backgroundColor: colors.color2,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 6,
    marginVertical: 10,
  },
  back: {
    backgroundColor: colors.color1,
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginVertical: 5,
    color: colors.color6,
    fontSize: 24,
    fontWeight: '900',
    fontFamily: fonts.font1,
    width: '60%',
  },
  login: {
    textAlign: 'center',
    color: colors.color6,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  label: {
    // marginLeft:20,
    marginTop: 10,
    color: colors.color2,
    fontWeight: '700',
  },
  radioButtonOut: {
    height: 15,
    width: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.color6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color6,
  },
  radioButtonIn: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: colors.color1,
  },
  reglePwd: {
    color: colors.color3,
    fontSize: 10,
    marginVertical: 5,
  },
  texteGenre: {
    color: colors.color6,
  },
  visibilityToggle: {
    // Styles de votre TouchableOpacity
    paddingHorizontal: 10, // Positionner correctement l'icône dans le TextInput
  },
});

export default Signup;