import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button} from 'react-native-paper' 
import { defaultStyle} from '../styles/styles'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedStore } from '../reducers/authSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { API_BASE_URL } from '../config';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import ArrowLeft from '../SVG/ArrowLeft';
import { fonts, colors} from '../styles/styles'


const Stores = ({navigation}) => {
  

  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [actualRole, setActualRole] = useState(userRole || 'client');  

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  //console.log('user dans Stores', user)
  //modif userId <= id
  const userId = useSelector(state => state.auth.user.userId)
  const userRole = useSelector(state => state.auth.user.role);


  //Tous les magasins
  useEffect(() => {
    // Récupérer les magasins depuis la base de données
    allStores()
  }, []);

  const allStores = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllStores`);
      if (!userRole){
        setActualRole('client')
      }
      setStores(response.data);
    } catch (error) {
      if (error.response) {
        // la requête a été faite et le code de réponse du serveur n’est pas dans
        // la plage 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // la requête a été faite mais aucune réponse n’a été reçue
        // `error.request` est une instance de XMLHttpRequest dans le navigateur
        // et une instance de http.ClientRequest avec node.js
        console.log(error.request);
      } else {
        // quelque chose s’est passé lors de la construction de la requête et cela
        // a provoqué une erreur
        console.log('Error', error.message);
      }
      console.log(error.config);
  };
  
  }
  
  //FILTRE pour les clients = ne voient que les boulangeries crées
  // useEffect(() => {
  //   const desiredStoreIds = [1];  
   
  //   // Récupérer les magasins depuis la base de données
  //   axios.get(`${API_BASE_URL}/getAllStores`)
  //     .then(response => {
        
  //       const filteredStores = response.data.filter(store => desiredStoreIds.includes(store.storeId));
  //       Toast.show({
  //         type: 'error',
  //         text1: `L'application n'est pas encore finalisée`,
  //         text2: `Les magasins ne sont pas encore disponibles`
  //       });
  //       setStores(filteredStores);
  //       // console.log('stores', filteredStores)
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des magasins:', error);
  //     });
  // }, []);


  const handleStoreSelection = (store) => {
    setSelectedStore(store);
    //console.log('store button selectionné:', store)
    dispatch(updateSelectedStore(store));
  };

  const  submitHandler = () => {
    //console.log('store validé', selectedStore)
    // console.log('user après validation', user);
    //update du user
   if (selectedStore === null){
    Toast.show({
      type: 'error',
      text1: `Veuillez sélectionné un magasin`,
      text2: ``,
    });
   }
     if (selectedStore && user) {
      const updatedUser = { ...user, storeId: selectedStore.storeId };
      //console.log('update user',updatedUser)

      axios
        .put(`${API_BASE_URL}/updateOneUser/${userId}`, updatedUser)
        .then((response) => {
          //console.log('User updated:', response.data);
          navigation.navigate('login');
          return Toast.show({
            type: 'success',
            text1: `Inscription validée`,
            text2: `Vous pouvez vous connectez maintenant ` 
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        });
    }
    
  }
  const handleBack = () => {
    navigation.navigate('home')
  }


  return (
    <View style={defaultStyle}>
        <View style={style.container}>

       <View style={{flexDirection:'row',justifyContent:'space-between', width:"100%" , alignItems:'center', position:'absolute', top:30, paddingHorizontal:30}}>
            <Text style={style.title}>Votre point de collecte</Text>
            <TouchableOpacity  onPress={handleBack} activeOpacity={1} style={{ backgroundColor:'black', borderRadius:25}}>
                      <ArrowLeft fill="white"/>
                    </TouchableOpacity>
            </View>
            
            
    <View style={{ width:"85%",marginTop:100, flex:1}}>
    {selectedStore !== null && (
                <View style={style.selection}>
                    <Text style={{color:colors.color2, fontFamily:fonts.font2, paddingVertical:5}}>Votre établissement de collecte :</Text>
                    <View  style={style.touchable}>
                    <Text style={style.text} >{selectedStore.nom_magasin}</Text>
                    {
                    selectedStore.adresse_magasin && <Text style={style.text}>{selectedStore.adresse_magasin}</Text>
                    }
                    </View>
                    <View style={{ paddingVertical:15}}>
                      <Text style={{ color:colors.color3, fontSize:11}}>En choisissant cet établissement, vous indiquez votre point de retrait poue le click adn collect</Text>
                    </View>
                    
                    
                </View>
                
            )}
      <ScrollView style={{flexDirection:'column', paddingTop:20,borderTopWidth:1, borderBottomWidth:1, borderColor:colors.color5 }}>
      { stores.map(store => (
                <TouchableOpacity
                key={store.storeId}
                style={style.touchable}
                onPress={() => handleStoreSelection(store)}
                >
                <Text style={style.text}>{store.nom_magasin}</Text>
                {
                  store.adresse_magasin && <Text style={style.text}>{store.adresse_magasin}</Text>
                }
                
                </TouchableOpacity>
            ))}
            
      </ScrollView>
 
    </View>
            
    <View style={{flexDirection:'column', alignItems:'flex-end', width:"100%"}}>
    <Button
                        style={style.btn} 
                        textColor={'white'} 
                        disabled={selectedStore === "" }
                        onPress={() => {
                            submitHandler()
                        }}
                        >
                    Créer son compte
            </Button>
            
    </View>
    {/* <View style={{flexDirection:'column', alignItems:'flex-end', width:"100%"}}>
    </View> */}
    <TouchableOpacity onPress={() => navigation.navigate('login')}>
    <Text style={{  marginHorizontal: 40, textDecorationLine:'underline', color:colors.color3}}>Vous avez déjà un compte ?</Text>
            </TouchableOpacity>
            

        </View>
        
    </View>
  );
};


const style = StyleSheet.create({
container: {
    flex:1, 
    height:"100%",
    justifyContent:'center', 
    alignItems:'center',
    gap: 20,
    backgroundColor:colors.color1,
    paddingVertical:10
},
touchable:{
    backgroundColor:colors.color3,
    paddingVertical:15,
    paddingHorizontal:25,
    borderRadius:15,
    // alignItems:'center',
    justifyContent:'center',
    marginVertical:5
},
text:{
    color:colors.color1,
    textAlign:'left'
},
btn: {
    backgroundColor:colors.color9,
    marginHorizontal: 40,
    marginTop:5,
    width:200,
    borderRadius:5
  },
selection: {
    //justifyContent:'center', 
   // alignItems:'center'
},
title:{
  color: "white",
      fontFamily:fonts.font1,
      fontSize:24,
      width:"80%"
}
})

export default Stores;
