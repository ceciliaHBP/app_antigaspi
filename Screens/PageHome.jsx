import {View, Text, Pressable, ScrollView , TouchableOpacity, Image, Modal, Button, FlatList, Dimensions, ImageBackground } from 'react-native'
import { fonts, colors} from '../styles/styles'
import { styles } from '../styles/home'; 
import React, {useState, useEffect,  createRef,useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  updateUser} from '../reducers/authSlice';
import axios from 'axios'
import FooterProfile from '../components/FooterProfile';
import ProductCard from '../components/ProductCard'
import FormulesSalees from '../components/FormulesSalees';
import FormulesPetitDejeuner from '../components/FormulesPetitDejeuner';
import LinkOffres from '../components/LinkOffres';
import EnvieSalee from '../components/EnvieSalee';
import Catalogue from '../components/Catalogue';
import StorePicker from '../components/StorePicker';
import CustomDatePicker from '../components/CustomDatePicker';
import ArrowDown from '../SVG/ArrowDown';
import LoaderHome from './LoaderHome';
import SearchModal from '../components/SearchModal';
import ArrowLeft from '../SVG/ArrowLeft';
import { API_BASE_URL } from '../config';
// import {API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS} from '@env';
import Search from '../SVG/Search';
import ProductFlatList from '../components/ProductFlatList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LogoFond from '../SVG/LogoFond';
import { useRoute, useFocusEffect } from '@react-navigation/native';




const PageHome = ({navigation}) => {

  

  const [stores, setStores] = useState([]);
  const [role, setRole] = useState('');
  const [ selectedOnglet, setSelectedOnglet] = useState(null)
  const [ products, setProducts] = useState([])
  const [ categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products); 
  const [ visible, setVisible] = useState(false)
  const [positionsY, setPositionsY] = useState({});
  const [isLoading, setIsLoading] = useState(true); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);


  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);

  const screenWidth = Dimensions.get('window').width;
  const route = useRoute();

  const totalPrice = Number((cart.reduce((total, item) => {
    const prix = item.prix || item.prix_unitaire; 
    return total + item.qty * prix;
  }, 0)).toFixed(2));

  const dispatch = useDispatch();
  const scrollViewRef = createRef();
  const horizontalScrollViewRef = useRef(null);

   //retour en haut de page au click sur bouton Home
   useFocusEffect(
    React.useCallback(() => {
      if (route.params?.shouldScrollToTop) {
        scrollToTop();
      }
      if (route.params?.shouldScrollToTop) {
        route.params.shouldScrollToTop = false;
      }
    }, [route.params?.shouldScrollToTop])
  );
  const allStores = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllStores`);
      setStores(response.data);
    } catch (error) {
      console.error("Une erreur s'est produite, erreur stores :", error);
    }
  };
  

  useEffect(() => {
    allStores();
    setFilteredProducts(products)
  }, [products]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/getOne/${user.userId}`)
      .then(response => {
        const role  = response.data.role;
         setRole(role); 
         dispatch(updateUser(response.data))
      })
      .catch(error => {
        console.log('Erreur lors de la récupération du rôle de l\'utilisateur page page Home:', error);
      });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
      const response = await axios.get(`${API_BASE_URL}/getAllProductsClickandCollect`);    
      const updatedProducts = response.data.map((product) => ({
        ...product,
        qty: 0, 
      }));

      setProducts(updatedProducts);
      setCategories([...new Set(updatedProducts.map((product) => product.categorie)), 'Tous']);

      setTimeout(() => {
        setIsLoading(false); 
      }, 5000);

      } catch (error) {
        console.error('Une erreur s\'est produite, error products :', error);
        setIsLoading(false)
      } 
    };
    fetchData(); 
  }, []);


  //redirection vers la page de détails
  const handleProductPress = (product) => {
    navigation.navigate('details', { product });
  };

  //search
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.libelle ? product.libelle.toLowerCase().includes(query.toLowerCase()) : false
    );

    setFilteredProducts(filtered);
    
  };

  const handleSelectProduct = (product) => {
    setIsModalVisible(false);
    navigation.navigate('details', { product });
  };

//classement par catégories
// const groupedAndSortedProducts = filteredProducts.reduce((acc, cur) => {
const groupedAndSortedProducts = products.reduce((acc, cur) => {
  (acc[cur.categorie] = acc[cur.categorie] || []).push(cur);
  return acc;
}, {});

const sortedCategories = Object.keys(groupedAndSortedProducts).sort();

//scrolltop
const scrollToTop = () => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollToOffset({offset:0, animated: true });

  }
  if (horizontalScrollViewRef.current) {
    horizontalScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }
  if (horizontalScrollViewRef.current) {
    horizontalScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }
};

//contenu visible
const toggleVisibility = () => {
  setVisible(!visible)
}

