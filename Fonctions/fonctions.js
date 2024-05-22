import {
  addStock,
  checkStockForSingleProduct,
  addStockAntigaspi,
  fetchBoissonIds,
  fetchOneProduct,
  fetchDessertIds,
  clearUserCart,
  getCartItemId,
  getItemsOffre31,
} from '../CallApi/api.js';
import {
  addToCart,
  decrementOrRemoveFromCart,
  addFreeProductToCart,
  removeFromCart,
  removeFromCartAfterCountDown,
  removeMultipleFromCart,
  popLastItemOfType,
  makeLastSmallPizzaFree,
  getTotalCart,
  getCart,
  updateCart,
  resetPromo
} from '../reducers/cartSlice.js';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../config.js';
import {Linking, Platform} from 'react-native';

const configureAxiosHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  }
  axios.defaults.headers.common['x-access-header'] = 'hbpclickandcollect';
};

export const incrementhandler = async (
  userId,
  id,
  quantity,
  unitPrice,
  type,
  isFree = false,
  option1ProductId,
  option2ProductId,
  option3ProductId,
  offerId,
  typeProduit,
  libelle,
  key,
  product,
) => {
  const payload = {
    userId: userId,
    productId: id,
    quantity: quantity,
    unitPrice: unitPrice,
    type: type,
    isFree: isFree,
    option1ProductId: option1ProductId,
    option2ProductId: option2ProductId,
    option3ProductId: option3ProductId,
    offerId: offerId,
    typeProduit: typeProduit,
    libelle: libelle,
    key: key,
    product: product,
  };
  // console.log('payload', payload)
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addOrUpdateCartItem`,
      payload,
    );
    // console.log('j\'ajoute response', response.data);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout du produit",
      error,
    );
  }
};

export const decrementhandler = async (
  userId,
  id,
  quantity = 1,
  type,
  cartItemId,
  key,
) => {
  //console.log('je decremente ');
  const payload = {
    userId: userId,
    productId: id,
    quantity: quantity,
    type: type,
    cartItemId: cartItemId,
    key: key,
  };
  // console.log('payload', payload);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/removeOrUpdateCartItem`,
      payload,
    );
    // console.log('j\'ajoute response', response.data);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors du retrait du produit",
      error,
    );
  }
};

export const removehandler = (type, id, item, dispatch, qty) => {
  // console.log('type', type);
  // console.log('id', id);
  // console.log('item', item);
  //console.log('qty', qty);

  let lastItemOffre;

  // Si "item" contient une propriété "items", qui est un tableau, alors obtenez le dernier produit avec le "productId" correspondant.
  if (item.items && Array.isArray(item.items)) {
    const lastItem = item.items.filter(item => item.productId === id).pop();
    if (lastItem) {
      lastItemOffre = lastItem.offre;
    }
  }
  if (type === 'formule') {
    dispatch(removeMultipleFromCart({formuleId: id}));
    item.productIds.forEach(productId => {
      addStock({productId: productId, qty: qty});
      // console.log(`je remets le stock de ${qty} pour ${productId}`)
    });
  }

  if (type === 'antigaspi') {
    dispatch(removeFromCart({productId: id, type}));
    addStockAntigaspi({productId: id, qty: qty});
    // console.log(`je remets le stock de ${qty} pour ${id}`)
  }

  if (type === 'product') {
    // console.log('item', item)
    dispatch(removeFromCart({productId: id, type}));
    addStock({productId: id, qty: qty});
    // console.log(`je remets le stock de ${qty} pour ${id}`)
  }
  if (type === 'offreSUN') {
    // console.log('item', item)
    dispatch(removeFromCart({productId: id, type}));
  }
  if (type === 'petitepizza') {
    //console.log('item', item)
    dispatch(removeFromCart({productId: id, type}));
    addStock({productId: id, qty: qty});
    // console.log(`je remets le stock de ${qty} pour ${id}`)
  }
};

