// ProductFlatList.js
import React from 'react';
import { FlatList, View, TouchableOpacity , Text} from 'react-native';
import ProductCard from '../components/ProductCard';
import { styles } from '../styles/home'; 

const ProductFlatList = ({ category, products, handleProductPress }) => {
  
  return (
    <View>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        initialNumToRender={2}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollHorizontal}
        data={products}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.productContainer}>
            <TouchableOpacity
              onPress={() => handleProductPress(item)}
              activeOpacity={1}
            >
              <ProductCard
                libelle={item.libelle}
                id={item.productId}
                index={index}
                image={item.image}
                prix={item.prix_unitaire}
                prixSUN={item.prix_remise_collaborateur}
                qty={item.qty}
                stock={item.stock}
                offre={item.offre}
                showPromo={false}
                showButtons={true}
                ingredients={item.ingredients}
                allergenes={item.allergenes}
                category={item.categorie}
                type_produit={item.type_produit}
                type={item.type}
                item={item}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(ProductFlatList);
