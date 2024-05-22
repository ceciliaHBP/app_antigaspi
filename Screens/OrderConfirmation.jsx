// import React, {useState, useEffect, useRef} from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { defaultStyle} from '../styles/styles'
// import { Button} from 'react-native-paper'
// import { logoutUser} from '../reducers/authSlice';
// import { setNumeroCommande, setProducts } from '../reducers/orderSlice';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import { WebView } from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import {Toast} from 'react-native-toast-message/lib/src/Toast';
// // import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
// import { API_BASE_URL } from '../config';
// const OrderConfirmation = ({navigation}) => {

//  //pour les test
//  if (__DEV__) {
//   if (Platform.OS === 'android') {
//       API_BASE_URL = API_BASE_URL_ANDROID;
//   } else if (Platform.OS === 'ios') {
//       API_BASE_URL = API_BASE_URL_IOS;  
//   }
// }
  

//   const dispatch = useDispatch()
//   const webViewRef = useRef(null);


//   const user = useSelector(state => state.auth.user);
//   //console.log('user', user)
//   const selectedStore = useSelector(state => state.auth.selectedStore);
//   //console.log('selecstore', selectedStore)
//   const cartItems = useSelector(state => state.cart.cart); 
//   //const cartProductId = cartItems.map((item) => item.productId);
//   const products = useSelector((state) => state.order.products);
//   //console.log('products', products)
//   //console.log('productsIdsCart', cartProductId)
//   const selectedDateString = useSelector((state) => state.cart.date)
//   const selectedTime = useSelector((state) => state.cart.time)
//   const paiement = useSelector((state) => state.cart.paiement)
//   const numero_commande = useSelector((state) => state.order.numero_commande)

//   const aggregatedCartItems = cartItems.reduce((accumulator, currentItem) => {
    
//     // Recherchez l'article dans l'accumulateur par idProduct
//     const existingItem = accumulator.find(
//       item => item.productId === currentItem.productId
//     );

//     if (existingItem) {
//       // Si l'article existe déjà dans l'accumulateur, ajoutez simplement la quantité
//       existingItem.qty += currentItem.qty;

//       // Si l'élément actuel est gratuit, ajoutez une note à l'élément existant
//       if (currentItem.isFree) {
//         existingItem.isFree = true;
//         existingItem.freeCount += currentItem.qty; // ajoutez la quantité de produits gratuits

//       }

//       // Conservez le nom de l'offre du produit (vous pouvez ajouter d'autres logiques si nécessaire)
//       existingItem.offre = currentItem.offre;
//     } else {
//       // Sinon, ajoutez un nouvel élément à l'accumulateur
//       accumulator.push({...currentItem,
//         freeCount: currentItem.isFree ? currentItem.qty : 0 // Initialisez freeCount
//       }); // Utilisez la déstructuration pour éviter les références croisées
//     }
  
//     return accumulator;
//   }, []);
  
//   console.log('panier fusionné', aggregatedCartItems);
  
//   const totalPrice = Number((cartItems.reduce((total, item) => {
//     let prix;
  
//     if ('prix' in item) {
//       prix = item.prix;
//     } else if ('prix_unitaire' in item) {
//       prix = item.prix_unitaire;
//     } else if (item.option1 && 'prix_unitaire' in item.option1) {
//       prix = item.option1.prix_unitaire;
//     } else if (item.option2 && 'prix_unitaire' in item.option2) {
//       prix = item.option2.prix_unitaire;
//     } else {
//       throw new Error('Prix non trouvé pour l\'élément du panier');
//     }
//     return total + item.qty * prix;
//   }, 0)).toFixed(2));

// const totalQuantity = cartItems.reduce((total, item) => total + item.qty, 0)


// const [orderInfo, setOrderInfo] = useState(null);
// const [checkoutSession, setCheckoutSession] = useState(null);
// const [sessionId, setSessionId] = useState(null);

// const handleLogout = () => {
//   dispatch(logoutUser(selectedStore));
//   navigation.navigate('app')
// }
// const handleBack = () => {
//   navigation.navigate('home');
// };

// useEffect(() => {
//   if (orderInfo && paiement === 'online') {
//     const submitOrder = async () => {
//       const response = await axios.post(`${API_BASE_URL}/checkout_session`, { orderInfo });
//       const sessionUrl = response.data.session;
//       const sessionId = response.data.id
//       //console.log('data id', sessionId)
//       setSessionId(sessionId);
//       const stripeCheckoutUrl = `${sessionUrl}`;
//       setCheckoutSession(stripeCheckoutUrl);
//       Linking.openURL(sessionUrl);
//     };
//     submitOrder();
//   }
// }, [orderInfo, paiement]);


