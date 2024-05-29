import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fonts, colors} from '../styles/styles';
import {style} from '../styles/productcard';

// import {  API_BASE_URL, API_BASE_URL_ANDROID } from '@env';
import {API_BASE_URL} from '../config';
import FastImage from 'react-native-fast-image';
import {useCountdown} from './CountdownContext';

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
  addTocart,
  removeTocart
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
// console.log('cart', cart)


  const handleIngredients = () => {
    setModalVisibleIngredients(true);
  };

  /* styles css dynamique suivant showPromo */
  const promoPrice = {
    fontWeight: showPromo ? 'bold' : '300',
    color: showPromo ? colors.color2 : colors.color1,
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
      if (!cart || !item || !item.productId) {
        setTotalQuantity(0);
        return;
      }
      const quantity = cart.reduce((total, cartItem) => {
        return cartItem.productId === item.productId ? total + cartItem.quantity : total;
      }, 0);
      setTotalQuantity(quantity);
    };
  
    calculateQuantity();
  }, [cart, item]); // Rend cette fonction dépendante du panier et de l'item actuel
  


  
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
            onPress={removeTocart}
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
            // onPress={() => addToCart()}
            onPress={addTocart}

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
