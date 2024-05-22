import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, colors} from '../styles/styles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Button} from 'react-native-paper';
import {addToCart, acceptOffer} from '../reducers/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {style} from '../styles/formules';
import {styles} from '../styles/home';
import axios from 'axios';
import {checkStockForSingleProduct, updateStock} from '../CallApi/api';
import FooterProfile from '../components/FooterProfile';
import ModalePageOffre31 from '../components/ModalePageOffre';
import ArrowLeft from '../SVG/ArrowLeft';
import ProductCard from '../components/ProductCard';
import {API_BASE_URL} from '../config';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import {getStyle} from '../Fonctions/stylesFormule';
import FastImage from 'react-native-fast-image';
import Check from '../SVG/Check';
import {useCountdown} from '../components/CountdownContext';
import { fetchProductsOffre31, incrementhandler, checkProductAvailability } from '../Fonctions/fonctions';

const Offre31 = ({navigation}) => {
  const [offre31Products, setOffre31ProductNames] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [offre31ProductsByCategory, setOffre31ProductsByCategory] = useState(
    {},
  );

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.auth.user);
  const {resetCountdown} = useCountdown();

  const handleBack = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    fetchProductsOffre31(setOffre31ProductsByCategory);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setTotalPrice(selectedProduct.prix_unitaire * 3);
    }
  }, [selectedProduct]);

  const handleProduct = async product => {
    const isAvailable = await checkProductAvailability(
      product,
      checkStockForSingleProduct,
      cart,
    );
    if (!isAvailable) {
      return;
    }
    if (selectedProduct?.productId === product.productId) {
      setSelectedProduct(null);
      setTotalPrice(0);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleAcceptOffer = async () => {
    // ajouter la logique d'ajout des 4 produits 
    // j'ajoute 3 produits payants
    await incrementhandler(
      user.userId,
      selectedProduct.productId,
      3,
      selectedProduct.prix_unitaire,
      'offre31',
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
    // j'ajoute 1 produit gratuit
    await incrementhandler(
      user.userId,
      selectedProduct.productId,
      1,
      0,
      'offre31',
      true,
      null,
      null,
      null,
      null,
      null,
      selectedProduct.categorie,
      null,
      selectedProduct.libelle,
    );
    updateStock({...selectedProduct, qty: 4});
    Toast.show({
      type: 'success',
      text1: 'Offre 3+1 ajouté au panier',
    });
    resetCountdown();
    navigation.navigate('panier')
  };

  const handleCart = () => {
    setModalVisible(true);
    resetCountdown();
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: 50}}></View>

      <ScrollView>
        <View>
          <FastImage
            source={require('../assets/Croissant_offre31.jpg')}
            style={{width: '100%', height: 330, resizeMode: 'cover'}}
          />
          <Image
            source={require('../assets/offre31.jpg')}
            style={styles.pastilleOffre31}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              top: 30,
              paddingHorizontal: 30,
            }}>
            <Text style={style.titleProduct}>Notre offre 3+1</Text>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={1}
              style={{backgroundColor: 'black', borderRadius: 25}}>
              <ArrowLeft fill="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{paddingHorizontal: 30, paddingTop: 60, paddingBottom: 30}}>
          <Text style={style.title}>3 produits + 1 offert</Text>
          <Text style={styles.texteOffre}>
            Pour l'achat de 3 produits de cette catégorie, vous aurez droit à 1
            produit du même type gratuit
          </Text>
        </View>
        {/* choix produits*/}
        <View style={{gap: 10}}>
          {Object.keys(offre31ProductsByCategory).map(category => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {offre31ProductsByCategory[category].map((product, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleProduct(product)}
                    activeOpacity={0.8}>
                    <View
                      style={StyleSheet.flatten([
                        getStyle(selectedProduct, product),
                        {width: 170, marginHorizontal: 5, marginVertical: 10},
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
                        stock={product.stock}
                        offre={product.offre}
                        showButtons={false}
                        showPromo={false}
                        ingredients={product.ingredients}
                      />
                      {selectedProduct?.productId === product.productId && (
                        <Check color={colors.color9} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={style.menu}>
        <View>
          <View style={style.bandeauFormule}>
            <Text style={{fontWeight: 'bold', color: colors.color1}}>
              Prix de l'offre
            </Text>
            <Text style={{color: colors.color1}}>
              {' '}
              {totalPrice.toFixed(2)}€
            </Text>
          </View>
          <View style={style.bandeauFormule}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: colors.color1}}>Avec</Text>
              <Image
                source={require('../assets/sun.jpg')}
                style={{width: 50, height: 20, resizeMode: 'contain'}}
              />
            </View>
            <Text style={{color: colors.color2, fontWeight: 'bold'}}>
              {' '}
              {(totalPrice * 0.8).toFixed(2)}€
            </Text>
          </View>
        </View>
        <Button
          style={style.btn}
          textColor={'white'}
          disabled={!selectedProduct}
          onPress={handleCart}>
          Choisir cette offre
        </Button>
      </View>
      <FooterProfile />
      <ModalePageOffre31
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAcceptOffer={handleAcceptOffer}
        selectedProduct={selectedProduct}
      />
    </View>
  );
};

export default Offre31;
