import React, { useState } from 'react';
import { Modal, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { styles } from '../styles/home'; 
import { fonts, colors} from '../styles/styles'


const SearchModal = ({ isVisible, products, onSelectProduct, onClose }) => {
    const [localQuery, setLocalQuery] = useState(''); // État pour la recherche locale
    const [inputValue, setInputValue] = useState('');

    const handleLocalSearch = (query) => {
     
        setInputValue(query); // Toujours mettre à jour la valeur de l'input

    if (query.length >= 2) {
        setLocalQuery(query);
    } else {
        setLocalQuery('');  // Si moins de 2 caractères, on réinitialise la recherche.
    }
        
    };

    const filteredProducts = localQuery 
        ? products.filter(product =>
            product.libelle ? product.libelle.toLowerCase().includes(localQuery.toLowerCase()) : false
          )
        : [];


    const handleCloseModal = () => {
        onClose();
        setInputValue('');  // Réinitialisez la valeur de l'input
        setLocalQuery('');  // Réinitialisez la requête de recherche
    };
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={onClose}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={modalStyle}>
                 {filteredProducts.length === 0 && localQuery && (
                    <Text>Pas de produit trouvé</Text>
                )}
               
                <SearchBar
                        placeholder="Rechercher un produit..."
                        onChangeText={handleLocalSearch}
                        value={inputValue}
                        containerStyle={styles.searchBarContainer}
                        inputContainerStyle={styles.searchBarInputContainer}
                        inputStyle={{fontSize:12,}}
                        placeholderTextColor={colors.color2}
                        searchIcon={{ size: 20, color: colors.color2, margin:0 }} 
                        />
                { localQuery && (
                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id ? item.id.toString() : `fallback-${Math.random()}`}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => onSelectProduct(item)}>
                        <View style={{backgroundColor:colors.color3, padding:10, borderRadius:5, marginVertical:5}}>
                            <Text>{item.libelle}</Text>
                        </View>
                        
                      </TouchableOpacity>
                    )}
                  />
                )}
              <TouchableOpacity onPress={handleCloseModal} style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={{color:colors.color1}}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
}

const modalStyle = {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position:'absolute',
    top:100, 
    right:40,
    // Ombre pour iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // Ombre pour Android
    elevation: 5,
  };

export default SearchModal;
