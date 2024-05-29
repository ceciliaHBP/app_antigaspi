import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {fonts, colors} from '../styles/styles';
import {styles} from '../styles/home';
import {styleAntigaspi} from '../styles/antigaspi';

import React, {
  useState,
  useEffect,
  createRef,
  useRef,
  useCallback,
} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../reducers/authSlice';
import {getCart, getTotalCart} from '../reducers/cartSlice';

import axios from 'axios';
import FooterProfile from '../components/FooterProfile';
import Catalogue from '../components/Catalogue';
import CustomDatePicker from '../components/CustomDatePicker';

import LoaderHome from './LoaderHome';
import {API_BASE_URL} from '../config';
import Cloche from '../SVG/Cloche';
import Check from '../SVG/Check';
import ArrowDown from '../SVG/ArrowDown';
import LogoFond from '../SVG/LogoFond';
import Location from '../SVG/Location';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {
  fetchAllProductsAntigaspi,
  getFamilyProductDetails,
  hourAntigaspi,
  getAllStores,
  verifStockAntiGaspi,
  updateAntigaspiStock,
  addStockAntigaspi,
  getCartItemId
} from '../CallApi/api';
import {getStyle} from '../Fonctions/stylesFormule';
import NoAntigaspi from '../components/NoAntigaspi';
import ProductCard from '../components/ProductCard';
import NoProducts from '../components/NoProducts';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {decrementhandler, incrementhandler} from '../Fonctions/fonctions';
import {useCountdown} from '../components/CountdownContext';

