import React, { useState, useEffect} from 'react';
import Main from './Main';
import {Provider} from 'react-redux';
import store from './store';
import FCMManager from './components/FCMManager';
import { CountdownProvider } from './components/CountdownContext';  
import axios from 'axios'; 
import {API_BASE_URL} from './config';
import Maintenance from './Screens/Maintenance';


const App = () => {

  const [serverStatus, setServerStatus] = useState(false);
 

  useEffect(() => {
    axios.get(`${API_BASE_URL}/status`)
      .then(response => {
        setServerStatus(response.data.maintenanceMode);
      })
      .catch(error => {
        console.error('Erreur lors de la vérification du statut du serveur', error);
        setServerStatus('error');
      });
  }, []);

  if (serverStatus === 'maintenance' ) {
    return <Maintenance />; 
  }

  return (
    <Provider store={store}>
      <CountdownProvider>
        {/* <FCMManager /> */}
        <Main />
      </CountdownProvider>
    </Provider>
  );
};

export default App;
