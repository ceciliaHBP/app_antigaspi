import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, colors} from '../styles/styles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Button, RadioButton} from 'react-native-paper';
import {addToCart, getCart, getTotalCart} from '../reducers/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {style} from '../styles/formules';
import {styles} from '../styles/home';
import {getStyle} from '../Fonctions/stylesFormule';
import axios from 'axios';
import {
  getFamilyProductDetails,
  checkStockForSingleProduct,
  updateAntigaspiStock,
} from '../CallApi/api';
import FooterProfile from '../components/FooterProfile';
import ArrowLeft from '../SVG/ArrowLeft';
import ProductCard from '../components/ProductCard';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import {API_BASE_URL} from '../config';
import Cloche from '../SVG/Cloche';
import FastImage from 'react-native-fast-image';
import Check from '../SVG/Check';
import {useCountdown} from '../components/CountdownContext';
import {incrementhandler} from '../Fonctions/fonctions';

const Antigaspi = ({navigation}) => {
  const [clickProducts, setclickProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [familyProductDetails, setFamilyProductDetails] = useState({});
  const familyProductIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  //ci j'ai mis toutes las familles possibles pour ne plus à avoir à modifier

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.auth.user);

  const {countdown, resetCountdown} = useCountdown();

  const handleBack = () => {
    navigation.navigate('home');
  };

  //les produits ayant le champ "clickandcollect" à true
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllProducts`);

      const updatedProducts = response.data.map(product => ({
        ...product,
        qty: 0,
      }));
      //produits ayant la valeur "clickandcollect" à true et "antigaspi" à true
      const clickProducts = updatedProducts.filter(
        product =>
          product.antigaspi === true && product.clickandcollect === true,
      );
      const clickProductNames = clickProducts.map(product => product.libelle);
      const clickProductPrices = clickProducts.map(
        product => product.prix_unitaire,
      );

      // console.log(clickProductPrices)

      //stock sup ou egale à 1
      const updatedStockProducts = clickProducts.filter(
        product => product.stockantigaspi >= 1,
      );
      setclickProducts(updatedStockProducts);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des produits:",
        error,
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getFamily = async () => {
      try {
        const responses = await Promise.all(
          familyProductIds.map(id => getFamilyProductDetails(id)),
        );
        //console.log('response', responses)
        const familleProductDetailsMap = {};
        responses.forEach(famille => {
          if (famille) {
            familleProductDetailsMap[famille.id] = famille.name;
          }
        });
        setFamilyProductDetails(familleProductDetailsMap);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des familles de produits:",
          error,
        );
      }
    };

    getFamily();
  }, []);

  const handleProduct = product => {
    if (selectedProduct?.productId === product.productId) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/verifStockAntiGaspi/${selectedProduct.productId}`,
      );
      const stockAntigaspi = response.data.stockantigaspi;
      // console.log('response stock', stockAntigaspi);

      if (stockAntigaspi > 0) {
        incrementhandler(
          user.userId,
          selectedProduct.productId,
          1,
          selectedProduct.prix_unitaire * 0.3,
          'antigaspi',
          false,
          null,
          null,
          null,
          null,
          null,
          selectedProduct.categorie,
          null,
          selectedProduct.libelle,
        );
        await updateAntigaspiStock({...selectedProduct, qty: 1});
         // Nouveau stock
        setclickProducts(
          currentProducts =>
            currentProducts
              .map(p =>
                p.productId === selectedProduct.productId
                  ? {...p, stockantigaspi: Math.max(stockAntigaspi - 1, 0)}
                  : p,
              )
              .filter(p => p.stockantigaspi > 0), // Filtrer les produits épuisés
        );

        await fetchData();

        resetCountdown(); // Déclenche le compteur à 300 secondes - 5min
        Toast.show({
          type: 'success',
          text1: 'Produit ajouté au panier',
        });

       await  dispatch(getTotalCart(user.userId));
      } else {
        // Plus de stock
        Toast.show({
          type: 'error',
          text1: "Ce produit n'est plus en stock",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du stock:', error);
      // Gérer l'erreur
      Toast.show({
        type: 'error',

        text1: 'Erreur lors de la vérification du stock',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: 50}}></View>

      <ScrollView>
        <View>
          {/* <Image
                    source={require('../assets/antigaspi.jpg')} 
                    style={{ width: "100%", height: 330, resizeMode:'cover' }}
                /> */}
          <FastImage
            source={require('../assets/anti2.jpg')}
            style={{width: '100%', height: 330, resizeMode: 'cover'}}
          />
          <Image
            source={require('../assets/pastille_antigaspi.png')}
            style={{
              ...styles.pastilleOffre31,
              resizeMode: 'contain',
              width: 90,
              right: 20,
              top: 250,
            }}
          />

          <View style={styleAntigaspi.ViewTitle}>
            <Text style={style.titleProduct}>Notre offre anti-gaspillage</Text>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={1}
              style={styleAntigaspi.TouchArrow}>
              <ArrowLeft fill="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styleAntigaspi.container_texte}>
          <Text style={{...style.title, fontSize: 19}}>
            Sélection Anti-Gaspillage
          </Text>
          <Text style={styles.texteOffre}>
            Chaque produit ici joue un rôle vital dans la réduction du
            gaspillage alimentaire.{' '}
          </Text>
          <Text style={styles.texteOffre}>
            Dépêchez-vous, il n'y en aura pas pour tout le monde.
          </Text>
          <Text style={styles.texteOffre}>
            Faites un choix conscient et contribuez à un futur plus durable.
          </Text>
        </View>
        {/* choix produits*/}
        <View>
          <ScrollView>
            <View style={styleAntigaspi.container_familleProduct}>
              {Object.values(
                clickProducts.reduce((groups, product) => {
                  const {id_famille_produit} = product;
                  if (!groups[id_famille_produit]) {
                    groups[id_famille_produit] = {
                      id_famille_produit: id_famille_produit,
                      products: [],
                    };
                  }
                  groups[id_famille_produit].products.push(product);
                  return groups;
                }, {}),
              ).map(group => (
                <View key={group.id_famille_produit}>
                  {/* <Text style={{margin:30}}>{group.id_famille_produit}</Text> */}
                  <Text style={styleAntigaspi.familleProduct}>
                    {familyProductDetails[group.id_famille_produit]}
                  </Text>
                  <ScrollView>
                    <View style={styleAntigaspi.container_cards}>
                      {group.products.map((product, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleProduct(product)}
                          activeOpacity={0.8}>
                          <View
                            style={StyleSheet.flatten([
                              getStyle(selectedProduct, product),
                              {
                                width: 170,
                                marginHorizontal: 5,
                                marginVertical: 10,
                              },
                            ])}
                            key={index}>
                            <ProductCard
                              libelle={product.libelle}
                              key={product.productId}
                              id={product.productId}
                              index={index}
                              image={product.image}
                              prix={product.prix_unitaire}
                              prixSUN={product.prix_remise_collaborateur}
                              qty={product.qty}
                              stock={product.stockantigaspi}
                              offre={product.offre}
                              showButtons={false}
                              ingredients={product.ingredients}
                              showPriceSun={false}
                              overlayStyle={{backgroundColor: 'transparent'}} //pas d'effet overlay sur les produits antigaspi (stock different)
                            />
                            {selectedProduct?.productId ===
                              product.productId && (
                              <Check color={colors.color9} />
                            )}

                            <View style={styles.stockantigaspi}>
                              <Cloche />
                              <Text style={styles.textestockantigaspi}>
                                {product.stockantigaspi} en stock !
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={{...style.menu, height: 90}}>
        <View>
          <View style={style.bandeauFormule}>
            <Text style={styleAntigaspi.colorText}>Prix du produit</Text>
            <Text style={styleAntigaspi.colorText}>
              {selectedProduct
                ? (selectedProduct.prix_unitaire * 0.3).toFixed(2)
                : 0}{' '}
              €
            </Text>
          </View>

          {/* <View style={style.bandeauFormule}>
            <View style={{flexDirection:'row'}}>
            <Text>Avec</Text><Image source={require('../assets/sun.jpg')} style={{ width: 50, height: 20, resizeMode:'contain' }}/>
            </View>
         <Text style={{color:colors.color2, fontWeight:"bold"}}>{selectedProduct ?  Number(selectedProduct.prix_remise_collaborateur) : 0} €</Text>
          </View>*/}
        </View>
        <Button
          style={style.btn}
          textColor={'white'}
          disabled={!selectedProduct}
          onPress={handleCart}>
          Choisir ce produit
        </Button>
      </View>
      <FooterProfile />
    </View>
  );
};

const styleAntigaspi = StyleSheet.create({
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
  titleProduct: {
    color: 'white',
    fontFamily: fonts.font1,
    fontSize: 24,
    width: '90%',
  },
  TouchArrow: {
    backgroundColor: 'black',
    borderRadius: 25,
  },
  container_texte: {
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  container_familleProduct: {
    gap: 20,
    marginBottom: 100,
  },
  familleProduct: {
    marginLeft: 30,
    marginVertical: 10,
    color: colors.color1,
    fontFamily: fonts.font2,
    fontWeight: '700',
  },
  container_cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorText: {
    fontWeight: 'bold',
    color: colors.color1,
  },
});

export default Antigaspi;
