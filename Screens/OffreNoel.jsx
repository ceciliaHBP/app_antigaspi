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
import {addToCart} from '../reducers/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {style} from '../styles/formules';
import {styles} from '../styles/home';
import axios from 'axios';
import {
  getFamilyProductDetails,
  checkStockForSingleProduct,
} from '../CallApi/api';
import FooterProfile from '../components/FooterProfile';
import ArrowLeft from '../SVG/ArrowLeft';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from '../components/ProductCard';
import { API_BASE_URL } from '../config';
// import {API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS} from '@env';
import FastImage from 'react-native-fast-image';

//Ordre des mcatégories
const categoryOrder = ['Poke Bowls', 'Plats Chauds', 'Desserts'];

const sortProductsByCategory = products => {
  const categories = {};

  products.forEach(product => {
    const {categorie} = product;
    if (!categories[categorie]) {
      categories[categorie] = [];
    }
    categories[categorie].push(product);
  });

  // Trier les clés de catégorie en fonction du tableau categoryOrder
  const sortedCategories = {};
  categoryOrder.forEach(category => {
    if (categories[category]) {
      sortedCategories[category] = categories[category];
    }
  });

  // Ajouter les autres catégories qui ne sont pas dans categoryOrder à la fin
  Object.keys(categories).forEach(category => {
    if (!sortedCategories.hasOwnProperty(category)) {
      sortedCategories[category] = categories[category];
    }
  });

  return sortedCategories;
};
const OffreNoel = ({navigation}) => {
  const [noelProduct, setProductNoel] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  //test

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const handleBack = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getAllProductsClickandCollect`,
        );

        const updatedProducts = response.data.map(product => ({
          ...product,
          qty: 0,
        }));
        //produits Noel
        const noelProduct = updatedProducts.filter(
          product => product.reference_fournisseur === 'Noel',
        );
        const sortedProducts = sortProductsByCategory(noelProduct);

        setProductNoel(sortedProducts);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits:",
          error,
        );
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, product) => acc + product.qty * product.prix_unitaire,
      0,
    );
    setTotalPrice(totalPrice);
  }, [cart]);

  // const handleProduct = (product) => {
  //     setSelectedProduct(product)
  // }

  const handleCart = async () => {
    navigation.navigate('panier');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: 50}}></View>

      <ScrollView>
        <View>
          <FastImage
            source={require('../assets/offrePageNoel.jpg')}
            style={{width: '100%', height: 330, resizeMode: 'cover'}}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              paddingHorizontal: 30,
              paddingVertical: 30,
            }}>
            <Text style={{...style.titleProduct, width: '90%'}}>
              Produits Festifs
            </Text>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={1}
              style={{backgroundColor: 'black', borderRadius: 25}}>
              <ArrowLeft fill="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 30, paddingTop: 50}}>
          <Text style={style.title}>Pour Les fêtes</Text>
          <Text style={styles.texteOffre}>
            "Célébrez avec éclat chaque instant festif. Nos incontournables pour
            Noël et l'Épiphanie vous plongent au cœur de l'esprit des fêtes."{' '}
          </Text>
        </View>
        {/* choix produits*/}
        <View style={{flexDirection: 'column'}}>
          {Object.keys(noelProduct).map((category, index) => (
            <View
              key={category}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 20,
              }}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {noelProduct[category].map(product => (
                <View
                  style={{width: 170, marginBottom: 15}}
                  key={product.libelle}>
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
                    showButtons={true}
                    showPromo={false}
                    ingredients={product.ingredients}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={style.menu}>
        <View>
          <View style={style.bandeauFormule}>
            <Text style={{fontWeight: 'bold', color: colors.color1}}>
              Prix du produit
            </Text>
            {/* <Text>{selectedProduct ? selectedProduct.prix_unitaire : 0} €</Text> */}
            <Text style={{color: colors.color1}}>
              {totalPrice.toFixed(2)} €
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
            {/* <Text style={{color:colors.color2, fontWeight:"bold"}}>{selectedProduct ?  Number(selectedProduct.prix_remise_collaborateur) : 0} €</Text> */}
            <Text style={{color: colors.color2, fontWeight: 'bold'}}>
              {(totalPrice * 0.8).toFixed(2)}€
            </Text>
          </View>
        </View>
        <Button
          style={style.btn}
          textColor={'white'}
          // disabled={!selectedProduct}
          onPress={handleCart}>
          Aller au panier
        </Button>
      </View>
      <FooterProfile />
    </View>
  );
};

export default OffreNoel;
