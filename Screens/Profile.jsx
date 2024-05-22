import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
  Animated,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser, updateSelectedStore} from '../reducers/authSlice';
import {
  addDate,
  addTime,
  clearCart,
  resetDateTime,
} from '../reducers/cartSlice';
import {defaultStyle, inputStyling, colors, fonts} from '../styles/styles';
import SelectDropdown from 'react-native-select-dropdown';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import FooterProfile from '../components/FooterProfile';
//call Api
import {modifyUser} from '../CallApi/api';
import ArrowLeft from '../SVG/ArrowLeft';
import Remove from '../SVG/Remove';
import {API_BASE_URL} from '../config';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PasswordModal from '../components/PasswordModal';
import { useRoute } from '@react-navigation/native';

//options des input
const inputOptions = {
  style: inputStyling,
  mode: 'outlined',
  outlineColor: 'white',
  paddingHorizontal: 10,
};

const Profile = ({navigation}) => {
  

  //animation
  const blinkingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(blinkingAnimation, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [blinkingAnimation]);

  const borderColorAnimation = blinkingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.color2], 
  });

  const openLink = url => {
    if (Platform.OS === 'android') {
      Linking.openURL(url)
        .then(supported => {
          if (!supported) {
            console.log("Can't handle URL: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    } else if (Platform.OS === 'ios') {
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log("Can't handle URL: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  };

  const [stores, setStores] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const userId = user.userId;
  // const selectedStore = useSelector((state) => state.auth.selectedStore);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [cp, setCodepostal] = useState('');
  const [genre, setGenre] = useState(user.genre);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [password, setPassword] = useState('');
  const [store, setStore] = useState('');
  const [selectedStoreDetails, setSelectedStoreDetails] = useState({});
  const [preferences, setPreferences] = useState([]); 
  const [allergies, setAllergies] = useState([]); 
  const [preferenceCommande, setPreferenceCommande] = useState(null);

  //ajouter date de naissance
  const [currentSelection, setCurrentSelection] = useState(null);

  const [isEnabledSMS, setIsEnabledSMS] = useState(false);
  const toggleSwitchSMS = () =>
    setIsEnabledSMS(previousState => !previousState);

  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const toggleSwitchEmail = () =>
    setIsEnabledEmail(previousState => !previousState);

  const [isEnabledPush, setIsEnabledPush] = useState(false);
  const toggleSwitchPush = () =>
    setIsEnabledPush(previousState => !previousState);

  const [isModalVisible, setModalVisible] = useState(false);

  const route = useRoute();
  const scrollViewRef = useRef();
  const section2Ref = useRef();

  //scroll section
  useEffect(() => {
    if (route.params?.scrollToSection) {
      let sectionRef;
      switch (route.params.scrollToSection) {
        case 'section':
          sectionRef = section2Ref;
          break;
        // Plus de cas si nécessaire
      }

      if (sectionRef && sectionRef.current) {
        sectionRef.current.measureLayout(
          scrollViewRef.current,
          (x, y, width, height) => {
            scrollViewRef.current.scrollTo({ x: 0, y: y, animated: true });
          }
        );
      }
    }
  }, [route.params?.scrollToSection]);


  const handleBack = () => {
    navigation.navigate('home');
  };
  useEffect(() => {
    if (user && user.role) {
      allStores();
    }
  }, [user.role]);

  const handleLayout = useCallback(
    section => event => {
      const {y} = event.nativeEvent.layout;
      setPositionsY(prev => ({...prev, [section]: y}));
    },
    [],
  );

  //   const ROLE_STORES = {
  //     SUNcollaborateur: [3,4,5],
  //     client: [1, 2]
  // };

  const allStores = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getStoresByRole`, {
        role: user.role,
      });
      if (response.data && Array.isArray(response.data)) {
        //console.log('stores', response.data)
        setStores(response.data);
      } else {
        console.error("Réponse inattendue de l'API.");
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la récupération des magasins  allStores:",
        error,
      );
    }
  };

  const getUserInfo = async user => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getOne/${user.userId}`);
      const userData = response.data;
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setEmail(userData.email);
      setTelephone(userData.telephone);
      setCodepostal(userData.cp !== null ? userData.cp : '');
      setAdresse(userData.adresse);
      setSelectedAllergies(
        userData.allergies ? userData.allergies.split(',') : [],
      );
      setSelectedPreferences(
        userData.preferences_alimentaires
          ? userData.preferences_alimentaires.split(',')
          : [],
      );
      setPassword(userData.password);
      setStore(userData.storeId);
      setPreferenceCommande(userData.preference_commande);
    } catch (error) {
      console.log(
        'Erreur lors de la récupération des informations utilisateur getUserInfo:',
        error,
      );
    }
  };
  useEffect(() => {
    allStores();
    getUserInfo(user);
    fetchSelectedStoreDetails();
  }, [user]);

  const handleSubmit = async () => {
    dispatch(
      updateUser({
        firstname,
        lastname,
        adresse,
        telephone,
        email,
        cp,
        genre,
        allergies: selectedAllergies,
        preferences_alimentaires: selectedPreferences,
        preference_commande: preferenceCommande,
      }),
    );

    const updatedUser = {
      firstname,
      lastname,
      adresse,
      telephone,
      email,
      cp: cp || cp === 0 ? cp : null,
      genre,
      allergies: selectedAllergies.join(','),
      preferences_alimentaires: selectedPreferences.join(','),
      preference_commande: preferenceCommande,
    };

    try {
      const newUser = await modifyUser(user.userId, updatedUser);
      return Toast.show({
        type: 'success',
        text1: `Modifications enregistrées`,
        text2: ``,
      });
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la mise à jour de l'utilisateur :",
        error,
      );
    }
  };

  const handleLogout = () => {
    dispatch(clearCart());
    navigation.navigate('login');
  };
  const handleCookies = () => {
    navigation.navigate('cookies');
  };
  const handleDonnees = () => {
    navigation.navigate('donnees');
  };
  const handleMentions = () => {
    navigation.navigate('mentions');
  };

  const getPrefAlimentaire = async () => {
    const response = await axios.get(`${API_BASE_URL}/getListePref`);
    setPreferences(response.data);
  };
  const getAllergies = async () => {
    const response = await axios.get(`${API_BASE_URL}/getListeAllergie`);
    setAllergies(response.data);
  };

  useEffect(() => {
    getPrefAlimentaire();
    getAllergies();
  }, []);

  const removeSelectedAllergy = allergyToRemove => {
    const updatedAllergies = selectedAllergies.filter(
      allergy => allergy !== allergyToRemove,
    );
    setSelectedAllergies(updatedAllergies);
  };

  const removeSelectedPreference = preferenceToRemove => {
    const updatedPreferences = selectedPreferences.filter(
      pref => pref !== preferenceToRemove,
    );
    setSelectedPreferences(updatedPreferences);
  };

  const openPasswordModal = () => {
    setModalVisible(true);
  };

  const fetchSelectedStoreDetails = async () => {
    if (user.storeId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getOneStore/${user.storeId}`,
        );
        if (response.data) {
          setSelectedStoreDetails(response.data);
        }
      } catch (error) {
        console.log(
          'Erreur lors de la récupération des détails du magasin :',
          error,
        );
      }
    }
  };

  return (
    <>
      <SafeAreaProvider
        style={{flex: 1, paddingTop: 50, backgroundColor: colors.color4}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 15, marginTop: 30}}
          ref={scrollViewRef}
        >
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginBottom: 20,
              }}>
              <Text style={style.title}>Votre compte</Text>
              <TouchableOpacity
                onPress={handleBack}
                activeOpacity={0.8}
                style={{backgroundColor: 'white', borderRadius: 25}}
                >
                <ArrowLeft fill={colors.color1} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', marginVertical: 10}}>
              <Text
                style={{
                  color: colors.color2,
                  fontSize: 24,
                  fontWeight: '600',
                  paddingHorizontal: 10,
                  marginBottom: 15,
                }}>
                #UserId {user.userId}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  paddingHorizontal: 10,
                  color: colors.color1,
                }}>
                Ce code unique pour vous permet de vous identifier sur le réseau
                SUN
              </Text>
            </View>
          </View>

          <Text style={style.title_section}>Vos données personnelles</Text>
          <View style={style.formulaire}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                }}>
                <Text style={style.textlabel}>Vous êtes :</Text>
                <TouchableOpacity
                  style={style.radioButtonOut}
                  onPress={() => {
                    setGenre('femme');
                  }}>
                  {genre === 'femme' && <View style={style.radioButtonIn} />}
                </TouchableOpacity>
                <Text style={style.textlabel}>Mme.</Text>
                <TouchableOpacity
                  style={style.radioButtonOut}
                  onPress={() => {
                    setGenre('homme');
                  }}>
                  {genre === 'homme' && <View style={style.radioButtonIn} />}
                </TouchableOpacity>
                <Text style={{...style.textlabel, marginRight: 10}}>M.</Text>
                <TouchableOpacity
                  style={style.radioButtonOut}
                  onPress={() => {
                    setGenre('nbinaire');
                  }}>
                  {genre === 'nbinaire' && <View style={style.radioButtonIn} />}
                </TouchableOpacity>
                <Text style={style.textlabel}>Non-binaire</Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                {...inputOptions}
                value={lastname}
                onChangeText={setLastname}
                style={style.short_input}
                placeholder="Nom"
                placeholderTextColor={colors.color5}
              />
              <TextInput
                {...inputOptions}
                value={firstname}
                onChangeText={setFirstname}
                style={style.short_input}
                placeholder="Prénom"
                placeholderTextColor={colors.color5}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                {...inputOptions}
                onChangeText={setTelephone}
                value={telephone}
                style={style.short_input}
                placeholder="N° téléphone"
                placeholderTextColor={colors.color5}
              />
              <TextInput
                {...inputOptions}
                onChangeText={value =>
                  setCodepostal(value ? parseInt(value) : '')
                }
                value={cp !== null ? cp.toString() : ''}
                style={style.short_input}
                placeholder="Code postal"
                placeholderTextColor={colors.color5}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* <TextInput {...inputOptions}  style={style.short_input} placeholder='Date de naissance'placeholderTextColor={colors.color5}/> */}
              <TouchableOpacity
                style={style.button_passwd}
                activeOpacity={0.7}
                onPress={openPasswordModal}>
                <Text style={style.textPasswd}>*******</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'column', marginVertical: 10}}>
              <Text style={style.label}>Votre email</Text>
              <TextInput
                {...inputOptions}
                placeholder="exemple.mail@email.com"
                onChangeText={setEmail}
                value={email}
                style={style.long_input}
                placeholderTextColor={colors.color5}
              />
            </View>

            <View style={{flexDirection: 'column', marginVertical: 10}}>
              <Text style={style.label}>Votre adresse</Text>
              <TextInput
                {...inputOptions}
                placeholder="123 Direction de la rue"
                onChangeText={setAdresse}
                value={adresse}
                style={style.long_input}
                placeholderTextColor={colors.color5}
              />
            </View>
          </View>

          <Text style={style.title_section}>Vos informations</Text>
          <View style={style.formulaire}>
            {user.role === 'client' && (
              <Text style={style.label}>Votre restaurant favori</Text>
            )}
            {user.role === 'SUNcollaborateur' && (
              <Text style={style.label}>Votre point de livraison favori</Text>
            )}

            {/* <Picker
          style={pickerSelectStyles}
              placeholder={{
                  label: "Modifier votre magasin"
                
                }}
              value={selectedStore.nom_magasin}
              onValueChange={(value) => {
                const selected = stores.find((store) => store.nom_magasin === value);
                //console.log('user', user)

                if (selected) {
                  dispatch(updateSelectedStore(selected));
                // dispatch(updateUser({ ...user, id_magasin: selected.id_magasin }));
                dispatch(updateUser({ ...user, storeId: selected.storeId }));

                axios.put(`${API_BASE_URL}/updateOneUser/${user.userId}`, {storeId: selected.storeId})
                .then(response => {
                  // console.log('Le choix du magasin a été mis à jour avec succès dans la base de données');
                  // console.log(response.data)
                })
                .catch(error => {
                  console.error('Erreur lors de la mise à jour du choix du magasin dans la base de données - erreur ici:', error);
                });
              }
            else {
              console.log('pas de magasin selectionné encore')
            }}
            }
              items={stores.map((store) => ({
                label: store.nom_magasin,
                value: store.nom_magasin,
              }))}
            />  */}
            <SelectDropdown
              data={stores.map(store => store.nom_magasin)} // Utilisez les noms des magasins comme données
              onSelect={(selectedItem, index) => {
                const selected = stores.find(
                  store => store.nom_magasin === selectedItem,
                );
                if (selected) {
                  // dispatch(updateSelectedStore(selected));
                  dispatch(updateUser({...user, storeId: selected.storeId}));
                  setSelectedStoreDetails(selected);
                  axios
                    .put(`${API_BASE_URL}/updateOneUser/${user.userId}`, {
                      storeId: selected.storeId,
                    })
                    .then(response => {
                      // console.log('Le choix du magasin a été mis à jour avec succès dans la base de données');
                    })
                    .catch(error => {
                      console.log(
                        'Erreur lors de la mise à jour du choix du magasin dans la base de données - erreur ici:',
                        error,
                      );
                    });
                } else {
                  console.log('pas de magasin sélectionné encore');
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
              buttonStyle={{
                backgroundColor: colors.color3,
                width: '100%',
                height: 40,
                borderRadius: 5,
              }}
              buttonTextStyle={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.color1,
              }}
              defaultButtonText={selectedStoreDetails.nom_magasin}
            />

            <Text style={style.label}>Vos préférences alimentaires</Text>
            <View style={{marginVertical: 10}}>
              <View>
                <SelectDropdown
                  data={allergies} // Liste des allergies triées comme données
                  onSelect={value => {
                    if (!selectedAllergies.includes(value)) {
                      setSelectedAllergies([...selectedAllergies, value]);
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return 'Ajouter une allergie alimentaire'; // Texte à afficher après la sélection d'un élément
                  }}
                  rowTextForSelection={(item, index) => {
                    return item; // Texte représentant chaque élément dans le menu déroulant
                  }}
                  buttonStyle={{
                    backgroundColor: colors.color3,
                    width: '100%',
                    height: 40,
                    borderRadius: 5,
                  }}
                  buttonTextStyle={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.color1,
                  }}
                  defaultButtonText={`Ajoutez une allergie alimentaire`}
                />
                {/* affichage du tag */}
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {selectedAllergies &&
                    selectedAllergies.length > 0 &&
                    selectedAllergies.map((allergy, index) => (
                      <View style={style.tag} key={index}>
                        <TouchableOpacity
                          onPress={() => removeSelectedAllergy(allergy)}>
                          <Remove />
                        </TouchableOpacity>

                        <Text> {allergy}</Text>
                      </View>
                    ))}
                </View>
              </View>

              {/* dropdown preference alimentaires */}
              <View style={{marginVertical: 10}}>
                <View>
                  <SelectDropdown
                    data={preferences}
                    onSelect={value => {
                      if (!selectedPreferences.includes(value)) {
                        setSelectedPreferences([...selectedPreferences, value]);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return `Ajoutez un choix alimentaire`;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={{
                      backgroundColor: colors.color3,
                      width: '100%',
                      height: 40,
                      borderRadius: 5,
                    }}
                    buttonTextStyle={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: colors.color1,
                    }}
                    defaultButtonText={`Ajoutez un choix alimentaire`}
                  />
                  {/* affichage du tag */}
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {selectedPreferences &&
                      selectedPreferences.length > 0 &&
                      selectedPreferences.map((pref, index) => (
                        <View style={style.tag} key={index}>
                          <TouchableOpacity
                            onPress={() => removeSelectedPreference(pref)}>
                            <Remove />
                          </TouchableOpacity>
                          <Text> {pref} </Text>
                        </View>
                      ))}
                  </View>
                </View>
              </View>
            </View>

            {/* role du user */}
            {/* <Text style={{marginVertical:5}}> Vous êtes un <Text style={style.role}> 
              {
                user.role === 'collaborateur' ? 
                  <Text>Collaborateur</Text> 
                : 
                user.role === 'client' ? 
                  <Text>Client</Text> 
                : 
                null
              }
             </Text>
        </Text> */}


            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                marginVertical: 20,
              }}
              ref={section2Ref}>
              <Animated.View
                style={
                  preferenceCommande === null ?
                  {
                  marginVertical:10,
                  borderWidth: 2,
                  borderColor: borderColorAnimation,
                  padding: 10,
                  borderRadius:10,}
                  : 
                    {
                      borderWidth: 2,
                      borderColor: 'transparent', 
                      padding: 10,
                      borderRadius: 10,
                    }
                  
                }>
                <Text style={style.label}>
                  Choisissez une option en cas d'absence d'un produit dans votre
                  commande{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <TouchableOpacity
                    style={style.radioButtonOut}
                    onPress={() => {
                      if (preferenceCommande === 'remplacement') {
                        setPreferenceCommande(null);
                      } else {
                        setPreferenceCommande('remplacement');
                      }
                    }}>
                    {preferenceCommande === 'remplacement' && (
                      <View style={style.radioButtonIn} />
                    )}
                  </TouchableOpacity>
                  <Text style={style.textlabel}>Produit de remplacement</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <TouchableOpacity
                    style={style.radioButtonOut}
                    onPress={() => {
                      if (preferenceCommande === 'remboursement') {
                        setPreferenceCommande(null);
                      } else {
                        setPreferenceCommande('remboursement');
                      }
                    }}>
                    {preferenceCommande === 'remboursement' && (
                      <View style={style.radioButtonIn} />
                    )}
                  </TouchableOpacity>
                  <Text style={{...style.textlabel, marginRight: 10}}>
                    Remboursement
                  </Text>
                </View>
              </Animated.View>
            </View>


            <View style={{marginVertical: 10}}>
              <Text style={style.label}>Notifications</Text>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colors.color1}}>
                  Recevoir les notifications par SMS
                </Text>
                <Switch
                  trackColor={{false: colors.color8, true: colors.color9}}
                  thumbColor={isEnabledSMS ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor={colors.color8}
                  onValueChange={toggleSwitchSMS}
                  value={isEnabledSMS}
                  //disabled={true}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colors.color1}}>
                  Recevoir les notifications par Email
                </Text>
                <Switch
                  trackColor={{false: colors.color8, true: colors.color9}}
                  thumbColor={isEnabledEmail ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor={colors.color8}
                  onValueChange={toggleSwitchEmail}
                  value={isEnabledEmail}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colors.color1}}>
                  Recevoir des notifications Push
                </Text>
                <Switch
                  trackColor={{false: colors.color8, true: colors.color9}}
                  thumbColor={isEnabledPush ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor={colors.color8}
                  onValueChange={toggleSwitchPush}
                  value={isEnabledPush}
                />
              </View>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={style.label}>
                Gestion des cookies et données personnelles
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={style.btn_cookies}
                  onPress={() =>
                    openLink(
                      'https://www.lepaindujour.io/politique-de-gestion-des-cookies/',
                    )
                  }>
                  <Text style={{color: colors.color1}}>Cookies</Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.btn_cookies}
                  onPress={() =>
                    openLink('https://lepaindujour.io/page-de-confidentialite')
                  }>
                  <Text style={{color: colors.color1}}>
                    Données personnelles
                  </Text>
                  <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={style.label}>Informations légales</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={style.btn_cookies}
                onPress={() =>
                  openLink('https://lepaindujour.io/mentions-legales')
                }>
                <Text style={{color: colors.color1}}>Mentions légales</Text>
                <Image source={require('../assets/arrow.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                style={style.btn_cookies}
                onPress={() =>
                  openLink('https://www.lepaindujour.io/cgv-cgu/')
                }>
                <Text style={{color: colors.color1}}>CGU, CGV</Text>
                <Image source={require('../assets/arrow.png')} />
              </TouchableOpacity>
            </View>

            <Text style={style.label}>Gestion des données</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <TouchableOpacity
                style={style.btn_cookies}
                onPress={() =>
                  openLink(
                    'https://www.lepaindujour.io/formulaire-de-consentement/',
                  )
                }>
                <Text style={{color: colors.color1}}>
                  Formulaire de consentement
                </Text>
                <Image source={require('../assets/arrow.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                style={style.btn_cookies}
                onPress={() =>
                  openLink(
                    'https://www.lepaindujour.io/formulaire-de-demande-dacces/',
                  )
                }>
                <Text style={{color: colors.color1}}>
                  Formulaire de demande d'acces
                </Text>
                <Image source={require('../assets/arrow.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                style={style.btn_cookies}
                onPress={() =>
                  openLink(
                    'https://www.lepaindujour.io/formulaire-de-suppression-des-donnees-personnelles//',
                  )
                }>
                <Text style={{color: colors.color1}}>
                  Formulaire de suppression des données
                </Text>
                <Image source={require('../assets/arrow.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: 30}}>
            <View style={style.last_formulaire}>
              <Button
                style={style.btn_enregistrer}
                textColor={'white'}
                onPress={handleSubmit}>
                Enregistrer mes choix
              </Button>
            </View>
            <View style={style.last_formulaire}>
              <Button
                style={style.btn_deconnexion}
                textColor={'white'}
                onPress={handleLogout}>
                Se deconnecter
              </Button>
            </View>
          </View>
        </ScrollView>
        <View>
          <PasswordModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onChangePassword={newPassword => setPassword(newPassword)}
          />
        </View>
      </SafeAreaProvider>
      <FooterProfile />
    </>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.color1,
    fontFamily: fonts.font1,
  },
  role: {
    color: colors.color2,
  },
  title_section: {
    fontWeight: 'bold',
    color: colors.color2,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    color: colors.color1,
    paddingVertical: 5,
  },
  btn: {
    backgroundColor: colors.color2,
    margin: 5,
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  btn_cookies: {
    backgroundColor: colors.color4,
    margin: 5,
    borderRadius: 6,
    borderColor: colors.color5,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn_enregistrer: {
    backgroundColor: colors.color9,
    borderRadius: 6,
    borderColor: colors.color9,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 10,
    marginHorizontal: 70,
  },
  btn_deconnexion: {
    backgroundColor: colors.color8,
    borderRadius: 6,
    borderColor: colors.color5,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 10,
    marginHorizontal: 70,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  short_input: {
    width: '48%',
    fontSize: 14,
    backgroundColor: colors.color4,
  },
  button_passwd: {
    width: '48%',
    backgroundColor: colors.color4,
    height: 48,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 15,
  },
  textPasswd: {
    color: colors.color1,
    fontSize: 16,
  },
  long_input: {
    width: '100%',
    fontSize: 14,
    backgroundColor: colors.color4,
  },
  avatar: {
    backgroundColor: colors.color1,
    marginLeft: 20,
  },
  formulaire: {
    backgroundColor: colors.color6,
    borderRadius: 10,
    padding: 15,
  },
  last_formulaire: {
    backgroundColor: colors.color6,
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
  tag: {
    backgroundColor: colors.color3,
    marginVertical: 5,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  radioButtonOut: {
    height: 15,
    width: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.color3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color3,
  },
  radioButtonIn: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: colors.color1,
  },
  textlabel: {
    color: colors.color1,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: colors.color5,
    backgroundColor: colors.color4,
    height: 50,
    width: '100%',
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default Profile;
