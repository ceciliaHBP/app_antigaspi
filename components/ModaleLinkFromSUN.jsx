import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../styles/styles';
import logoSun from '../assets/logoSUNPremium.jpg';
import {
  sendDatatoCancelLinkToSun,
  sendDatatoConfirmLinkToSun,
} from '../CallApi/api';
import {useSelector, useDispatch} from 'react-redux';
import {linkFromSUN, cancelLink} from '../reducers/authSlice';

const ModaleLinkFromSUN = ({
  modalVisible,
  setModalVisible,
  user,
}) => {

  const dispatch = useDispatch();

  // je confirme le lien = je mets à jour le statusSUn = confirmé
  const confirmLinkSUN = async () => {
    try {
      await sendDatatoConfirmLinkToSun(user.userId, user.idSUN);
      dispatch(linkFromSUN('confirmé'))
    } catch (error) {
      console.error("Une erreur s'est produite, coté sendMsg :", error);
    }
  };

  // j'annule la demande de lien, le statusSUN = null et je vide l'idSUN
  const cancelLinkSUN = async () => {
    try {
      dispatch(cancelLink())
      await sendDatatoCancelLinkToSun(user.idSUN, user.userId);
    } catch (error) {
      console.error("Une erreur s'est produite, coté  statusSUn :", error);
    }
  };

  const onClose = () => {
    setModalVisible(!modalVisible);
}
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose()
      }}
      >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} style={{ alignItems: 'center', position:'absolute', top:0, right:10}}>
                <Text style={{ fontSize: 36, color:colors.color1}}>&times;</Text>
        </TouchableOpacity>
          <Image source={logoSun} style={styles.logoSUN} />
          <View style={styles.textContent}>
            <Text style={styles.textColor}>Demande de Connexion demandée par SUN </Text>
          </View>

          <View style={styles.contentBtns}>
            <TouchableOpacity
              onPress={() => {
                cancelLinkSUN();
                setModalVisible(!modalVisible);
              }}
              style={{...styles.btn, backgroundColor: colors.color8}}>
              <Text style={styles.colorTextBtn}>Refuser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                confirmLinkSUN();
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

export default ModaleLinkFromSUN;
