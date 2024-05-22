import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import {colors} from '../styles/styles';
import offre31 from '../assets/offre31.jpg';

const ModalePageOffre31 = ({
  modalVisible,
  setModalVisible,
  handleAcceptOffer,
  selectedProduct,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Image source={offre31} style={styles.offre31} />
        <View style={styles.textContent}>
          <Text style={styles.textColor}>
            Souhaitez vous bénéficier de l'offre 3+1 pour le produit:{' '}
            <Text style={styles.span}>{selectedProduct && selectedProduct.libelle} </Text> 
            ?
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
                setModalVisible(!modalVisible);
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
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.color6,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
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
  offre31: {
    width: 40,
    height: 40,
  },
  textContent: {
    marginVertical: 20,
  },
  textColor: {
    textAlign: 'center',
    color: colors.color1,
    fontSize: 16,
  },
  span:{
    color:colors.color2,
    fontWeight:'bold'
  }
});

export default ModalePageOffre31;
