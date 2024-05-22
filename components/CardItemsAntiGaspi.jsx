import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fonts, colors} from '../styles/styles';
import Svg, {Path} from 'react-native-svg';
import {API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS} from '@env';
import {AntiGaspi} from '../SVG/AntiGaspi';

const CartItemAntigaspi = ({
  libelle,
  prix,
  item,
  qty,
  prix_unitaire,
  isFree,
  freeCount,
  removehandler,
}) => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: `${API_BASE_URL}/${image}` }} style={styles.image} 
    //   onPress={() => navigate.navigate("productdetails", { id })}
    /> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <AntiGaspi /> */}
        <Text numberOfLines={3} style={styles.titleLibelle}>
          {libelle}
        </Text>
        <View style={styles.actions}>
          <View style={styles.container_gray}>
            <Text style={styles.qty}>{qty}</Text>
          </View>

          <TouchableOpacity
            onPress={removehandler}
            style={{...styles.container_gray, backgroundColor: 'transparent'}}>
            {/* <Icon name="add-circle" size={25} color="#000" /> */}
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1216 1312">
              <Path
                fill="lightgray"
                d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68z"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginVertical: 10}}>
        <View style={styles.content}>
          <View style={styles.pastilleLibelle}>
            <AntiGaspi color={colors.color8} />
            <Text numberOfLines={2} style={styles.details}>
              {qty}x {libelle}
            </Text>
          </View>

          <Text style={styles.price}>
            {qty} x {item.unitPrice}€
          </Text>
        </View>

        <View style={styles.content}>
          {
            (isFree = 'true' && freeCount > 0 && (
              <>
                <Text style={{...styles.details, color: colors.color9}}>
                  {`${freeCount} x ${libelle}`}
                </Text>
                <Text style={{color: colors.color9}}>+0€</Text>
              </>
            ))
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding:10,
    width: 340,
    borderRadius:5,
    marginVertical:5,
    backgroundColor: 'white'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    // marginLeft:10
  },
  title: {
    fontSize: 16,
    // marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  qty: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.color1,
    textAlign: 'center',
  },
  container_gray: {
    backgroundColor: 'lightgray',
    width: 30,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLibelle: {
    color: colors.color2,
    fontFamily: fonts.font2,
    fontWeight: '700',
    width: 170,
  },
  details: {
    fontSize: 12,
    color: colors.color1,
  },
  pastilleLibelle:{
    flexDirection:'row',
    alignItems:'center',
    gap: 10
  }
});


export default CartItemAntigaspi;

