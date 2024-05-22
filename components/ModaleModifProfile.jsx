import React, {useRef} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../styles/styles';
import {Update} from '../SVG/Update';
import {useNavigation} from '@react-navigation/native';

const ModaleModifProfile = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();

  const handleOpenProfile = () => {
    navigation.navigate('profile', {scrollToSection: 'section'});
    setModalVisible(!modalVisible);
  };
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
          <Update />
          <View style={styles.textContent}>
            <Text style={styles.textColor}>
              Choisis une option en cas d'absence d'un produit dans ta
              commande{' '}
            </Text>
            <Text style={styles.textColor}> </Text>
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
                handleOpenProfile();
                setModalVisible(!modalVisible);
              }}
              style={styles.btn}>
              <Text style={styles.colorTextBtn}>Modifier</Text>
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
  },
  modalContent: {
    backgroundColor: colors.color6,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.color1, 
    shadowOffset: {
      width: 1, 
      height: 3, 
    },
    shadowOpacity: 0.40, 
    shadowRadius: 4, 

    elevation: 5,
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

export default ModaleModifProfile;