const Home = ({navigation}) => {
  const [role, setRole] = useState('');
  const [store, setStore] = useState('');

  const [selectedOnglet, setSelectedOnglet] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [positionsY, setPositionsY] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [familyProductDetails, setFamilyProductDetails] = useState({});
  const familyProductIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 42, 44, 45, 48, 49, 50
  ];
  const [categoryRefs, setCategoryRefs] = useState({});
  const [isAntigaspiAccessible, setIsAntiGaspiAccessible] = useState(false);

  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart.cart);

  const {countdown, resetCountdown} = useCountdown();


  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);

      try {
        // Définir les promesses pour les différentes données à charger
        const productsPromise = fetchAllProductsAntigaspi();
        const cartPromise = dispatch(getCart(user.userId));
        const antigaspiPromise = hourAntigaspi();
        const delayPromise = new Promise(resolve => setTimeout(resolve, 5000));
        const storesPromise = getAllStores();

        // Attendre que toutes les données soient chargées en parallèle
        const [products, , , antigaspi, stores] = await Promise.all([
          productsPromise,
          cartPromise,
          delayPromise,
          antigaspiPromise,
          storesPromise,
        ]);

        setIsAntiGaspiAccessible(antigaspi);
        setStore(stores);
        if (antigaspi) {
          const updatedStockProducts = products.filter(
            product => product.stockantigaspi >= 1,
          );
          setProducts(updatedStockProducts);
          setCategories([
            ...new Set(products.map(product => product.categorie)),
          ]);
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement des données initiales:',
          error,
        );
      }

      setIsLoading(false);
    };

    loadInitialData();
  }, [dispatch, user.userId]);

  const route = useRoute();

  // a revoir
  const totalPrice = Number(
    cart
      .reduce((total, item) => {
        const prix = item.unitPrice;
        return total + item.quantity * prix;
      }, 0)
      .toFixed(2),
  );

  const dispatch = useDispatch();
  const scrollViewRef = createRef();
  const horizontalScrollViewRef = useRef(null);

  //retour en haut de page au click sur bouton Home et refreshProducts
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.shouldReload) {
        refreshProducts();
        route.params.shouldReload = false;
      }
      if (route.params?.shouldScrollToTop) {
        scrollToTop();
        route.params.shouldScrollToTop = false;
      }
    }, [route.params?.shouldScrollToTop]),
  );

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

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getOne/${user.userId}`)
      .then(response => {
        const role = response.data.role;
        setRole(role);
        dispatch(updateUser(response.data));
      })
      .catch(error => {
        console.log(
          "Erreur lors de la récupération du rôle de l'utilisateur page Home:",
          error,
        );
      });
  }, []);

  const handleProduct = product => {
    if (selectedProduct?.productId === product.productId) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  //scrolltop
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
    if (horizontalScrollViewRef.current) {
      horizontalScrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  //contenu visible
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  //Modifier les onglets ICI
  // const refs = {
  //   Desserts: useRef(null),
  //   Boissons: useRef(null),
  //   Pâtisseries: useRef(null),
  // };

  useEffect(() => {
    const newRefs = categories.reduce(
      (acc, category) => {
        acc[category] = acc[category] || createRef();
        return acc;
      },
      {...categoryRefs},
    );

    setCategoryRefs(newRefs);
  }, [categories]);

  const onglets = Object.keys(categoryRefs);

  const handleLayout = useCallback(
    onglet => event => {
      const {y} = event.nativeEvent.layout;
      setPositionsY(prev => ({...prev, [onglet]: y}));
    },
    [],
  );

  const ongletButtonHandler = onglet => {
    setIsManualScrolling(true);
    setSelectedOnglet(onglet);

    const positionY = positionsY[onglet];
    if (scrollViewRef.current && positionY !== undefined) {
      scrollViewRef.current.scrollTo({x: 0, y: positionY, animated: true});
    }
    setTimeout(() => {
      setIsManualScrolling(false);
    }, 1500);

    // // Pour déplacer l'onglet actif vers la gauche de l'écran

    const tabIndex = onglets.indexOf(onglet);
    const tabWidth = 170; // Remplacez par la largeur de vos onglets si elle est constante
    const positionX = tabIndex * tabWidth;
    horizontalScrollViewRef.current?.scrollTo({x: positionX, animated: true});
  };

  const handleScroll = event => {
    if (isManualScrolling) return; // Ignorez les mises à jour si un défilement manuel est en cours

    const paddingTop = 50;
    const scrollY = event.nativeEvent.contentOffset.y + paddingTop;

    let currentOnglet = null;

    // Parcourez les positionsY pour déterminer l'onglet actuellement visible
    for (let i = 0; i < onglets.length; i++) {
      const onglet = onglets[i];
      const nextOnglet = onglets[i + 1];

      if (
        scrollY >= positionsY[onglet] &&
        (!nextOnglet || scrollY < positionsY[nextOnglet])
      ) {
        currentOnglet = onglet;
        break;
      }
    }

    // Si l'onglet actuellement visible est différent de l'onglet sélectionné, mettez à jour
    if (currentOnglet && currentOnglet !== selectedOnglet) {
      setSelectedOnglet(currentOnglet);

      // Déplacez l'onglet actif vers la gauche de l'écran
      const tabIndex = onglets.indexOf(currentOnglet);
      const tabWidth = 170;
      const positionX = tabIndex * tabWidth;
      horizontalScrollViewRef.current?.scrollTo({x: positionX, animated: true});
    }
  };

  //fin scroll onglets

  const handleAddToCart = async product => {
    // verification du stock
    const stockAntigaspi = await verifStockAntiGaspi(product.productId);

    // si stock suffisant
    if (stockAntigaspi > 0) {
      // ajout dans le panier
      incrementhandler(
        user.userId,
        product.productId,
        1,
        product.prix_unitaire * 0.5,
        'antigaspi',
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
      // mise à jour du stock
      const newStock = await updateAntigaspiStock({...product, qty: 1});

      // Nouveau stock
      if (newStock !== undefined) {
        setProducts(prevProducts =>
          prevProducts
            .map(p => {
              if (p.productId === product.productId) {
                return {...p, stockantigaspi: newStock};
              }
              return p;
            })
            .filter(p => p.stockantigaspi > 0),
        ); 
      }

      resetCountdown();

      await dispatch(getCart(user.userId));
      await dispatch(getTotalCart(user.userId));

      Toast.show({
        type: 'success',
        text1: `Produit "${product.libelle}" ajouté au panier`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: `Plus de stock suffisant pour "${product.libelle}" `,
      });
      refreshProducts();
    }
  };

  const refreshProducts = async () => {
    try {
      const refreshedProducts = await fetchAllProductsAntigaspi();
      setProducts(refreshedProducts.filter(p => p.stockantigaspi > 0));
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des produits:', error);
    }
  };

  const handleRemoveToCart = async product => {

    const cartItemId = await getCartItemId(
      user.userId,
      product.productId,
      'antigaspi',
      null
    );

    // console.log('cartItemId', cartItemId)
    if ( cartItemId.length > 0){
      //retrait du le panier
      decrementhandler(
        user.userId,
        product.productId,
        1,
        'antigaspi',
        cartItemId[0],
        null
      );
      // // mise à jour du stock
      const newStock = await addStockAntigaspi({...product, qty: 1});
      // Nouveau stock
      if (newStock !== undefined) {
        setProducts(prevProducts =>
          prevProducts
            .map(p => {
              if (p.productId === product.productId) {
                return {...p, stockantigaspi: newStock};
              }
              return p;
            })
            .filter(p => p.stockantigaspi > 0),
        ); 
      }

      await dispatch(getCart(user.userId));
      await dispatch(getTotalCart(user.userId));

      Toast.show({
        type: 'success',
        text1: `Produit "${product.libelle}" enlevé au panier`,
      });
    
      refreshProducts();
     } 
  };


  return (
    <>
      <View style={{flex: 1}}>
        {isLoading ? (
          <LoaderHome />
        ) : (
          <SafeAreaProvider
            style={{flex: 1, paddingTop: 50, backgroundColor: colors.color4}}>
            <ScrollView
              vertical={true}
              style={{flex: 1, backgroundColor: colors.color4}}
              ref={scrollViewRef}
              stickyHeaderIndices={[1]}
              onScroll={handleScroll}
              scrollEventThrottle={16}>
              <View>
                <View style={styles.bandeau}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    {user && (
                      <View
                        style={{
                          paddingVertical: 20,
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: fonts.font1,
                              fontSize: 32,
                              color: colors.color1,
                              textAlign: 'center',
                            }}>
                            Bonjour{' '}
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: fonts.font2,
                              color: colors.color1,
                              fontWeight: '700',
                              textAlign: 'center',
                            }}>
                            {user.firstname}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/*  bandeau header */}
                <View
                  style={{
                    width: '100%',
                    height: 80,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <View
                      style={{
                        width: 160,
                        height: 80,
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{flexDirection: 'column'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: Platform.OS === 'ios' ? 8 : 0,
                          }}>
                          <Location />
                          <Text
                            style={{
                              ...styles.textPickerDate,
                              textAlign: 'center',
                            }}>
                            Livraison
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: colors.color2,
                            padding: 0,
                            textAlign: 'center',
                          }}>
                          {store[0].nom_magasin}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <CustomDatePicker />
                  </View>

                  <View
                    style={{backgroundColor: 'white', marginHorizontal: 20}}>
                    <TouchableOpacity
                      onPress={toggleVisibility}
                      activeOpacity={1}>
                      <ArrowDown />
                    </TouchableOpacity>
                  </View>
                  {/* </View> */}
                </View>
                {visible && (
                  <View
                    style={{
                      width: '100%',
                      height: 'auto',
                      backgroundColor: 'white',
                      flexDirection: 'column',
                      paddingHorizontal: 25,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', color: colors.color1}}>
                      Vos articles:
                    </Text>
                    {cart.map((item, index) => (
                      <View key={index} style={{paddingLeft: 20}}>
                        <Text style={{color: colors.color1, fontSize: 12}}>
                          {' '}
                          {item.quantity} x {item.product || item.libelle} à{' '}
                          {item.unitPrice}€
                        </Text>
                      </View>
                    ))}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        paddingVertical: 10,
                        color: colors.color1,
                      }}>
                      Votre total: {totalPrice}€
                    </Text>
                  </View>
                )}
              </View>

              {/* onglet ancres */}
              <View style={styles.categories}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ref={horizontalScrollViewRef}>
                  {onglets.map((item, index) => (
                    <Pressable
                      title="button"
                      style={({pressed}) => [
                        styles.btn_categorie,

                        {
                          backgroundColor:
                            item === selectedOnglet ? colors.color1 : 'white',
                          shadowColor: pressed
                            ? 'rgba(233, 82, 14, 0.5)'
                            : 'rgba(0, 0, 0, 0.3)',
                        },
                      ]}
                      key={index}
                      onPress={() => ongletButtonHandler(item)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 6,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: fonts.font2,
                            fontWeight: '700',
                            textAlign: 'center',
                            color:
                              item === selectedOnglet
                                ? colors.color6
                                : colors.color1,
                          }}>
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* 1er logo */}
              <View
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  transform: [{translateX: -100}, {translateY: +60}],
                  zIndex: -1,
                }}>
                <LogoFond color={colors.color6} />
              </View>
              {/* 2e logo */}
              <View
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  transform: [{translateX: +150}, {translateY: +600}],
                  zIndex: -1,
                }}>
                <LogoFond color={colors.color6} />
              </View>
              {/* 3e logo */}
              <View
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  transform: [{translateX: -200}, {translateY: +1200}],
                  zIndex: -1,
                }}>
                <LogoFond color={colors.color6} />
              </View>
              {/* 4e logo */}
              <View
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  transform: [{translateX: +100}, {translateY: +1850}],
                  zIndex: -1,
                }}>
                <LogoFond color={colors.color6} />
              </View>

              {/* si produit dispo ? affichage des produits sinon message indispo */}

              {isAntigaspiAccessible ? (
                products ? (
                  <View style={styleAntigaspi.container_familleProduct}>
                    {Object.values(
                      products.reduce((groups, product) => {
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
                      <View
                        key={group.id_famille_produit}
                        onLayout={handleLayout(
                          familyProductDetails[group.id_famille_produit],
                        )}>
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
                                    showButtons={true}
                                    ingredients={product.ingredients}
                                    showPriceSun={false}
                                    overlayStyle={{
                                      backgroundColor: 'transparent',
                                    }}
                                    addTocart={() => handleAddToCart(product)}
                                    item={product}
                                    removeTocart={() => handleRemoveToCart(product)}
                                    />

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
                ) : (
                  <NoProducts />
                )
              ) : (
                <NoAntigaspi />
              )}
            </ScrollView>

            <FooterProfile />
          </SafeAreaProvider>
        )}
      </View>
    </>
  );
};

export default Home;
