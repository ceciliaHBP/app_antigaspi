import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNavigationContainerRef} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, updateSelectedStore} from './reducers/authSlice';
import {configureAxiosHeaders} from './Fonctions/fonctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import App from './Screens/App';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import Panier from './Screens/Panier';
import SuccessPage from './Screens/SuccessPage';
import ChoixPaiement from './Screens/ChoixPaiement';
import OrderConfirmation from './Screens/OrderConfirmation';
import Stores from './Screens/Stores';
import Profile from './Screens/Profile';
import ProductDetails from './Screens/ProductDetails';
import Orders from './Screens/Orders';
import Cookies from './Screens/Cookies';
import Donnees from './Screens/Donnees';
import Mentions from './Screens/Mentions';
import FormuleArtisan from './Screens/Formules/FormuleArtisan';
import FormulePetitDejeuner from './Screens/Formules/FormulePetitDejeuner';
import FormulePetitDejeunerGourmand from './Screens/Formules/FormulePetitDejeunerGourmand';
import Offre31 from './Screens/Offre31';
import Solanid from './Screens/Solanid';
import Pwd from './Screens/Pwd';
import LoaderHome from './Screens/LoaderHome';
import Antigaspi from './Screens/Antigaspi';
export const navigationRef = createNavigationContainerRef();
import axios from 'axios';
import OffreNoel from './Screens/OffreNoel';
import AppUpdateChecker from './components/AppUpdateChecker';
import DeviceInfo from 'react-native-device-info';
import Maintenance from './Screens/Maintenance';
import CancelPage from './Screens/CancelPage';
import SunConnect from './Screens/SunConnect';
import PdjConnect from './Screens/PdjConnect';


// import PageHome from './Screens/PageHome';
import {API_BASE_URL} from './config';
import Formule from './Screens/Formules/Formule';
import PageSalee from './Screens/PagesSalees/PageSalee';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);
  const user = useSelector(state => state.auth.user);
  const userId = user.userId

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdateRequired) {
      if (navigationRef.current && navigationRef.current.navigate) {
        navigationRef.current.navigate('update');
      }
    }
  }, [isUpdateRequired]);

  useEffect(() => {
    configureAxiosHeaders();
    checkForUpdates();
    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          // Vérifier si l'utilisateur est déjà connecté
          const token = await AsyncStorage.getItem('userToken');
          if (token) {
            // L'utilisateur est connecté mais le token est expiré
            await AsyncStorage.removeItem('userToken');
            if (navigationRef.current && navigationRef.current.navigate) {
              navigationRef.current.navigate('login');
              setTimeout(() => {
                Toast.show({
                  type: 'error',
                  text1: `Votre session a expiré`,
                  text2: `Veuillez vous reconnecter`,
                });
              }, 500);
            }
          } else if (error.response && error.response.status === 403) {
            // Pas de token présent, gérer différemment
            // Par exemple, ne rien faire ou afficher un message différent
            console.log('pas de header');
          }
        }
        return Promise.reject(error);
      },
    );
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

        const storedSelectedStore = JSON.parse(
          await AsyncStorage.getItem('selectedStore'),
        );
        //console.log('store Main 1', storedSelectedStore)

        if (token && userInfo) {
          //console.log('token trouvé')
          setIsLoggedin(true);
          dispatch(loginUser(userInfo));

          if (storedSelectedStore) {
            dispatch(updateSelectedStore(storedSelectedStore));
            //console.log('store Main 2', storedSelectedStore)
          }
        }
      } catch (error) {
        // console.error("Erreur lors de la vérification du token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  const Stack = createNativeStackNavigator();

  const linking = {
    prefixes: ['clickandcollect://'],
    config: {
      screens: {
        success: 'success',
        cancel: 'cancel',
        pwd: 'pwd',
        login: 'login',
      },
    },
  };

  useEffect(() => {
    const updateAppVersionInUserTable = async () => {
      const currentVersion = DeviceInfo.getVersion();
      //const currentVersion = '2.20';
      //console.log('currentVersion', currentVersion);
  
      if (userId) {
        try {
          // la version de l'utilisateur depuis la BDD
          const userVersionResponse = await axios.get(`${API_BASE_URL}/getUserVersion`, {
            params: {
              userId,
            },
          });
          const userVersion = userVersionResponse.data.versionApp;
          //console.log('Version in DB:', userVersion);
  
          // Comparaison des versions
          if (currentVersion !== userVersion) {
            // mettre à jour la version si nécessaire
            const updateResponse = await axios.post(`${API_BASE_URL}/updateVersion`, {
              userId,
              versionApp: currentVersion,
            });
            console.log('Update response:', updateResponse.data);
          } else {
            // console.log('La version de l\'app est déjà à jour dans la BDD.');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération ou de la mise à jour de la version', error);
        }
      }
    };
  
    updateAppVersionInUserTable();
  }, [userId]);
  

  const checkForUpdates = async () => {
    try {
      //version actuelle de l'application
      const currentVersion = DeviceInfo.getVersion();
      const response = await axios.get(`${API_BASE_URL}/versionApp`);
      const latestVersion = response.data.version;
      // console.log('response', latestVersion);
      // console.log('version mobile', currentVersion);
      if (currentVersion < latestVersion) {
        setIsUpdateRequired(true);
      }
    } catch (error) {
      //console.error('Erreur lors de la vérification des mises à jour:', error);
      setIsUpdateRequired(false);
    }
  };

  if (isLoading) {
    return <LoaderHome />;
  }
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={
          isUpdateRequired === true ? 'update' : isLoggedin ? 'home' : 'login'
        }
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name='app' component={App}/> */}
        {isUpdateRequired && (
          <Stack.Screen name="update" component={AppUpdateChecker} />
        )}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="stores" component={Stores} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="maintenance" component={Maintenance} />

        {/*  Formules  */}
        <Stack.Screen name="formule" component={Formule} />

        {/* Pages salées */}
        <Stack.Screen name="enviesalee" component={PageSalee} />

        {/* Formules petit dejeuner */}
        <Stack.Screen name="artisan" component={FormuleArtisan} />
        <Stack.Screen name="petitdej" component={FormulePetitDejeuner} />
        <Stack.Screen
          name="petitdejgourmand"
          component={FormulePetitDejeunerGourmand}
        />

        {/* Link Offres */}
        <Stack.Screen name="antigaspi" component={Antigaspi} />
        <Stack.Screen name="offre31" component={Offre31} />
        <Stack.Screen name="solanid" component={Solanid} />
        <Stack.Screen name="noel" component={OffreNoel} />
        <Stack.Screen name="details" component={ProductDetails} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="orders" component={Orders} />
        <Stack.Screen name="panier" component={Panier} />
        {/* <Stack.Screen name='choixpaiement' component={ChoixPaiement}/> */}
        {/* <Stack.Screen name='orderconfirm' component={OrderConfirmation}/> */}
        <Stack.Screen name="success" component={SuccessPage} />
        <Stack.Screen name="cancel" component={CancelPage} />
        <Stack.Screen name="pwd" component={Pwd} />
        <Stack.Screen name="cookies" component={Cookies} />
        <Stack.Screen name="donnees" component={Donnees} />
        <Stack.Screen name="mentions" component={Mentions} />
        
        {/* Page de Connexion SUN */}
        <Stack.Screen name="sunconnect" component={SunConnect} />
        <Stack.Screen name="pdjconnect" component={PdjConnect} />


      </Stack.Navigator>

      <Toast position="bottom" />
    </NavigationContainer>
  );
};
export default Main;