//after countdown
export const removehandlerafterCountdown = (type, id, item, dispatch, qty) => {
  // console.log('type', type);
  // console.log('id', id);
  // console.log('item', item);
  //console.log('qty', qty);

  let lastItemOffre;

  // Si "item" contient une propriété "items", qui est un tableau, alors obtenez le dernier produit avec le "productId" correspondant.
  if (item.items && Array.isArray(item.items)) {
    const lastItem = item.items.filter(item => item.productId === id).pop();
    if (lastItem) {
      lastItemOffre = lastItem.offre;
    }
  }
  if (type === 'formule') {
    dispatch(removeMultipleFromCart({formuleId: id}));
    item.productIds.forEach(productId => {
      addStock({productId: productId, qty: qty});
      // console.log(`je remets le stock de ${qty} pour ${productId}`)
    });
  }

  if (type === 'antigaspi') {
    dispatch(removeFromCartAfterCountDown({productId: id, type}));
    addStockAntigaspi({productId: id, qty: qty});
    // console.log(`je remets le stock de ${qty} pour ${id}`)
  }

  if (type === 'product') {
    // console.log('item', item)
    dispatch(removeFromCartAfterCountDown({productId: id, type}));
    addStock({productId: id, qty: qty});
    // console.log(`je remets le stock de ${qty} pour ${id}`)
  }
  if (type === 'offreSUN') {
    // console.log('item', item)
    dispatch(removeFromCartAfterCountDown({productId: id, type}));
  }
  if (type === 'petitepizza') {
    //console.log('item', item)
    dispatch(removeFromCartAfterCountDown({productId: id, type}));
    addStock({productId: id, qty: qty});
    // console.log(`je remets le stock de ${qty} pour ${id}`)
  }
};

//---STOCK---//

// Vérification des stocks
async function checkProductStock(checkStockForSingleProduct, productId) {
  try {
    const isAvailable = await checkStockForSingleProduct(productId);
    return isAvailable.find(item => item.productId === productId) || null;
  } catch (error) {
    console.error('Erreur lors de la vérification du stock:', error);
    return false;
  }
}

//Vérifie la quantité d'un produit dans le panier
function getProductQtyInCart(cart, productId) {
  let totalQty = 0;

  cart.forEach(item => {
    if (item.productIds && Array.isArray(item.productIds)) {
      totalQty += item.productIds.filter(id => id === productId).length;
    } else if (item.productId === productId) {
      totalQty += item.qty || 0;
    }
  });

  return totalQty;
}

// Vérifie la disponibilité d'un produit en prenant en compte les stocks et le panier
async function checkProductAvailability(
  product,
  checkStockForSingleProduct,
  cart,
) {
  const stockObject = await checkProductStock(
    checkStockForSingleProduct,
    product.productId,
  );
  if (!stockObject) {
    Toast.show({
      type: 'error',
      text1: `Erreur`,
      text2: `Erreur lors de la vérification du stock.`,
    });
    return false;
  }

  const stockAvailable = stockObject.quantite;
  const productInCartQty = getProductQtyInCart(cart, product.productId);

  const remainingStock = stockAvailable - productInCartQty;
  if (remainingStock <= 0) {
    Toast.show({
      type: 'error',
      text1: `Victime de son succès`,
      text2: `Plus de stock disponible`,
    });
    return false;
  }

  return true;
}

export const removeCartCountDown = (cart, countdown, dispatch) => {
  // console.log('countdown', countdown);
  if (countdown === 0) {
    // console.log('cart', cart);

    const groupedItems = cart.reduce((acc, item) => {
      // Déterminer le type de l'article
      let type = 'product'; // La valeur par défaut est 'product'
      let key;

      // Vérifier si l'article est de type 'antigaspi' ou 'formule', sinon garder 'product'
      if (item.antigaspi) {
        type = 'antigaspi';
        key = `${item.productId}-${type}`; // Utilisez productId pour antigaspi
      } else if (item.type && item.type === 'formule') {
        type = 'formule';
        const formuleId = item.id; // Assumption: item.id est l'identifiant unique de la formule
        key = `${formuleId}-${type}`; // Utilisez formuleId pour les formules
      } else if (item.type && item.type === 'petitepizza') {
        type = 'petitepizza';
        key = `${item.productId}-${type}`; //
      } else {
        key = `${item.productId}-${type}`; // Utilisez productId pour les produits standards
      }

      // Initialiser le groupe si nécessaire
      if (!acc[key]) {
        acc[key] = {...item, qty: 0, type, id: item.id || item.productId}; // Inclure id pour gérer les formules
      }

      // Ajouter la quantité de l'article au total du groupe
      acc[key].qty += item.qty;

      return acc;
    }, {});

    // Maintenant, vous pouvez traiter chaque groupe d'articles
    Object.values(groupedItems).forEach(group => {
      // console.log('grouped item', group);
      // console.log('qty removecart', group.qty);

      // Ici, pour les formules, l'id doit être passé correctement à removehandler
      const idForHandler =
        group.type === 'formule' ? group.id : group.productId;
      removehandlerafterCountdown(
        group.type,
        idForHandler,
        group,
        dispatch,
        group.qty,
      );
    });
  }
};

