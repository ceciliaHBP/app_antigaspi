import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, acceptOffer, getCart, getTotalCart} from '../reducers/cartSlice';
import {
  checkStockForSingleProduct,
  updateStock,
  //getCart,
  getItemsOffre31,
  getCartItemId,
  addStock,
} from '../CallApi/api.js';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import FooterProfile from '../components/FooterProfile';
import ModaleOffre31 from '../components/ModaleOffre31';
import ArrowLeft from '../SVG/ArrowLeft';
import {colors, fonts} from '../styles/styles';
import Svg, {Path} from 'react-native-svg';
import {style} from '../styles/formules';
import {styles} from '../styles/productdetails';
import {Button} from 'react-native-paper';
import {API_BASE_URL} from '../config';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import FastImage from 'react-native-fast-image';
import {useCountdown} from '../components/CountdownContext';

//fonctions
import {
  incrementhandler,
  decrementhandler,
  handleOfferCalculation,
} from '../Fonctions/fonctions';
import InfoProduct from '../SVG/InfoProduct';
import ModaleIngredients from '../components/ModaleIngredients';
import LogoSun from '../SVG/LogoSun';
import Decrement from '../SVG/Decrement';
import Increment from '../SVG/Increment';

const ProductDetails = ({navigation, route}) => {
  const {product} = route.params;
  const [currentStock, setCurrentStock] = useState(product.stock);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [modalVisibleIngredients, setModalVisibleIngredients] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  // const [cart, setCart] = useState([]);
  const {resetCountdown} = useCountdown();
  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const cart = await getCart(user.userId);
  //     setCart(cart.ProductsCarts);
  //   };
  //   fetchCart();
  // }, [cart]);

  useEffect(() => {
    const loadCart = async () => {
      // appel du panier via redux
      dispatch(getCart(user.userId));
      dispatch(getTotalCart(user.userId));
      // console.log('boucle productdetails');
    };

    loadCart();
  }, [user.userId, dispatch]);

  const handleBack = () => {
    navigation.navigate('home');
  };

  const handleCart = () => {
    navigation.navigate('panier');
  };
  const openIngredients = () => {
    setModalVisibleIngredients(true);
  };

  // calcul quantité deja presente dans le panier
  useEffect(() => {
    const calculateQuantity = () => {
      const quantity = cart.reduce((total, cartItem) => {
        if (
          cartItem.productId === product.productId &&
          cartItem.type !== 'antigaspi'
        ) {
          return total + cartItem.quantity;
        }
        return total;
      }, 0);

      setTotalQuantity(quantity);
    };

    if (cart && product) {
      calculateQuantity();
    }
  }, [cart, product]);

  // console.log(product)

  const handleAcceptOffer = async () => {
    //  offre accpetée: ajout du produit gratuit
    incrementhandler(
      user.userId,
      product.productId,
      1,
      0,
      'offre31',
      true,
      null,
      null,
      null,
      null,
      null,
      product.categorie,
      null,
      product.libelle,
    );
    await updateStock({...product, qty: 1});
    await dispatch(getCart(user.userId));
    await dispatch(getTotalCart(user.userId));
  };

  // ajout d'un produit
  const addToCart = async () => {
    let localType =
      product.offre && product.offre.startsWith('offre31')
        ? 'offre31'
        : 'simple';

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
            product.productId === product.productId &&
            product.type === 'offre31' &&
            !product.isFree,
        )
        .reduce((total, product) => total + product.quantity, 0);
      const produitsGratuits = cart
        .filter(
          product =>
            product.productId === product.productId &&
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
          product.productId,
          1,
          product.prix_unitaire,
          localType,
          false, // Commence par ajouter le produit comme payant
          null,
          null,
          null,
          null,
          null,
          product.categorie,
          null,
          product.libelle,
        );
      }
      await dispatch(getCart(user.userId));
      await dispatch(getTotalCart(user.userId));
    };

    try {
      const stockCheck = await checkStockForSingleProduct(product.productId);
      if (stockCheck[0].quantite > 0) {
        if (product.offre && product.offre.startsWith('offre31')) {
          // Calculer la quantité totale des produits avec le même productId et type 'offre31' dans le panier
          updateCartAndQuantity();
        } else {
          // Ajout classique pour les types non 'offre31'
          incrementhandler(
            user.userId,
            product.productId,
            1,
            product.prix_unitaire,
            localType,
            false,
            null,
            null,
            null,
            null,
            null,
            product.categorie,
            null,
            product.libelle,
          );
          // updateCartAndQuantity();

        }
        await updateStock({...product, qty: 1});
        await dispatch(getCart(user.userId));
        await dispatch(getTotalCart(user.userId));
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
  // retrait d'un produit
  const removeToCart = async () => {
    try {
      let localType =
        product.offre && product.offre.startsWith('offre31')
          ? 'offre31'
          : 'simple';

      if (localType === 'offre31') {
        const items = await getItemsOffre31(product.productId);
        // console.log('items', items);
        // console.log(items[0].cartItemId)
        decrementhandler(
          user.userId,
          product.productId,
          1,
          localType,
          items[0].cartItemId,
          null,
        );
      } else {
        const cartItemId = await getCartItemId(
          user.userId,
          product.productId,
          localType,
        );
        // console.log('cartItemId', cartItemId);
        //2-a on enleve le produit dans le panier un produit classique
        decrementhandler(
          user.userId,
          product.productId,
          1,
          localType,
          cartItemId[0],
          null,
        );
      }

      //2-b  mise a jour du stock
      await addStock({...product, qty: 1});
      await dispatch(getCart(user.userId));
      await dispatch(getTotalCart(user.userId));
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du retrait du produit du panier: ",
        error,
      );
    }
  };
  let localType =
    product.offre && product.offre.startsWith('offre31') ? 'offre31' : 'simple';
  // console.log(`localType du ${product.libelle}`, localType);
  // calcul des prix (en tenant compte de l'offre 3+1)

  let productsPrice;
  if (localType === 'offre31') {
    let fullGroups = Math.floor(totalQuantity / 4); // Nombre complet de groupes de 4
    let remainingProducts = totalQuantity % 4; // Produits restants hors des groupes complets
    productsPrice = (fullGroups * 3 + remainingProducts) * product.prix_unitaire; // 3 payés dans chaque groupe complet + les restants payés séparément
  } else {
    productsPrice = totalQuantity * product.prix_unitaire;
  }

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{paddingTop: 50}}></View>
        <ScrollView style={{marginBottom: 20}}>
          <View>
            {/* <Image source={{ uri: `${API_BASE_URL}/${product.image}` }} style={{width: "100%", height:300, resizeMode:'cover'}} /> */}
            <FastImage
              style={{width: '100%', height: 300, resizeMode: 'cover'}}
              source={{
                uri: `${API_BASE_URL}/${product.image}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* info product n'apparait pas pour les boissons */}
            {product.categorie !== 'Boissons' &&
              product.ingredients != '' &&
              product.allergenes != '' && (
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 10, right: 10}}
                  onPress={openIngredients}>
                  <InfoProduct />
                </TouchableOpacity>
              )}
            <View style={styles.contentTitle}>
              <Text style={styles.titleProduct}>{product.libelle}</Text>
              <TouchableOpacity
                onPress={handleBack}
                activeOpacity={1}
                style={{backgroundColor: colors.color1, borderRadius: 25}}>
                <ArrowLeft fill="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.details}>
            <Text style={{color: colors.color1}}>
              {product.descriptionProduit}
            </Text>
          </View>

          <View style={styles.contentLibelle}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', color: colors.color1}}>
                {product.libelle}
              </Text>
              <Text style={{fontWeight: '200', color: colors.color1}}>
                {product.prix_unitaire} €
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: colors.color3,
                marginVertical: 5,
              }}
            />
            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
              <LogoSun />
              <Text style={styles.prixSun}>
                {(product.prix_unitaire * 0.8).toFixed(2)}€
              </Text>
            </View>
          </View>

          {/* <View style={{ marginVertical:20, marginHorizontal:30}}>
                <Text style={{fontFamily:fonts.font2, fontWeight:"700"}}>Ingrédients</Text>
              </View>

              <View style={{backgroundColor:colors.color6, marginHorizontal:30, borderRadius:10, padding: 10, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>{product.ingredients}</Text>
              </View> */}
        </ScrollView>
        <ModaleOffre31
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleAcceptOffer={handleAcceptOffer}
        />
      </View>

      <View style={{...style.menu, height: 120, justifyContent: 'center'}}>
        <View style={{flexDirection: 'column', gap: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: colors.color1}}>
              Ajouter le produit au panier:{' '}
            </Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={() => removeToCart()}
                style={styles.container_gray}
                // disabled={productQuantity === 0}
              >
                <Decrement />
              </TouchableOpacity>

              <View style={styles.container_gray}>
                <Text style={styles.qtyText}>{totalQuantity}</Text>
              </View>
              <TouchableOpacity
                onPress={() => addToCart()}
                style={{
                  ...styles.container_gray,
                  backgroundColor: colors.color2,
                }}>
                <Increment />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <View>
              <View style={style.bandeauFormule}>
                <Text style={{fontWeight: 'bold', color: colors.color1}}>
                  {totalQuantity < 2 ? 'Prix du produit' : 'Prix des produits'}
                </Text>
                <Text style={{color: colors.color1}}>
                  {productsPrice.toFixed(2)} €
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
                {(productsPrice * 0.8).toFixed(2)} €
                </Text>
              </View>
            </View>

            <Button
              style={style.btn}
              textColor={'white'}
              // disabled={!selectedProduct}
              onPress={handleCart}>
              Allez au panier
            </Button>
          </View>
        </View>
      </View>
      <ModaleIngredients
        modalVisibleIngredients={modalVisibleIngredients}
        setModalVisibleIngredients={setModalVisibleIngredients}
        product={product.ingredients}
        allergenes={product.allergenes}
      />

      <FooterProfile />
    </>
  );
};

export default ProductDetails;
