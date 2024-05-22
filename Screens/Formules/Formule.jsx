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
import React, {useEffect, useState, useRef} from 'react';
import {fonts, colors} from '../../styles/styles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addToCart} from '../../reducers/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {checkStockForSingleProduct, updateStock} from '../../CallApi/api.js';
import {
  checkProductAvailability,
  getBoissonDetails,
  getDessertDetails,
  fetchProducts,
  incrementhandler,
  decrementhandler,
} from '../../Fonctions/fonctions';
import {style} from '../../styles/formules';
import {styles} from '../../styles/home';
import FooterProfile from '../../components/FooterProfile';
import ArrowLeft from '../../SVG/ArrowLeft';
import ProductCard from '../../components/ProductCard';
import {API_BASE_URL} from '../../config';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import FastImage from 'react-native-fast-image';
import {getStyle} from '../../Fonctions/stylesFormule';
import Check from '../../SVG/Check';
import axios from 'axios';
import {useCountdown} from '../../components/CountdownContext';

const Formule = ({route, navigation}) => {
  // info params de FormulesSalees.jsx
  const {categorie, imageUri, text, name} = route.params;

  const [products, setProducts] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [boissons, setBoissons] = useState([]);
  const [dessertSwitch, setDessertSwitch] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [selectedBoisson, setSelectedBoisson] = useState(null);
  const [prix, setTotalPrice] = useState(0);
  const [productIds, setProductIds] = useState([]);

  const {resetCountdown} = useCountdown();

  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.auth.user);

  const handleBack = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    //les produits principaux - categorie
    fetchProducts(categorie, setProducts);
    //les desserts - par id
    getDessertDetails(setDesserts);
    //les boissons - par id
    getBoissonDetails(setBoissons);
  }, [categorie]);

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
      setProductIds(
        productIds.filter(productId => productId !== product.productId),
      );
    } else {
      setSelectedProduct(product);
      setProductIds([...productIds, product.productId]);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({y: 800, animated: true});
      }, 400);
    }
  };
  const handleDessert = async product => {
    const isAvailable = await checkProductAvailability(
      product,
      checkStockForSingleProduct,
      cart,
    );

    if (!isAvailable) {
      return;
    }
    if (!selectedProduct) {
      Toast.show({
        type: 'error',
        text1: 'Attention',
        text2: `Choisis d'abord ton plat principal pour continuer.`,
      });
      return;
    }
    if (selectedDessert?.productId === product.productId) {
      setSelectedDessert(null);
      setProductIds(
        productIds.filter(productId => productId !== product.productId),
      );
    } else {
      setSelectedDessert(product);
      setProductIds([...productIds, product.productId]);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({y: 2800, animated: true});
      }, 400);
    }
  };
  const handleBoisson = async product => {
    const isAvailable = await checkProductAvailability(
      product,
      checkStockForSingleProduct,
      cart,
    );

    if (!isAvailable) {
      return;
    }

    if (!selectedProduct) {
      Toast.show({
        type: 'error',
        text1: 'Attention',
        text2: `Choisis d'abord ton plat principal pour continuer.`,
      });
      return;
    }
    if (selectedBoisson?.productId === product.productId) {
      setSelectedBoisson(null);
      setProductIds(
        productIds.filter(productId => productId !== product.productId),
      );
    } else {
      setSelectedBoisson(product);
      setProductIds([...productIds, product.productId]);
    }
  };

  // calcul dynamique de la formule avec les options 1 - 2 - 3
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProduct, selectedDessert, selectedBoisson, dessertSwitch]);

  const calculateTotalPrice = () => {
    let prix = 0;

    if (selectedProduct) {
      prix += parseFloat(selectedProduct.prix_unitaire) || 0;
    }

    if (selectedDessert) {
      prix += parseFloat(selectedDessert.prix_formule) || 0;
    }

    if (selectedBoisson) {
      prix += parseFloat(selectedBoisson.prix_formule) || 0;
    }

    setTotalPrice(prix);
  };

  const handleFormuleSelection = async () => {

    const optionIds = [
      selectedProduct?.productId,
      selectedDessert?.productId,
      selectedBoisson?.productId,
    ].filter(Boolean); // Éliminez les valeurs nulles ou non définies
    // console.log(optionIds)

    const formuleKey = `${selectedProduct?.productId ?? 'none'}-${
      selectedDessert?.productId ?? 'none'
    }-${selectedBoisson?.productId ?? 'none'}`;
    // console.log('formuleKey', formuleKey);

    resetCountdown();

    incrementhandler(
      user.userId,
      null,
      1,
      prix,
      'formule',
      false,
      selectedProduct.productId,
      selectedDessert ? selectedDessert.productId : null,
      selectedBoisson ? selectedBoisson.productId : null,
      null,
      null,
      `Formule ${name}`,
      formuleKey,
    );

    // Mise à jour du stock pour chaque option de la formule
    for (const optionId of optionIds) {
      await updateStock({productId: optionId, qty: 1});
    }
    navigation.navigate('panier');

  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: 50}}></View>
      <ScrollView ref={scrollViewRef}>
        <View>
          <FastImage
            source={imageUri}
            style={{width: '100%', height: 330}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <FastImage
            source={require('../../assets/logo_formule.jpg')}
            style={{...styles.pastilleOffre31, transform: [{rotate: '0deg'}]}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={style.contentTitleFormule}>
            <Text style={style.titleProduct}>Formule {name}</Text>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={1}
              style={{backgroundColor: 'black', borderRadius: 25}}>
              <ArrowLeft fill="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 30}}>
          <Text style={style.title}>Formule {name}</Text>
          <Text style={style.descriptionFormule}>{text}</Text>
        </View>
        {/* choix produit principal */}
        <View>
          <Text style={style.choixTitle}>Votre choix de {name}</Text>
          <ScrollView horizontal={true} style={style.scrollProduct}>
            {products.map((product, index) => (
              <View
                key={product.productId}
                style={{flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={style.contentProductCardFormule}
                  onPress={() => handleProduct(product)}>
                  <View style={getStyle(selectedProduct, product)} key={index}>
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
                      type="formule"
                    />
                    {selectedProduct?.productId === product.productId && (
                      <Check color={colors.color9} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* choix desserts */}
        <View>
          <View style={style.contentChoixTitle}>
            <Text style={style.choixTitle}>Les desserts </Text>
            <Text style={{fontSize: 12, color: colors.color1}}>
              (pour 2€ en +)
            </Text>
          </View>
          <ScrollView horizontal={true} style={style.scrollProduct}>
            {desserts.map((product, index) => (
              <View
                key={product.productId}
                style={{flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={style.contentProductCardFormule}
                  onPress={() => handleDessert(product)}>
                  <View style={getStyle(selectedDessert, product)} key={index}>
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
                    {selectedDessert?.productId === product.productId && (
                      <Check color={colors.color9} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* choix boissons */}
        <View>
          <View style={style.contentChoixTitle}>
            <Text style={style.choixTitle}>Les boissons </Text>
            <Text style={{fontSize: 12, color: colors.color1}}>
              (pour 2€ en +)
            </Text>
          </View>
          <ScrollView horizontal={true} style={style.scrollProduct}>
            {boissons.map((product, index) => (
              <View
                key={product.productId}
                style={{flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={style.contentProductCardFormule}
                  onPress={() => handleBoisson(product)}>
                  <View style={getStyle(selectedBoisson, product)} key={index}>
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
                    {selectedBoisson?.productId === product.productId && (
                      <Check color={colors.color9} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={style.menu}>
        <View>
          <View style={style.bandeauFormule}>
            <Text style={{fontWeight: 'bold', color: colors.color1}}>
              Prix de la formule
            </Text>
            {selectedProduct && typeof prix === 'number' && (
              <Text style={{color: colors.color1}}>{prix.toFixed(2)} €</Text>
            )}
          </View>
          <View style={style.bandeauFormule}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: colors.color1}}>Avec</Text>
              <Image
                source={require('../../assets/sun.jpg')}
                style={{width: 50, height: 20, resizeMode: 'contain'}}
              />
            </View>
            {selectedProduct && typeof prix === 'number' && (
              <Text style={{color: colors.color2, fontWeight: 'bold'}}>
                {(prix * 0.8).toFixed(2)} €
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[style.btn, !selectedProduct ? style.disabledBtn : {}]}
          onPress={handleFormuleSelection}
          disabled={!selectedProduct}
          activeOpacity={selectedProduct ? 0.2 : 0.8}>
          <Text style={{color: colors.color6}}>Choisir cette formule</Text>
        </TouchableOpacity>
      </View>
      <FooterProfile />
    </View>
  );
};

export default Formule;
