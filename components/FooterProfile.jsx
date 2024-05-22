import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {colors} from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
// import {API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS} from '@env';
import {API_BASE_URL} from '../config';
import Home from '../SVG/Home';
import Orders from '../SVG/Orders';
import Cart from '../SVG/Cart';
import Profile from '../SVG/Profile';
import Bug from '../SVG/Bug';
import LoginInvite from '../SVG/LoginInvite';
import ModaleInvite from './ModalInvite';
import FastImage from 'react-native-fast-image';
import {getCart} from '../CallApi/api.js';
import {fetchCart, getTotalCart} from '../reducers/cartSlice';

const FooterProfile = () => {
  //on utilise ici useNavigation et non pas navigation car le footer n'est pas dans la pile de screens
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isBadgeVisible, setIsBadgeVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const intervalId = useRef();

  const user = useSelector(state => state.auth.user);
  const totalQuantity = useSelector(state => state.cart.cartTotal);

  useEffect(() => {
    const loadCart = async () => {
      dispatch(getTotalCart(user.userId));
      // console.log('boucle footer');
    };
    loadCart();
  }, [user.userId, dispatch]);

  const openLink = url => {
    if (Platform.OS === 'android') {
      Linking.openURL(url)
        .then(supported => {
          if (!supported) {
            console.log("Can't handle URL: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    } else if (Platform.OS === 'ios') {
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log("Can't handle URL: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  };

  const openHome = () => {
    //retour en position page haute et refreshProducts
    navigation.navigate('home', {shouldScrollToTop: true, shouldReload: true });
  };
  const openOrders = () => {
    navigation.navigate('orders');
  };
  const openCart = async () => {
    navigation.navigate('panier');
  };
  const openProfile = () => {
    navigation.navigate('profile');
  };

  const openPopupInvite = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={style.profile}>
      <TouchableOpacity onPress={openHome}>
        <Home />
      </TouchableOpacity>

      <View style={style.badgeContainer}>
        <TouchableOpacity
          onPress={user.role == 'invite' ? openPopupInvite : openOrders}>
          <Orders />
        </TouchableOpacity>
      </View>

      <View style={style.badgeContainer}>
        <Badge
          visible={totalQuantity && totalQuantity.totalQuantity > 0}
          size={18}
          style={style.badgeCart}>
          {totalQuantity && totalQuantity.totalQuantity}
        </Badge>
        <TouchableOpacity onPress={openCart}>
          <Cart />
        </TouchableOpacity>
      </View>

      {user.role !== 'invite' && (
        <TouchableOpacity onPress={openProfile}>
          <Profile color={colors.color4} />
        </TouchableOpacity>
      )}
      {/* icone BUG */}
      {user.role !== 'invite' && (
        <TouchableOpacity
          onPress={() => openLink('https://www.help.lepaindujour.io/')}>
          {/* <Bug color={colors.color6}/> */}
          <FastImage
            source={require('../assets/Question.jpg')}
            style={{width: 30, height: 30, resizeMode: 'cover'}}
          />
        </TouchableOpacity>
      )}

      {user.role == 'invite' && (
        <TouchableOpacity onPress={openPopupInvite}>
          <LoginInvite />
        </TouchableOpacity>
      )}
      <ModaleInvite
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

const style = StyleSheet.create({
  profile: {
    height: 100,
    width: '100%',
    backgroundColor: colors.color1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 99,
  },
  badgeCart: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 99,
    backgroundColor: colors.color2,
  },
});

export default FooterProfile;