const refs = {
  'Promos': useRef(null),
  'Baguettes': useRef(null),
  'Viennoiseries': useRef(null),
  'Formules': useRef(null),
  'Produits Salés': useRef(null),
  'Pâtisseries': useRef(null),
  'Pains Spéciaux': useRef(null),
  'Petits déjeuners': useRef(null),
  'Boissons': useRef(null),
  'Tarterie': useRef(null),
};

const onglets = Object.keys(refs);

const handleLayout = useCallback((onglet) => (event) => {
    const { y } = event.nativeEvent.layout;
    setPositionsY(prev => ({ ...prev, [onglet]: y }));
    const height = event.nativeEvent.layout.height;
}, []);


const ongletButtonHandler = (onglet) => {
  setIsManualScrolling(true);
  setSelectedOnglet(onglet);
  
  const positionY = positionsY[onglet];
  if (scrollViewRef.current && positionY !== undefined) {
    scrollViewRef.current.scrollToOffset({ offset: positionY, animated: true });
  }
  setTimeout(() => {
    setIsManualScrolling(false);
  }, 1500);

  // // Pour déplacer l'onglet actif vers la gauche de l'écran
  const tabIndex = onglets.indexOf(onglet);
  const tabWidth = 170; // largeur des onglets
  const positionX = tabIndex * tabWidth;
  horizontalScrollViewRef.current?.scrollTo({ x: positionX, animated: true });
};

