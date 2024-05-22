import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import logoSun from '../assets/logoSUNPremium.jpg';
import {useCountdown} from '../components/CountdownContext';
import {incrementhandler} from '../Fonctions/fonctions';
import { getCart, getTotalCart} from '../reducers/cartSlice';

const ModaleOffreSUN = ({modalVisible, setModalVisible, product}) => {
  const {resetCountdown} = useCountdown();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    const loadCart = async () => {
      // appel du panier via redux
      dispatch(getCart(user.userId));
      dispatch(getTotalCart(user.userId));
      // console.log('boucle modale offre sun');
    };

    loadCart();
  }, [user.userId, dispatch]);

  const handleAcceptOffer = async () => {
    setModalVisible(!modalVisible);
    await incrementhandler(
      user.userId,
      product.productId,
      1,
      product.prix_unitaire,
      'offreSUN',
      true,
      null,
      null,
      null,
      null,
      product.type_produit,
      product.categorie,
      null,
      product.libelle
    );
    await dispatch(getCart(user.userId));
    await dispatch(getTotalCart(user.userId));
    resetCountdown();

  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={logoSun} style={styles.logoSUN} />
          <View style={styles.textContent}>
            <Text style={styles.textColor}>Je veux bénéficier de </Text>
            <Text style={styles.textColor}>
              {' '}
              ma baguette du jour gratuite !
            </Text>
          </View>

          <View style={styles.contentBtns}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{...styles.btn, backgroundColor: colors.color8}}>
              <Text style={styles.colorTextBtn}>Refuser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleAcceptOffer();
              }}
              style={styles.btn}>
              <Text style={styles.colorTextBtn}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.color6,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    textAlign: 'center',
    color: colors.color1,
    fontSize: 16,
  },
  btn: {
    backgroundColor: colors.color9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  contentBtns: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  colorTextBtn: {
    color: colors.color6,
  },
  textContent: {
    marginVertical: 20,
  },
  logoSUN: {
    width: 40,
    height: 40,
  },
});

export default ModaleOffreSUN;
