import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, colors} from '../styles/styles';
import {style} from '../styles/orders';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import axios from 'axios';
import FooterProfile from '../components/FooterProfile';
import ArrowLeft from '../SVG/ArrowLeft';
import TextTicker from 'react-native-text-ticker';
import LottieView from 'lottie-react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS} from '@env';
import {API_BASE_URL} from '../config';
//call Api
import {getStoreById} from '../CallApi/api';
import ArrowDown from '../SVG/ArrowDown';
import {AntiGaspi} from '../SVG/AntiGaspi';
import {OffreSun} from '../SVG/OffreSun';

const Orders = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const userId = user.userId;
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);
  const [cancelledOrder, setCancelledOrder] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [hasOrder, setHasOrder] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  //test
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  // Calcul des commandes à afficher
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = previousOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  function formatPrice(price) {
    // Convertir price en nombre si ce n'est pas déjà un nombre
    const numericPrice = parseFloat(price);
    // Vérifier si numericPrice est un nombre valide et l'arrondir, sinon renvoyer "0.00"
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : "0.00";
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = Array.from(
    {length: Math.ceil(previousOrders.length / ordersPerPage)},
    (_, i) => i + 1,
  );

  const handlePreviousBtn = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextBtn = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, pageNumbers.length));
  };

  const renderPageNumbers = previousOrders.length > ordersPerPage && (
    <View style={style.paginationContainer}>
      <TouchableOpacity
        onPress={handlePreviousBtn}
        disabled={currentPage === 1}>
        <Text
          style={[
            style.pageNumberText,
            {opacity: currentPage === 1 ? 0.5 : 1},
          ]}>
          {'<'}
        </Text>
      </TouchableOpacity>

      {pageNumbers.map(number => {
        if (
          number === 1 ||
          number === pageNumbers.length ||
          (number >= currentPage - 1 && number <= currentPage + 1)
        ) {
          return (
            <TouchableOpacity
              key={number}
              onPress={() => paginate(number)}
              style={[
                style.pageNumber,
                currentPage === number && style.activePageNumber,
              ]}>
              <Text
                style={[
                  style.pageNumberText,
                  currentPage === number && style.activePageNumberText,
                ]}>
                {number}
              </Text>
            </TouchableOpacity>
          );
        } else if (number === currentPage - 2 || number === currentPage + 2) {
          return (
            <Text key={number} style={style.pageNumberText}>
              ...
            </Text>
          );
        } else {
          return null;
        }
      })}

      <TouchableOpacity
        onPress={handleNextBtn}
        disabled={currentPage === pageNumbers.length}>
        <Text
          style={[
            style.pageNumberText,
            {opacity: currentPage === pageNumbers.length ? 0.5 : 1},
          ]}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // fin test

  const handleBack = () => {
    navigation.navigate('home');
  };

  const allMyOrders = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ordersOfUserWithProducts/${userId}`,
      );
      const ordersWithDetails = response.data;
      if (ordersWithDetails.length > 0) {
        setHasOrder(true);
        // console.log(ordersWithDetails)
      }

      const enrichedOrdersWithStore = await Promise.all(
        ordersWithDetails.map(async order => {
          const store = await getStoreById(order.storeId);
          return {...order, store};
        }),
      );

      const sortedOrders = enrichedOrdersWithStore.sort(
        (a, b) => new Date(b.orderId) - new Date(a.orderId),
      );
      setLastOrder(sortedOrders[0]);
      setPreviousOrders(sortedOrders.slice(1));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error.response.status);
    }
  };

  useEffect(() => {
    allMyOrders();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // return `${day}-${month}-${year} ${hours}:${minutes}`;
    return `${day}/${month}/${year} `;
  };

  //autres commandes
  const renderOrder = (item, index, lastOrder = false) => {
    //calcul de l'ancien prix avant la remise SUNCollaborateur
    const prixUnitaires = item.products.map(product => {
      // conversion  string en number
      const prixUnitaire = parseFloat(product.prix_unitaire);
      return isNaN(prixUnitaire) ? 0 : prixUnitaire;
    });
    const sommePrixUnitaires = prixUnitaires.reduce(
      (acc, prix) => acc + prix,
      0,
    );

    // console.log('item commandes antérieures', JSON.parse(item.cartString));
    const cart = JSON.parse(item.cartString);
    // console.log('cart commandes anterieurs', item);
    return (
      <View style={lastOrder ? style.lastOrderContainer : style.backOldOrder}>
        <TouchableOpacity
          style={style.oldOrderRow}
          onPress={() => {
            if (expandedOrderIds.includes(item.orderId)) {
              setExpandedOrderIds(prevIds =>
                prevIds.filter(id => id !== item.orderId),
              );
            } else {
              setExpandedOrderIds(prevIds => [...prevIds, item.orderId]);
            }
          }}
          activeOpacity={1}>
          <View style={style.contentOlderOder}>
            <View style={style.flexStart}>
              <Text style={style.title}>
                {item.status.charAt(0).toUpperCase() + item.status.substring(1)}
              </Text>
              <Text style={style.underlineText}>N°: {item.orderId}</Text>
              <Text style={style.underlineText}>
                Payée: {item.paid === true ? 'Oui' : 'Non'}
              </Text>
            </View>
            <View style={style.textTicker}>
              <TextTicker
                style={style.title}
                duration={10000}
                repeatSpacer={50}
                marqueeDelay={1000}>
                {item.store && item.store.nom_magasin}
              </TextTicker>
              <Text style={style.underlineText}>{formatDate(item.date)}</Text>
            </View>
            <View style={style.flexStart}>
              <Text style={style.newPrice}>{item.prix_total}€</Text>
              {/* <Text style={style.detailsArticles}>
              {item.productIds.split(',').length}x{' '}
                {item.productIds.split(',').length === 1
                  ? `Article`
                  : `Articles`}
              </Text> */}
            </View>
            <View style={style.backArrow}>
              <ArrowDown />
            </View>
          </View>
        </TouchableOpacity>
        {expandedOrderIds.includes(item.orderId) && (
          <View style={style.expandedOrders}>
            <Text style={style.detailsOrderTitle}>Détails de la commande</Text>

            <View>
              {Array.isArray(cart) &&
                cart.map((product, index) => {
                  const {
                    type,
                    antigaspi,
                    option1,
                    option2,
                    option3,
                    qty,
                    prix_unitaire,
                    libelle,
                    prix,
                    type_produit,
                  } = product;
                  const key = product.id || index;

                   if (type === 'antigaspi') {
                    // si produit antigaspi
                    return (
                      <View key={key}>
                        <View style={style.orderDetails}>
                          <Text style={style.textWidth}>
                            <AntiGaspi color={colors.color8} /> {product.quantity}x {product.product}
                          </Text>
                          <View style={style.orderPrices}>
                            <Text style={style.newPrice}>
                              {/* {(product.unitPrice)}€ */}
                              {formatPrice(product.unitPrice)}€

                            </Text>
                            <Text style={style.newPrice}>
                              {/* {product.unitPrice}€ */}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  } 
                })}
            </View>

            <View style={style.rowTotal}>
              <Text style={style.title}>Votre total:</Text>
              <View>
                {/* ici somme des prix unitaire */}
                {/* <Text style={style.oldPrice}>
                  {sommePrixUnitaires.toFixed(2)}€
                </Text> */}
                <Text style={style.newPrice}>{item.prix_total}€</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  //derniere commande
  const renderLastOrder = (item, index) => {
    const parsedItem = JSON.parse(item.cartString);
    //console.log('parsedItem', parsedItem[0].type);
    // console.log('item derniere commande', parsedItem);

    let prixUnitaires;

    if (parsedItem[0].type === 'formule') {
      prixUnitaires = parsedItem.map(formule => {
        let prixOptions = 0;

        // Ajouter le prix pour l'option 1
        if (formule.option1) {
          const prixOption1 = parseFloat(formule.option1.prix_unitaire);
          prixOptions += isNaN(prixOption1) ? 0 : prixOption1;
        }

        // Ajouter le prix pour l'option 2
        if (formule.option2) {
          const prixOption2 = parseFloat(formule.option2.prix_formule);
          prixOptions += isNaN(prixOption2) ? 0 : prixOption2;
        }

        // Ajouter le prix pour l'option 3
        if (formule.option3) {
          const prixOption3 = parseFloat(formule.option3.prix_formule);
          prixOptions += isNaN(prixOption3) ? 0 : prixOption3;
        }

        return prixOptions;
      });
    } else {
      // Si ce n'est pas une formule
      prixUnitaires = item.products.map(product => {
        const prixUnitaire = parseFloat(product.prix_unitaire);
        return isNaN(prixUnitaire) ? 0 : prixUnitaire;
      });
    }

    // Calcul de la somme totale des prix unitaires
    const sommePrixUnitaires = prixUnitaires.reduce(
      (acc, prix) => acc + prix,
      0,
    );


 

    return (
      <>
        <View>
          <Text style={style.lastOrderTitle}>Votre derniere commande</Text>
          <View style={style.lastOrderView}>
            <View style={style.orderDetails}>
              <View>
                <Text style={style.underlineText}>
                  N° commande: {item.orderId}
                </Text>
                <Text style={style.underlineText}>
                  Passée le : {formatDate(item.createdAt)}
                </Text>
                <Text style={style.underlineText}>
                  Pour le : {formatDate(item.date)}
                </Text>
                <Text style={style.underlineText}>Status: {item.status}</Text>
                <Text style={style.underlineText}>
                  Payée: <Text style={style.title}>{item.paid === true ? 'Oui' : 'Non'}</Text>
                </Text>
              </View>
              <View>
                <Text style={style.storeTitle} numberOfLines={2}>
                  {item.store && item.store.nom_magasin}
                </Text>
              </View>
            </View>

            <View>
              <Text style={style.detailsOrderTitle}>
                Details de la commande
              </Text>
              <View>
                <View>
                  {Array.isArray(parsedItem) &&
                    parsedItem.map((product, index) => {
                      const {
                        type,
                        antigaspi,
                        option1,
                        option2,
                        option3,
                        qty,
                        prix_unitaire,
                        libelle,
                        prix,
                        type_produit,
                      } = product;
                      const key = product.id || index;

                      if (type === 'antigaspi') {
                        // si on a un produit antigaspi
                        return (
                          <View key={key}>
                            <View style={style.orderDetails}>
                              <Text style={style.textWidth}>
                                <AntiGaspi color={colors.color8} /> {product.quantity}x{' '}
                                {product.product}
                              </Text>
                              <View style={style.orderPrices}>
                                <Text style={style.newPrice}>
                                  {/* {(product.unitPrice.toFixed(2))}€ */}
                                 {formatPrice(product.unitPrice)}€

                                </Text>
                                
                              </View>
                            </View>
                          </View>
                        );
                      } 
                    })}
                </View>
              </View>

              <View style={style.rowTotal}>
                <Text style={style.title}>Votre total:</Text>
                <View>
                  {/* ici somme des prix unitaire */}
                  {/* <Text style={style.oldPrice}>
                    {sommePrixUnitaires.toFixed(2)}€
                  </Text> */}
                  <Text style={style.newPrice}>{item.prix_total}€</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListHeader = ({lastOrder}) => (
    <View>
      {lastOrder && renderLastOrder(lastOrder)}
      <Text style={style.lastOrderTitle}>Vos commandes antérieures</Text>
    </View>
  );

  return (
    <>
      {loading ? (
        <LottieView
          source={require('../assets/loaderpaiment.json')}
          autoPlay
          loop
          style={{
            width: 300,
            flexGrow: 1,
            alignSelf: 'center',
          }}
        />
      ) : hasOrder ? (
        <SafeAreaProvider style={style.viewContentTitlePage}>
          <View style={style.contentTitlePage}>
            <Text style={style.titlePage}>Vos commandes</Text>

            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.8}
              style={{backgroundColor: 'white', borderRadius: 25}}>
              <ArrowLeft fill={colors.color1} />
            </TouchableOpacity>
          </View>

          {/* sans pagination */}
          {/* <FlatList
            data={previousOrders}
            renderItem={({item, index}) => renderOrder(item, index)}
            keyExtractor={item => item.orderId.toString()}
            ListHeaderComponent={
              lastOrder ? <ListHeader lastOrder={lastOrder} /> : null
            }
          /> */}

          {/* avec paganiation */}
          <FlatList
            data={currentOrders} // Utilisez les commandes actuelles pour la pagination
            renderItem={({item, index}) => renderOrder(item, index)}
            keyExtractor={item => item.orderId.toString()}
            ListHeaderComponent={
              lastOrder ? <ListHeader lastOrder={lastOrder} /> : null
            }
            ListFooterComponent={renderPageNumbers} // Ajoutez le rendu des numéros de page ici
          />
        </SafeAreaProvider>
      ) : (
        <View style={style.viewContentTitlePageNoOrder}>
          <View>
            <View style={style.contentTitlePageNoOrders}>
              <Text style={style.titlePageNoOrders}>Vos commandes</Text>
              <TouchableOpacity onPress={handleBack} style={style.back}>
                <Icon name="keyboard-arrow-left" size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={style.noOrders}>
              <Text style={{color: colors.color1}}>
                Pas de commandes encore
              </Text>
            </View>
          </View>
        </View>
      )}

      <FooterProfile />
    </>
  );
};

export default Orders;