const handleScroll = (event) => {
  if (isManualScrolling) return; // Ignorez les mises à jour si un défilement manuel est en cours

  const paddingTop = 50; 
  const scrollY = event.nativeEvent.contentOffset.y + paddingTop;

  let currentOnglet = null;

  // Parcourez les positionsY pour déterminer l'onglet actuellement visible
  for (let i = 0; i < onglets.length; i++) {
    const onglet = onglets[i];
    const nextOnglet = onglets[i + 1];

    if (scrollY >= positionsY[onglet] && (!nextOnglet || scrollY < positionsY[nextOnglet])) {
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
    horizontalScrollViewRef.current?.scrollTo({ x: positionX, animated: true });
  }
};

//fin scroll onglets


  //flatslist
  const data = [
    { type: 'Bandeau' },
    { type: 'Livraison'},
    { type: 'Menu'},
    { type: 'Promos'},
    { type: 'Baguettes'},
    { type: 'Viennoiseries'},
    { type: 'Formules'},
    { type: 'EnvieSalees'},
    { type: 'Patisseries'},
    { type: 'Boules'},
    { type: 'PetitDej'},
    { type: 'Boissons'},
    { type: 'Catalogue'},
  ] 
  
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'Bandeau':
        return (
          <View style={styles.bandeau}>
            <View style={{flexDirection:'row'}}>
              {
                user && 
                <View style={{paddingVertical:20, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:"100%"}}>
                  <View >
                    <Text style={{fontFamily:fonts.font1, fontSize:32, color:colors.color1}}>Bonjour </Text>
                    <Text style={{fontSize:18, fontFamily:fonts.font2, color:colors.color1}}>{user.firstname}</Text>
                  </View>
                    
                  {/* SearchBar */}
                  <TouchableOpacity  onPress={() => setIsModalVisible(true)} activeOpacity={0.8} style={{backgroundColor:colors.color3, borderRadius:50, width:50, height:50, justifyContent: 'center', 
                      alignItems: 'center', }}>                           
                      <Search  colors={colors.color2}/>
                  </TouchableOpacity> 
                  
                  <SearchModal
                    isVisible={isModalVisible}
                    products={filteredProducts}
                    onSelectProduct={handleSelectProduct}
                    onClose={() => setIsModalVisible(false)}
                    handleSearch={handleSearch} 
                    searchQuery={searchQuery}   
                  />
                </View>
              }
            </View>  
          </View>
        );
      case 'Livraison': 
        return (
          <View>
          <View style={{ width:"100%", height:80, backgroundColor:'white', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>              
            <View>
            <StorePicker />
            </View> 

            <View >
              <CustomDatePicker />
            </View>

            <View style={{backgroundColor:'white', marginHorizontal:30}}> 
              <TouchableOpacity  onPress={toggleVisibility} activeOpacity={1} >
                <ArrowDown />
              </TouchableOpacity>
          </View>          
      </View>
        {
          visible && (
            <View style={{ width:"100%", height:'auto', backgroundColor:'white', flexDirection:'column', paddingHorizontal:25, borderBottomLeftRadius:10, borderBottomRightRadius:10, paddingVertical:10}}> 
              <Text style={{fontWeight:"bold"}}>Vos articles:</Text>
            {cart.map((item, index) => (
                <View key={index} style={{paddingLeft:20}}>
                    <Text> {item.qty} x {item.libelle}</Text>
                </View>
            ))}
            <Text style={{fontWeight:"bold", paddingVertical:10}}>Votre total: {totalPrice}€</Text>

            </View>
          )
        }
        </View>
        );
      case 'Menu':
        return (
        <View style={styles.categories} >

        <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={horizontalScrollViewRef} >
        {
          onglets.map((item, index) => (
            <Pressable title="button" 
            style={({ pressed }) => [
              styles.btn_categorie, 
              {
                backgroundColor: item === 'Promos' 
                ? colors.color2 
                : item === selectedOnglet 
                  ? colors.color1 
                  : 'white',  
                shadowColor: pressed ? 'rgba(233, 82, 14, 0.5)' : 'rgba(0, 0, 0, 0.3)', 
              }
            ]}
              key={index}
              onPress={() => ongletButtonHandler(item)}
            >
              <View style={{flexDirection:'row', alignItems:'center', gap:6}}>
                <Text style={{fontSize:16, fontFamily:fonts.font2,fontWeight: "700",
                   color: item === 'Promos' 
                   ? colors.color6 
                   : item === selectedOnglet 
                     ? colors.color6
                     : colors.color1 , 
                  }}>{item}</Text>
                  
                 {item === 'Promos' && 
                 
                 <Image
                    source={require('../assets/promos.png')} 
                    style={{ width: 15, height: 15, resizeMode:'cover' }}
                   
                />
                }
                 
              </View>
            </Pressable>
          ))
        }
        </ScrollView>
      </View>
      );
      case  'Promos':
        return (
          <View onLayout={handleLayout('Promos')}ref={refs['Promos']} style={styles.paddingProduct}>
           <LinkOffres />
          </View>
        );
      case 'Baguettes':
        return(
        sortedCategories
            .filter(category => category === 'Baguettes')
            .map((category) => (

          <View key={category} onLayout={handleLayout('Baguettes')} style={{...styles.paddingProduct}}>

              <ProductFlatList
              category={category}
              products={groupedAndSortedProducts[category]}
              handleProductPress={handleProductPress}
            />
            </View>
          ))
        );
      case 'Viennoiseries':
        return (
          sortedCategories
              .filter(category => category ===  'Viennoiseries')
              .map((category) => (

              <View key={category} onLayout={handleLayout('Viennoiseries')} style={{...styles.paddingProduct}}>

                <ProductFlatList
                category={category}
                products={groupedAndSortedProducts[category]}
                handleProductPress={handleProductPress}
              />
              </View>
            ))
        )
      case 'Formules':
        return (
          <View onLayout={handleLayout('Formules')} style={{...styles.paddingProduct, paddingTop:60}}>
            <FormulesSalees />
          </View>
        );
      case 'EnvieSalees':
        return (
          <View onLayout={handleLayout('Produits Salés')} style={{...styles.paddingProduct}}>
          <EnvieSalee />
        </View>
        );
      case 'Patisseries':
        return (
          sortedCategories
              .filter(category => category ===  'Pâtisseries')
              .map((category) => (

                <View key={category} onLayout={handleLayout('Pâtisseries')} style={styles.paddingProduct}>

                <ProductFlatList
                category={category}
                products={groupedAndSortedProducts[category]}
                handleProductPress={handleProductPress}
              />
               </View>
            ))
        );
      case 'Boules':
        return (
          sortedCategories
              .filter(category => category === 'Boules et Pains Spéciaux')
              .map((category) => (

            <View key={category} onLayout={handleLayout('Pains Spéciaux')} style={{...styles.paddingProduct}}>

                <ProductFlatList
                category={category}
                products={groupedAndSortedProducts[category]}
                handleProductPress={handleProductPress}
              />
              </View>
            ))
        );
      case 'PetitDej':
        return (
          <View onLayout={handleLayout('Petits déjeuners')} style={styles.paddingProduct}>
            <FormulesPetitDejeuner />
            </View>
        )
      case 'Boissons':
        return (
          sortedCategories
              .filter(category => category ===  'Boissons')
              .map((category) => (
                <View key={category} onLayout={handleLayout('Boissons')} style={styles.paddingProduct}>
                <ProductFlatList
                category={category}
                products={groupedAndSortedProducts[category]}
                handleProductPress={handleProductPress}
              />
              </View>
            ))
        );
      case 'Catalogue':
        return (
          <>
          <View onLayout={handleLayout('Tarterie')} style={styles.paddingProduct}>
          <Catalogue />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={styles.scrollTop }  onPress={scrollToTop}>
            <ArrowDown />
          </TouchableOpacity>
        </View>
        </>
        )
      default:
        return null;
    }
  };
  
  
  return (
    <>
    <SafeAreaProvider  style={{flex:1, paddingTop:50, backgroundColor:colors.color4}}>
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.type}
    ref={scrollViewRef} stickyHeaderIndices={[2]} onScroll={handleScroll} scrollEventThrottle={16}
    removeClippedSubviews={true}
  />
  </SafeAreaProvider>
  <FooterProfile />
  </>
  )
}

export default PageHome