export const handleOfferCalculation = (cart, dispatch) => {
  // console.log('fonction handleoffre')
  const sameOfferProducts = cart.filter(
    item => item.offre && item.offre.startsWith('offre31_Petite'),
  );
  // Calculez la quantité totale pour cette offre spécifique
  const totalQuantity = sameOfferProducts.reduce(
    (total, product) => total + product.qty,
    0,
  );

  // Si la quantité totale est un multiple de 4, rendez la dernière pizza ajoutée gratuite
  if (totalQuantity % 4 === 0) {
    // console.log('4e pizza gratuite');
    dispatch(makeLastSmallPizzaFree());
  }
};

export const getDessertDetails = async setDesserts => {
  try {
    // 1. Récupération de tous les produits
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsClickandCollect`,
    );
    let allProducts = response.data;

    // 2. Filtrer les produits avec fetchDessertIds
    const dessertIds = await fetchDessertIds();
    let filteredProducts = allProducts.filter(product =>
      dessertIds.includes(product.productId),
    );

    // 3. Obtenir les détails pour chaque ID filtré
    const productPromises = filteredProducts.map(product =>
      fetchOneProduct(product.productId),
    );
    const desserts = await Promise.all(productPromises);
    const updtatedDesserts = desserts.filter(
      product => product.clickandcollect === true,
    );

    // updtatedDesserts.forEach((product) => {
    //     console.log('product: ', product.libelle + '  ingredients:', product.ingredients);
    // });

    setDesserts(updtatedDesserts);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des desserts:",
      error,
    );
  }
};

export const getBoissonDetails = async setBoissons => {
  try {
    // 1. Récupération de tous les produits
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsClickandCollect`,
    );
    let allProducts = response.data;
    // 2. Filtrer les produits avec fetchDessertIds
    const boissonIds = await fetchBoissonIds();
    let filteredProducts = allProducts.filter(product =>
      boissonIds.includes(product.productId),
    );
    // 3. Obtenir les détails pour chaque ID filtré
    const productPromises = filteredProducts.map(product =>
      fetchOneProduct(product.productId),
    );
    const boissons = await Promise.all(productPromises);

    const updatedBoissons = boissons.filter(
      product => product.clickandcollect === true,
    );

    setBoissons(updatedBoissons);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des boissons:",
      error,
    );
  }
};

export const fetchProducts = async (categorie, setProducts) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsClickandCollect`,
    );
    let updatedProducts;

    if (categorie === 'Pizzas') {
      updatedProducts = response.data.filter(
        product =>
          product.clickandcollect === true &&
          product.libelle.toLowerCase().startsWith('petite'),
      );
    } else {
      updatedProducts = response.data.filter(
        product =>
          product.clickandcollect === true && product.categorie === categorie,
      );
    }
    setProducts(updatedProducts);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des produits principaux:",
      error,
    );
  }
};

export const fetchProductsOffre31 = async setOffre31ProductsByCategory => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsClickandCollect`,
    );

    const updatedProducts = response.data.map(product => ({
      ...product,
      qty: 0,
    }));

    //on conserve cette logique pour filtrer avec "vente a distance" pour ne pas mettre par exemple les grandes pizzas
    const productsOffre = updatedProducts.filter(
      product =>
        product.offre &&
        product.offre.startsWith('offre31_') &&
        product.vente_a_distance === true,
    );

    //trie par catégorie
    const productsByCategory = productsOffre.reduce((acc, product) => {
      const {categorie} = product;
      if (!acc[categorie]) {
        acc[categorie] = [];
      }
      acc[categorie].push(product);
      return acc;
    }, {});

    setOffre31ProductsByCategory(productsByCategory);
    // setOffre31ProductNames(productsOffre);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des produits:",
      error,
    );
  }
};

/** Page Panier */

export const createOrder = async orderData => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createorder`, orderData);
    // console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la creation de la commande :', error);
  }
};

export const openStripe = async (
  orderInfo,
  setSessionId,
  setCheckoutSession,
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkout_session`, {
      orderInfo,
      platform: Platform.OS,
      isDev: __DEV__,
    });
    const sessionUrl = response.data.session;
    const sessionId = response.data.id;
    setSessionId(sessionId);
    const stripeCheckoutUrl = `${sessionUrl}`;
    setCheckoutSession(stripeCheckoutUrl);
    Linking.openURL(sessionUrl);
    return sessionId;
  } catch (error) {
    console.error("Erreur lors de l'ouverture de la session Stripe :", error);
    return null;
  }
};

