import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import React, {useState, useEffect, useCallback} from 'react';
import {
  addToCart,
  acceptOffer,
  addToCartReducer,
  getTotalCart,
  getCart,
} from '../reducers/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {fonts, colors} from '../styles/styles';
import {style} from '../styles/productcard';

import ModaleOffre31 from '../components/ModaleOffre31';

import Svg, {Path} from 'react-native-svg';
// import {  API_BASE_URL, API_BASE_URL_ANDROID } from '@env';
import {API_BASE_URL} from '../config';
import FastImage from 'react-native-fast-image';
import {useCountdown} from './CountdownContext';

//call API
import {
  checkStockForSingleProduct,
  updateStock,
  getCartItemId,
  addStock,
  //getCart,
  getItemsOffre31,
} from '../CallApi/api.js';
//fonctions
import {
  incrementhandler,
  decrementhandler,
  handleOfferCalculation,
} from '../Fonctions/fonctions';
import InfoProduct from '../SVG/InfoProduct';
import ModaleIngredients from './ModaleIngredients';
import LogoSun from '../SVG/LogoSun';
import Increment from '../SVG/Increment';
import Decrement from '../SVG/Decrement';

const ProductCard = ({
  libelle,
  id,
  image,
  prix,
  qty,
  stock,
  offre,
  prixSUN,
  showButtons,
  showPromo = true,
  ingredients,
  showPriceSun = true,
  allergenes,
  category,
  overlayStyle,
  type,
  item,
}) => {
  // Déclaration de l'état du stock
  const [currentStock, setCurrentStock] = useState(stock);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleIngredients, setModalVisibleIngredients] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const {resetCountdown} = useCountdown();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart.cart);


  const handleIngredients = () => {
    setModalVisibleIngredients(true);
  };

  /* styles css dynamique suivant showPromo */
  const promoPrice = {
    fontWeight: showPromo ? 'bold' : '300',
    color: showPromo ? 'green' : colors.color1,
  };
  const standardPrice = {
    color: showPromo ? 'gray' : colors.color1,
    textDecorationLine: showPromo ? 'line-through' : 'none',
  };
  const PriceSun = {
    width: showPriceSun ? '60%' : '100%',
  };

  useEffect(() => {
    const calculateQuantity = () => {
      const quantity = cart.reduce((total, cartItem) => {
        if (
          cartItem.productId === item?.productId &&
          cartItem.type !== 'antigaspi'
        ) {
          return total + cartItem.quantity;
        }
        return total;
      }, 0);

      setTotalQuantity(quantity);
    };

    if (cart && item) {
      calculateQuantity();
    }
    // console.log(`quantite ${item.libelle}`, totalQuantity)
  }, [cart, item]); // This only recalculates when `cart` or `item` changes

  const handleAcceptOffer = async () => {
    //  offre accpetée: ajout du produit gratuit
    incrementhandler(
      user.userId,
      item.productId,
      1,
      0,
      'offre31',
      true,
      null,
      null,
      null,
      null,
      null,
      item.categorie,
      null,
      item.libelle,
    );
    await updateStock({...item, qty: 1});
    await dispatch(getCart(user.userId));
    await dispatch(getTotalCart(user.userId));
  };

  const addToCart = async () => {
    // console.log('item', item);
    let localType = 'simple'; // Valeur par défaut

    if (item.offre && item.offre.startsWith('offre31')) {
      // Vérifie si 'offre31' contient le mot 'pizza'
      if (!item.offre.toLowerCase().includes('pizza')) {
        localType = 'offre31';
      }
    }
    // console.log('localType', localType)
    // Mettre à jour le panier et la quantité après chaque modification.
    const updateCartAndQuantity = async () => {
      const updatedCart = cart;
      calculateTotalQuantity(updatedCart);
    };
    // Quantité totale de produits payants et gratuits pour l'offre 3+1.
    const calculateTotalQuantity = async cart => {
      const produitsPayants = cart
        .filter(
          product =>
            product.productId === item.productId &&
            product.type === 'offre31' &&
            !product.isFree,
        )
        .reduce((total, product) => total + product.quantity, 0);
      const produitsGratuits = cart
        .filter(
          product =>
            product.productId === item.productId &&
            product.type === 'offre31' &&
            product.isFree,
        )
        .reduce((total, product) => total + product.quantity, 0);

      // console.log(
      //   `Produits payants: ${produitsPayants}, Produits gratuits: ${produitsGratuits}`,
      // );

      if (
        produitsPayants % 3 === 0 &&
        produitsGratuits < Math.floor(produitsPayants / 3)
      ) {
        setModalVisible(true);
      } else {
        incrementhandler(
          user.userId,
          item.productId,
          1,
          item.prix_unitaire,
          localType,
          false, // Commence par ajouter le produit comme payant
          null,
          null,
          null,
          null,
          null,
          item.categorie,
          null,
          item.libelle,
        );
      }
      await dispatch(getCart(user.userId));
      await dispatch(getTotalCart(user.userId));
    };

    try {
      const stockCheck = await checkStockForSingleProduct(id);
      if (stockCheck[0].quantite > 0) {
        if (item.offre && item.offre.startsWith('offre31')) {
          // Calculer la quantité totale des produits avec le même productId et type 'offre31' dans le panier
          updateCartAndQuantity();
        } else {
          // Ajout classique pour les types non 'offre31'
          incrementhandler(
            user.userId,
            item.productId,
            1,
            item.prix_unitaire,
            localType,
            false,
            null,
            null,
            null,
            null,
            null,
            item.categorie,
            null,
            item.libelle,
          );
          // updateCartAndQuantity();
        }
        await updateStock({...item, qty: 1});
        await dispatch(getCart(user.userId));
        await dispatch(getTotalCart(user.userId));
        resetCountdown();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Victime de son succès',
          text2: 'Plus de stock disponible',
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  const removeToCart = async () => {
    try {
      let localType =
        item.offre && item.offre.startsWith('offre31') ? 'offre31' : 'simple';
      if (localType === 'offre31') {
        const items = await getItemsOffre31(item.productId);
        // console.log(items[0].cartItemId)
        decrementhandler(
          user.userId,
          item.productId,
          1,
          localType,
          items[0].cartItemId,
          null,
        );
      } else {
        const cartItemId = await getCartItemId(
          user.userId,
          item.productId,
          localType,
        );
        //2-a on enleve le produit dans le panier un produit classique
        decrementhandler(
          user.userId,
          item.productId,
          1,
          localType,
          cartItemId[0],
          null,
        );
      }

      //2-b  mise a jour du stock
      await addStock({...item, qty: 1});
      await dispatch(getCart(user.userId));
      await dispatch(getTotalCart(user.userId));
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du retrait du produit du panier: ",
        error,
      );
    }
  };

  return (
    <View style={style.card_container}>
      <View style={style.image_container}>
        <FastImage
          style={{width: '100%', height: 140}}
          source={{
            uri: `${API_BASE_URL}/${image}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {currentStock === 0 && <View style={[style.overlay, overlayStyle]} />}
        {/* le infoproduct n'apparait pas pour les boissons */}
        {category !== 'Boissons' && ingredients != '' && allergenes != '' && (
          <TouchableOpacity
            style={{position: 'absolute', bottom: 10, left: 10}}
            onPress={handleIngredients}
            activeOpacity={0.8}>
            <InfoProduct />
          </TouchableOpacity>
        )}
        {offre && offre.startsWith('offre31') && (
          <Image
            source={require('../assets/offre31.jpg')}
            style={style.logoOffre31}
          />
        )}

        <View style={style.qtyContainer}>
          <TouchableOpacity
            // onPress={() => decrementhandler()}
            onPress={() => removeToCart()}
            style={
              showButtons
                ? style.decrement
                : {...style.decrement, opacity: 0, height: 0, width: 0}
            }
            // disabled={productQuantity === 0}
          >
            <View>
              <Decrement />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              showButtons
                ? style.qtyText
                : {...style.qtyText, opacity: 0, height: 0, width: 0}
            }>
            <Text style={style.text}>{totalQuantity}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => incrementhandler()}
            onPress={() => addToCart()}
            style={
              showButtons
                ? style.increment
                : {...style.increment, opacity: 0, height: 0, width: 0}
            }>
            <Increment />
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.containerTextTicker}>
        <View style={[style.viewTextTicker, PriceSun]}>
          <TextTicker
            style={style.textTickerLibelle}
            duration={5000}
            loop
            repeatSpacer={50}
            marqueeDelay={1000}>
            {libelle}
          </TextTicker>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={[style.priceCard, standardPrice]}>
              {prix}€
            </Text>
            {showPromo ? (
              <Text
                numberOfLines={1}
                style={[style.priceAntigaspi, promoPrice]}>
                {/* 50% de réduction pour l'antigaspi */}
                {(prix * 0.5).toFixed(2)}€
              </Text>
            ) : null}
          </View>
        </View>

        {showPriceSun ? (
          <>
            <View style={style.separationPrice} />
            <View style={style.viewLogoSunSvg}>
              <LogoSun />
              <Text numberOfLines={1} style={style.viewPrice}>
                {(prix * 0.8).toFixed(2)}€
              </Text>
            </View>
          </>
        ) : null}
      </View>

      <ModaleOffre31
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAcceptOffer={handleAcceptOffer}
      />
      <ModaleIngredients
        modalVisibleIngredients={modalVisibleIngredients}
        setModalVisibleIngredients={setModalVisibleIngredients}
        product={ingredients}
        allergenes={allergenes}
      />
    </View>
  );
};

export default React.memo(ProductCard);
