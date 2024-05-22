import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { colors, fonts} from '../styles/styles'
import Close from '../SVG/Close';


const ModaleFormulePetitdej = ({ modalVisible, setModalVisible}) => {

    const onClose = () => {
        setModalVisible(false);
    }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
      
        <View style={styles.modalContent}>
       

        <View style={{flexDirection:'column', gap: 10}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{ fontFamily:fonts.font1, color: colors.color8 }}>Les petits déjeuners sont indisponibles</Text>
                <TouchableOpacity onPress={onClose} >
                    <Text style={{ fontSize: 30, marginBottom:15, color:colors.color1}}>&times;</Text>
                 </TouchableOpacity>
            </View>
           
            <View style={{ backgroundColor:colors.color6, padding: 10, borderRadius:10}}>
                <Text style={{ textAlign: 'left', color:colors.color1}}>Nous vous remercions de votre compréhension mais à ce jour les petits déjeuners ne sont pas 
                accessibles sur l’application.</Text>
            </View>
           
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: colors.color4,
    padding: 10,
    borderRadius: 10,
    width: '85%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModaleFormulePetitdej;
