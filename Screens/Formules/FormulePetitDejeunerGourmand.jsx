import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Switch, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { fonts, colors} from '../../styles/styles'
import CheckBox from '@react-native-community/checkbox';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { Button, RadioButton} from 'react-native-paper'
import { addToCart} from '../../reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux'
import { getProductsByCategory, fetchOneProduct } from '../../CallApi/api.js'
import { style } from '../../styles/formules'; 
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import { API_BASE_URL } from '../../config';

const FormulePetitDejeunerGourmand = ({navigation}) => {

   //pour les test
if (__DEV__) {
  if (Platform.OS === 'android') {
      API_BASE_URL = API_BASE_URL_ANDROID;
  } else if (Platform.OS === 'ios') {
      API_BASE_URL = API_BASE_URL_IOS;  
  }
}

    const [products, setProducts] = useState([]);
    const [ desserts, setDesserts] = useState([]);
    const [ boissons, setBoissons] = useState([]);
    const [dessertSwitch, setDessertSwitch] = useState(true);
    const [selectedSandwich, setSelectedSandwich] = useState(null);
    const [selectedDessert, setSelectedDessert] = useState(null);
    const [selectedBoisson, setSelectedBoisson] = useState(null);
    const [prix, setTotalPrice] = useState(0);
    const [productIds, setProductIds] = useState([]);
    //const [qty, setQty] = useState(1); 


    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart);
    //console.log('cart', cart)

    const handleBack = () => {
        navigation.navigate('home')
      }

      useEffect(() => {
        //les sandwichs - categorie
        const fetchProducts = async () => {
          try {
            const category = 'Sandwichs'; 
            const products = await getProductsByCategory(category);
            // products.forEach((product) => {
            //     console.log(product.libelle, product.prix_unitaire);
            //   });
              setProducts(products)
          } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des produits:', error);
          }
        };
    
        fetchProducts();

        //les desserts - par id
        const getOneProduct = async () => {
            try {
                const productIds = [10, 15];
                const productPromises = productIds.map((productId) => fetchOneProduct(productId));
                const desserts = await Promise.all(productPromises);
                //console.log(desserts)
                    // desserts.forEach((product) => {
                    // console.log(product.libelle, product.prix_formule);
                    // });
                setDesserts(desserts)
            } catch (error) {
              console.error('Une erreur s\'est produite lors de la récupération du produit:', error);
            }
          };
         getOneProduct()

         //les boisssons - par catégories
      //    const fetchBoissons = async () => {
      //     try {
      //       const category = 'Boissons'; 
      //       const boissons = await getProductsByCategory(category);
      //       boissons.forEach((boisson) => {
      //           console.log(boisson.libelle, boisson.prix_formule);
      //         });
      //         setBoissons(boissons)
      //     } catch (error) {
      //       console.error('Une erreur s\'est produite lors de la récupération des produits:', error);
      //     }
      //   };
      //  fetchBoissons()

       //les boissons - par id
       const fetchBoissons = async () => {
        try {
            const productIds = [16, 17]; 
            const productPromises = productIds.map((productId) => fetchOneProduct(productId));
            const boissons = await Promise.all(productPromises);
            //console.log(desserts)
                // boissons.forEach((boisson) => {
                // console.log(boisson.libelle, boisson.prix_formule);
                // });
                setBoissons(boissons)
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la récupération du produit:', error);
        }
      };
      fetchBoissons()
        
      }, []);

    //   const handleSwitchToggle = () => {
    //     setDessertSwitch(!dessertSwitch);
    //     if (dessertSwitch) { // If the switch is being turned off
    //         setSelectedDessert(null); // Deselect the dessert
    //     }
    // };
      

    const handleSandwich = (product) => {
      if (selectedSandwich?.productId === product.productId) {
          setSelectedSandwich(null); 
          setProductIds(productIds.filter(productId => productId !== product.productId));
      } else {
          setSelectedSandwich(product); 
          setProductIds([...productIds, product.productId]);
      }
  }
  const handleDessert = (product) => {
    if(!selectedSandwich ) {
      Toast.show({
          type: 'error',
          text1: 'Attention',
          text2: 'Veuillez sélectionner un sandwich',
      });
      return;
    }
    if (selectedDessert?.productId === product.productId) {
        setSelectedDessert(null); 
        setProductIds(productIds.filter(productId => productId !== product.productId));
    } else {
        setSelectedDessert(product); 
        setProductIds([...productIds, product.productId]);
    }
  }
  const handleBoisson = (product) => {
    if(!selectedSandwich ) {
      Toast.show({
          type: 'error',
          text1: 'Attention',
          text2: 'Veuillez sélectionner un sandwich',
      });
      return;
    }
    if (selectedBoisson?.productId === product.productId) {
        setSelectedBoisson(null); 
        setProductIds(productIds.filter(productId => productId !== product.productId));
    } else {
        setSelectedBoisson(product); 
        setProductIds([...productIds, product.productId]);
    }
  }

      useEffect(() => {
        calculateTotalPrice();
      }, [selectedSandwich, selectedDessert,selectedBoisson, dessertSwitch]);
      
      const calculateTotalPrice = () => {
        let prix = 0;
        
        if (selectedSandwich) {
          prix += parseFloat(selectedSandwich.prix_unitaire) || 0;
        }
      
        if (selectedDessert) {
          prix += parseFloat(selectedDessert.prix_formule) || 0;
        }

        if (selectedBoisson) {
          prix += parseFloat(selectedBoisson.prix_formule) || 0;
        }
      
        setTotalPrice(prix);
    };

    const handleFormuleSelection = () => {
      const formule = {
        type: 'formule',
        option1: selectedSandwich,
        option2: selectedDessert ? selectedDessert : null,
        option3:selectedBoisson ? selectedBoisson : null,
        prix: prix,
        libelle:"Formule Sandwich",
        formuleImage: require('../../assets/Formule36.jpg'),
        productIds: productIds,
        qty: 1,
      }
      // console.log('formule', formule);
      dispatch(addToCart(formule));
      navigation.navigate('panier')
    }
      
  return (
    <View style={{flex:1}}>
      <ScrollView>
        <View>
            <Image
                    source={require('../../assets/FormulepetitdejeunerGourmand.jpg')} 
                    style={{ width: "100%", height: 330, resizeMode:'cover' }}
                />

            <TouchableOpacity  onPress={handleBack} activeOpacity={1} style={{position:'absolute', right:20, top:20, backgroundColor:'white', borderRadius:25}}>
                    <Icon name="keyboard-arrow-left" size={40} color="#000" style={{}}  />
                </TouchableOpacity>
        </View>
        <View style={{padding:30}}>
            <Text style={style.title}>Petit déjeuner Gourmand</Text>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sunt accusantium cum veniam sequi molestiae! Qui, perferendis ab magni enim veritatis
            oluptates, quis earum?</Text>
        </View>
        {/* choix sandwich */}
        <View>
            <Text style={style.choixTitle}>Votre choix de sandwich</Text>
            <ScrollView horizontal={true} style={style.scrollProduct}>
                {products.map((product) => (
                  <View key={product.productId} style={{flexDirection:'column', justifyContent:'center'}}>
                    <TouchableOpacity  style={{gap:10,flexDirection:'column',  justifyContent:'center', alignItems:'center', margin:10}}>
                       <Image
                          source={{ uri: `${API_BASE_URL}/${product.image}` }}
                          style={style.sandwichImage}
                        />
                      <Text>{product.libelle}</Text>
                        {/* <CheckBox
                          disabled={false}
                          value={selectedSandwich?.productId === product.productId}
                          onValueChange={() => handleSandwich(product)}
                        /> */}
                      <TouchableOpacity
                        style={[
                          style.checkButton,
                          selectedSandwich?.productId === product.productId
                        ]}
                        onPress={() => handleSandwich(product)}
                      >
                        {selectedSandwich?.productId === product.productId && <View style={style.checkInnerCircle} />}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>    
                ))}
            </ScrollView>
        </View>
        {/* choix desserts */}
        <View>
          <View style={{...style.choixTitle,flexDirection:'row', gap:10, justifyContent:'center', alignItems:'center'}}>
              <Text style={style.choixTitle}>Les desserts  </Text>
              <Text style={{fontSize:12}}>(pour 2€ en +)</Text>
              {/* <Switch
                  value={dessertSwitch}
                  onValueChange={handleSwitchToggle}
                  thumbColor={dessertSwitch ? colors.color3 : '#f4f3f4'}
                  trackColor={{ false: 'red', true: colors.color9 }}
                /> */}
           
          </View>
            <ScrollView horizontal={true} style={style.scrollProduct}>
                {desserts.map((product) => (
                  <View key={product.productId} style={{flexDirection:'column', justifyContent:'center'}}>
                    <TouchableOpacity  style={{gap:10,flexDirection:'column',  justifyContent:'center', alignItems:'center', margin:10}}
                     disabled={!selectedSandwich || !dessertSwitch} >
                       <Image
                          source={{ uri: `${baseUrl}/${product.image}` }}
                          style={style.sandwichImage}
                        />
                      <Text>{product.libelle}</Text>
                        {/* <CheckBox
                          value={selectedDessert?.productId === product.productId}
                          onValueChange={() => handleDessert(product)}
                        /> */}
                         <TouchableOpacity
                        style={[
                          style.checkButton,
                          selectedDessert?.productId === product.productId
                        ]}
                        onPress={() => handleDessert(product)}
                      >
                        {selectedDessert?.productId === product.productId && <View style={style.checkInnerCircle} />}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>     
                ))}
            </ScrollView>
        </View>

        {/* choix boissons */}
        <View>
          <View style={{...style.choixTitle,flexDirection:'row', gap:10, justifyContent:'center', alignItems:'center'}}>
              <Text style={style.choixTitle}>Les boissons  </Text>
              <Text style={{fontSize:12}}>(pour 2€ en +)</Text>
          </View>
            <ScrollView horizontal={true} style={style.scrollProduct}>
                {boissons.map((product) => (
                  <View key={product.productId} style={{flexDirection:'column', justifyContent:'center'}}>
                    <TouchableOpacity  style={{gap:10,flexDirection:'column',  justifyContent:'center', alignItems:'center', margin:10}}
                     disabled={!selectedSandwich || !dessertSwitch} >
                       <Image
                          source={{ uri: `${baseUrl}/${product.image}` }}
                          style={style.sandwichImage}
                        />
                      <Text>{product.libelle}</Text>
                      <TouchableOpacity
                        style={[
                          style.checkButton,
                          selectedBoisson?.productId === product.productId
                        ]}
                        onPress={() => handleBoisson(product)}
                      >
                        {selectedBoisson?.productId === product.productId && <View style={style.checkInnerCircle} />}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>     
                ))}
            </ScrollView>
        </View>

    </ScrollView>

    <View style={style.menu}>
        <View>
          <View style={style.bandeauFormule}>
          <Text style={{ fontWeight:"bold"}}>Prix de la formule</Text>
          {selectedSandwich && typeof prix === 'number' && <Text>{prix.toFixed(2)} €</Text>}
          </View>
          <View style={style.bandeauFormule}>
            <View style={{flexDirection:'row'}}>
            <Text>Avec</Text><Image source={require('../../assets/sun.jpg')} style={{ width: 50, height: 20, resizeMode:'contain' }}/>
            </View>
          {selectedSandwich && typeof prix === 'number' && <Text style={{color:colors.color2, fontWeight:"bold"}}>{(prix*0.8).toFixed(2)} €</Text>}
          </View>
        </View>
        <TouchableOpacity style={[
        style.btn, 
        !selectedSandwich ? style.disabledBtn : {}]}  
        onPress={handleFormuleSelection} 
        disabled={!selectedSandwich}
        activeOpacity={selectedSandwich ? 0.2 : 0.8}>
            <Text style={{color:colors.color6}}>Choisir cette formule</Text>
      </TouchableOpacity>
    </View>
    </View> 
  )
}

export default FormulePetitDejeunerGourmand