// useEffect(() => {
//   if(paiement === 'online' && sessionId){
//     checkPaymentStatus()
//   }
// }, [paiement, sessionId]); 

// //ENVOI DE LA COMMANDE VERS LE SERVER
//   const submitHandler = async () => {

//     const token = await AsyncStorage.getItem('userToken');
//     //console.log('token valider', token)

//     axios.get(`${API_BASE_URL}/verifyToken`, {
//       headers: {
//           'x-access-token': token
//       }
//     })
//     .then(response => {
//       if (response.data.auth) {

//           dispatch(setProducts(cartItems));
          
//           const orderData = {
//             firstname_client: user.firstname,
//             lastname_client: user.lastname,
//             prix_total: totalPrice,
//             date: selectedDateString,
//             //delivery,
//             heure: selectedTime,
//             userId: user.userId,
//             storeId: selectedStore.storeId,
//             slotId: null,
//             promotionId: null,
//             paymentMethod: paiement,
//             //plus utilisé
//             //transforme mon array de productsIds en chaine de caractères
//             //productIdsString: cartProductId.join(",")

//             //plus utilisé
//             //products: cartItems.map(item => ({ productId: item.productId, quantity: item.qty })) 

//             //verification si produit en formule
//             products: (() => {
//               let products = [];
      
//               aggregatedCartItems.forEach(item => {
//                   if (item.type === 'formule') {



//                       // item.productIds.forEach(productId => {
                        
//                       //     products.push({ productId: productId, quantity: item.qty, formule: item.libelle, category: item.option1.categorie });
//                       // });

//                       ['option1', 'option2', 'option3'].forEach(option => {
//                         if (item[option]) {  // Si l'option est présente
//                             products.push({
//                                 productId: item[option].productId,
//                                 quantity: item.qty,
//                                 formule: item.libelle,
//                                 category: item[option].categorie
//                             });
//                           }
//                         })
//                   } else {
//                       // products.push({ productId: item.productId, quantity: item.qty, offre: item.offre });
//                       const productData = {
//                         productId: item.productId,
//                         quantity: item.qty
//                       };
                
//                       if (item.isFree && item.qty >= 4) {
//                         productData.offre = item.offre;
//                       }
                
//                       products.push(productData);
//                     }
//               });
      
//               return products;
//           })(),

//           };
//         console.log('orderdata', orderData)

//           const createOrder = async () => {
//             try {
//               const response =  await axios.post(`${API_BASE_URL}/createorder`, orderData);
//               const numero_commande = response.data.numero_commande
//              console.log('num', response)
//               dispatch(setNumeroCommande(numero_commande));

//               setOrderInfo({
//                 aggregatedCartItems,
//                 user,
//                 selectedStore,
//                 totalPrice,
//                 totalQuantity,
//                 selectedDateString,
//                 paiement
//               });

//               console.log('response createOrder', response.data)
//               return response.data;
//             } catch (error) {
//               console.error(error);
//               throw new Error('Erreur lors de la création de la commande');
//             }
//           }
//          createOrder()
//       } else {
//           console.log('erreur ici', error)
//       }
//   })
//   .catch(error => {
//     console.log('erreur bug panier orderconfirmation page', error)
//     handleLogout()
//     return Toast.show({
//       type: 'error',
//       text1: 'Session expirée',
//       text2: 'Veuillez vous reconnecter'
//     });
//       // console.error('Une erreur s\'est produite lors de la vérification du token :', error);
//   });
// }

// // Vérifier l'état du paiement
// const checkPaymentStatus = async () => {
//   const interval = setInterval(async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/paiementStatus?sessionId=${sessionId}`);
//     const { status, transactionId, method } = response.data;
//     console.log('response PaiementStatus', response.data)
//      // retour : response data {"status": "paid", "transactionId": "pi_3NOFjcGnFAjiWNhK0KP6l8Nl"}
   
//     if (status === 'paid') {
      
//       clearInterval(interval);
//       const paymentData = {
//         method,
//         status,
//         transactionId
//       };
  
//       const updateResponse = await axios.post(`${API_BASE_URL}/createPaiement`, paymentData);
//       console.log('Response createPaiement:', updateResponse.data);
//       //console.log('paymentId', updateResponse.data.paymentId)
//       const paymentId = updateResponse.data.paymentId

//       const updateData = { numero_commande, status, paymentId}
//       //console.log('updData', updateData)

//       const response = await axios.post(`${API_BASE_URL}/updateOrder`, updateData);
//       console.log('response updateOrder', response.data)
//       navigation.navigate('success')
//     }
    
//   } catch (error) {
//     console.error('Erreur lors de la vérification de l\'état du paiement :', error);
//     // navigation.navigate('echec')
//   }
// }, 5000)
// };

