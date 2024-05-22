import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../styles/styles';
import logopdj from '../assets/LOGO_PDJ_COLOR.png';

const ModalePizza = ({modalVisible, setModalVisible}) => {
  const handleClose = () => {
    setModalVisible(!modalVisible);
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
          <TouchableOpacity
            onPress={handleClose}
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 10,
              zIndex: 99,
            }}>
            <Text style={styles.close}>&times;</Text>
          </TouchableOpacity>
          <Image source={logopdj} style={styles.logoPDJ} />
          <View style={styles.textContent}>
            <Text style={styles.textColor}>Pensez à appeler le</Text>
            <Text style={ styles.textColor2}>Pain du Jour Mas Guérido</Text>
            <Text style={styles.textColor}>au <Text style={ styles.textColor3}>04 68 84 46 01</Text></Text>
            <Text style={styles.textColor}>pour vos commandes spécifiques</Text>
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
    gap:5,
  },
  textColor: {
    textAlign: 'center',
    color: colors.color1,
    fontSize: 16,
  },
  textColor2:{
    textAlign: 'center',
    fontWeight:'bold',
    color: colors.color2,
  },
  textColor3:{
    textAlign: 'center',
    fontWeight:'bold',
    color: colors.color1,
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
  logoPDJ: {
    width: 40,
    height: 40,
  },
  close:{
    fontSize: 36, 
    color:colors.color1
  }
});

export default ModalePizza;
