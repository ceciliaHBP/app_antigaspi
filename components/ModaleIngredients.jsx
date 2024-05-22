import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts, colors} from '../styles/styles'

const ModaleIngredients = ({ modalVisibleIngredients, setModalVisibleIngredients, product, allergenes }) => {

    const onClose = () => {
        setModalVisibleIngredients(!modalVisibleIngredients);
    }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleIngredients}
      onRequestClose={() => {
        setModalVisibleIngredients(!modalVisibleIngredients);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} style={{ alignItems: 'center', position:'absolute', top:0, right:10}}>
                <Text style={{ fontSize: 36, color:colors.color1}}>&times;</Text>
        </TouchableOpacity>
         <View style={{flexDirection:'colum', alignItems:'center', gap:10}}>
            <Text style={styles.title}>Liste d'ingrédients</Text>
            <Text style={styles.liste}>{product}</Text>
            {
              allergenes && 
              <View style={{flexDirection:'colum', alignItems:'center', gap:10}}>
                <Text style={styles.title}>Allergènes</Text>
                <Text style={styles.liste}>{allergenes}</Text>
              </View>
            }
            
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: colors.color6,
    padding: 20,
    borderRadius: 10,
    width: '85%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color:colors.color2,
    fontFamily:fonts.font2,
    fontSize:18,
    fontWeight:"700"
  },
  liste:{
    color:colors.color1,
    textTransform: 'capitalize'
  }
});

export default ModaleIngredients;