//   // const formatDate = (dateString) => {
//   //   const date = new Date(dateString);
//   //   const day = date.getDate().toString().padStart(2, '0');
//   //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   //   const year = date.getFullYear().toString();
//   //   const hours = date.getHours().toString().padStart(2, '0');
//   //   const minutes = date.getMinutes().toString().padStart(2, '0');
//   //   return `${day}-${month}-${year} ${hours}h${minutes}`;
//   // };

//    return (
//     <View style={{ ...defaultStyle, alignItems: 'center', backgroundColor: 'white', margin: 30, paddingHorizontal: 5 , paddingTop:10}}>

//       <View style={{flexDirection:'row', justifyContent:'space-between', width:"100%"}}>
//             <Icon name="arrow-back" size={30} color="#900" onPress={handleBack}/>
//             <Icon name="logout" size={30} color="#000" onPress={() => handleLogout()}/>
//       </View>
//       <ScrollView vertical showsVerticalScrollIndicator={false}>
//       <View style={styles.container}>
//         <Text>Contenu du panier :</Text>
//         {/* {cartItems.map((item, index) => ( */}
//               {cartItems.filter(item => !item.isFree).map((item, index) => (

//           <View key={`${item.productId}_${index}`} style={styles.itemContainer}>
//             <Text>{item.libelle}</Text>
//             <Text>Prix unitaire : {item.prix || item.prix_unitaire} euros</Text>
//             <Text>Quantité : {item.qty}</Text>
//             {
//               item.freeCount > 0 && <Text>Nb de produits offerts: {item.freeCount}</Text>
//             }
            
//           </View>
//         ))}
//         {
//           // aggregatedCartItems.map((item, index) => (
//           aggregatedCartItems.filter(item => item.isFree).map((item, index) => (

//             <View key={`${item.productId}_${index}`} style={styles.itemContainer}>
//               <Text>{item.libelle}</Text>
//               <Text>Prix unitaire : {item.prix || item.prix_unitaire} euros</Text>
//               <Text>Quantité : {item.qty}</Text>
//               {
//                 item.freeCount > 0 && <Text>Nb de produits offerts: {item.freeCount}</Text>
//               }
              
//             </View>
//           ))
//         }
//         <View>
//           <Text> Prix total: {totalPrice} euros</Text>
//           <Text>Nb de produits: {totalQuantity}</Text>
//         </View>
//         <View style={{marginVertical:40}}>    
//           <Text>Informations Client:</Text>
//           <Text>Utilisateur : {user.firstname} {user.lastname}</Text>
//           {
//               user.adresse ? <Text>Adresse : {user.adresse}</Text> : <Text>Adresse : <Text style={{color:'lightgray', fontStyle:'italic'}}>Non renseigné</Text></Text>
//           }
//           {
//               user.telephone ? <Text>Telephone : {user.telephone}</Text> : <Text>Telephone : <Text style={{color:'lightgray', fontStyle:'italic'}}>Non renseigné</Text></Text>
//           }
//           {
//             selectedDateString ? <Text>Retrait: {selectedDateString }</Text> : <Text>Retrait : <Text style={{color:'lightgray', fontStyle:'italic'}}>Non renseigné</Text></Text>
//           }
//           {/* non visible pour les collaborateurs car tournée du camion */}
//           {/* {
//             selectedTime ? <Text>Heure: {selectedTime }</Text> : <Text>Heure : <Text style={{color:'lightgray', fontStyle:'italic'}}>Non renseigné</Text></Text>
//           } */}
          
//           {
//             paiement ? 
//             (
//             <>
//             { paiement === 'online'? ( <Text>Choix du paiement: En ligne</Text> ) : null }
//             { paiement === 'onsite'? ( <Text>Choix du paiement: Sur place</Text> ) : null }
//             </>
//             ) 
//             : <Text>Choix du paiement : <Text style={{color:'lightgray', fontStyle:'italic'}}>Non renseigné</Text></Text>
//           }
        
//           <Text>Magasin : {selectedStore.nom_magasin}</Text>
//         </View>
//         <Button
//                   style={styles.btn} 
//                   textColor={'white'} 
//                   onPress={submitHandler}
//                   >
//                   VALIDER
//         </Button>
//         {/* {checkoutSession && <WebView ref={webViewRef} source={{ uri: checkoutSession }} onNavigationStateChange={handleNavigationChange} />} */}
//         {checkoutSession && <WebView ref={webViewRef} source={{ uri: checkoutSession }} />}
//       </View>
//     </ScrollView>
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   itemContainer: {
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 8,
//   },
//   btn: {
//     backgroundColor: 'red',
//     margin: 20,
//     padding: 6,
//   }
// });

// export default OrderConfirmation;