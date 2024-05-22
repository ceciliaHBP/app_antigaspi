import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {colors} from '../styles/styles';
import logoSun from '../assets/logoSUNPremium.jpg';
import {sendDataToDemandLinkToSun} from '../CallApi/api';
import {useDispatch} from 'react-redux';
import {linkToSUN, cancelLink} from '../reducers/authSlice';
import {validateEmail} from '../validation/validationInput';

const ModaleLinkToSUN = ({modalVisible, setModalVisible, user}) => {
  const onClose = () => {
    setModalVisible(!modalVisible);
  };

  const [isInDemand, setIsInDemand] = useState(false);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const connexionRequestToSun = async () => {
    const validationResult = validateEmail(email);
    if (validationResult) {
      alert(validationResult);
      return; 
    }
    try {
      const response = await sendDataToDemandLinkToSun(user.userId, email);
      if(response.status === "success") {
        dispatch(linkToSUN('en attente'));
        setIsInDemand(true);
        setModalVisible(!modalVisible);
      } 
    }
     catch (error) {
      // comment bien géré l'erreu coté front si le mail n'est pas trouvé coté SUN
      console.error("Une erreur s'est produite, côté envoi demande de connexion :", error);
      // console.log('email non trouvé')      
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 10,
            }}>
            <Text style={{fontSize: 36, color: colors.color1}}>&times;</Text>
          </TouchableOpacity>
          <Image source={logoSun} style={styles.logoSUN} />
          <View style={styles.textContent}>
            <Text style={styles.textColor}>Demande de Connexion vers SUN </Text>
            <Text style={styles.textColor}>
              Renseigner votre email SUN ?
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text.toLowerCase())}             
              value={email}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.contentBtns}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{...styles.btn, backgroundColor: colors.color8}}>
              <Text style={styles.colorTextBtn}>Refuser</Text>
            </TouchableOpacity>
            {!isInDemand && (
              <TouchableOpacity
                onPress={() => {
                  connexionRequestToSun();
                }}
                style={styles.btn}>
                <Text style={styles.colorTextBtn}>Confirmer</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.contentBtns}>
            {isInDemand && (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setIsInDemand(false);
                  dispatch(cancelLink());
                }}
                style={{...styles.btn, backgroundColor: colors.color5}}>
                <Text style={styles.colorTextBtn}>Annuler demande</Text>
              </TouchableOpacity>
            )}
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
    height: 300,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default ModaleLinkToSUN;