export const checkPaymentStatus = async (
  sessionId,
  navigation,
  dispatch,
  countDownNull,
  resetCountdown,
  user,
) => {
  const intervalId = setInterval(async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/paiementStatus?sessionId=${sessionId}`,
      );
      const {status, transactionId, method, orderID} = response.data;
      // retour : response data {"status": "paid", "transactionId": "pi_3NOFjcGnFAjiWNhK0KP6l8Nl"}

      // si status paid - je stop la boucle
      if (status === 'paid') {
        // le countdown passe a null
        countDownNull();
        navigation.navigate('success');
        clearInterval(intervalId);
        // supprimer le panier et son contenu
        await clearUserCart(user.userId);
        dispatch(getTotalCart(user.userId));
        // vider le code promo
        dispatch(resetPromo());
      } else if (status === 'unpaid') {
        // si status unpaid - retour en arriere
        navigation.navigate('cancel');
        clearInterval(intervalId);
        // je reset le countdown
        resetCountdown();
      } else {
        console.log(`Status du paiement en attente ou inconnu: ${status}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'état du paiement :",
        error,
      );
    }
  }, 5000);
};

export const formatToDateISO = selectedDateString => {
  // Découpage de la chaîne de date en jour, mois, année et conversion en nombres
  const [day, month, year] = selectedDateString.split('/').map(Number);

  // Création d'un objet Date en UTC avec l'heure fixée à minuit
  const formattedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

  // Conversion de l'objet Date au format ISO pour la base de données
  const dateForDatabase = formattedDate.toISOString();

  return dateForDatabase;
};

 // Restaurer le prix d'origine
export const handleRemoveDiscount = (cart, dispatch, setAppliedPromo, setCurrentPromoCode, setPromoCode) => {
  const restoredCart = cart.map(item => ({
    ...item,
    unitPrice: item.originalPrice,
  }));
  dispatch(getCart(restoredCart));
  setAppliedPromo(null);
  setCurrentPromoCode(null);
  setPromoCode('');
  // retire le promotionId dans le store redux
  dispatch(resetPromo());
};

export const countdownStock = async (cart, user, dispatch) => {
  // console.log(cart);
  if (!cart || !cart.length) {
    // console.log('Le panier est vide ou non défini.');
    return;
  }

  // remise en stock des articles
  for (const item of cart) {
    if (item.type === 'simple') {
      const cartItemId = await getCartItemId(
        user.userId,
        item.productId,
        item.type,
        item.key,
        item.cartItemId,
      );
      await decrementhandler(
        user.userId,
        item.productId,
        item.quantity,
        item.type,
        cartItemId[0],
        item.key,
      );
      await addStock({productId: item.productId, qty: item.quantity});
    }
    if (item.type === 'offre31') {
      const items = await getItemsOffre31(item.productId);
      for (const item of items) {
        await decrementhandler(
          user.userId,
          item.productId,
          item.quantity,
          item.type,
          item.cartItemId,
          item.key,
        );
      }
      await addStock({productId: item.productId, qty: item.quantity});
    }

    if (item.type === 'antigaspi') {
      const cartItemId = await getCartItemId(
        user.userId,
        item.productId,
        item.type,
        item.key,
      );
      await decrementhandler(
        user.userId,
        item.productId,
        item.quantity,
        item.type,
        cartItemId[0],
        item.key,
      );
      await addStockAntigaspi({productId: item.productId, qty: item.quantity});
    }
    if (item.type === 'offreSUN') {
      const cartItemId = await getCartItemId(
        user.userId,
        item.productId,
        item.type,
        item.key,
      );
      await decrementhandler(
        user.userId,
        item.productId,
        item.quantity,
        item.type,
        cartItemId[0],
        item.key,
      );
    }
    if (item.type === 'formule') {
      const optionIds = [
        item.option1ProductId,
        item.option2ProductId,
        item.option3ProductId,
      ].filter(Boolean);

      // Log des IDs des produits
      // optionIds.forEach(optionId => {
      //   console.log('productId', optionId);
      //   console.log('quantity', item.quantity);
      // });

      // Ajout du stock pour chaque option
      await Promise.all(
        optionIds.map(optionId =>
          addStock({productId: optionId, qty: item.quantity}),
        ),
      );

      // Obtention du cartItemId après ajout du stock pour éviter des erreurs
      const cartItemId = await getCartItemId(
        user.userId,
        item.productId,
        item.type,
        item.key,
      );

      // Vérification si cartItemId est non null
      if (cartItemId) {
        await decrementhandler(
          user.userId,
          item.productId,
          item.quantity,
          item.type,
          cartItemId[0],
          item.key,
        );
      } else {
        console.error(
          'Erreur lors de la récupération du cartItemId:',
          cartItemId,
        );
      }
    }
    //supprimer le panier et son contenu
    await dispatch(getCart(user.userId)); // Mise à jour du panier dans le store Redux
    await dispatch(getTotalCart(user.userId)); // Mise à jour du total du panier dans le store Redux
  }
};
/** Fin page Panier */

export {
  checkProductStock,
  getProductQtyInCart,
  checkProductAvailability,
  configureAxiosHeaders,
};
