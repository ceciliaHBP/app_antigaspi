import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {fonts, colors} from '../styles/styles';
import Svg, {Path} from 'react-native-svg';

const CartItem = ({
  libelle,
  prix,
  incrementhandler,
  decrementhandler,
  image,
  qty,
  prix_unitaire,
  isFree,
  freeCount,
  removehandler,
  type,
  item,
  qtyPaid,
  qtyFree,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text numberOfLines={3} style={styles.titleLibelle}>
          {libelle}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={decrementhandler}
            style={styles.container_gray}>
            <Svg width={7} height={4} viewBox="0 0 7 4">
              <Path
                d="M0.666748 3.8V0.733337H6.80008V3.8H0.666748Z"
                fill="#273545"
              />
            </Svg>
          </TouchableOpacity>

          <View style={styles.container_gray}>
            <Text style={styles.qty}>{qty}</Text>
          </View>

          <TouchableOpacity
            onPress={incrementhandler}
            style={{...styles.container_gray, backgroundColor: colors.color2}}>
            <Svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M10 4.05197V6.48141H6.63702V9.86669H4.14375V6.48141H0.800049V4.05197H4.14375V0.666687H6.63702V4.05197H10Z"
                fill="#ECECEC"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={removehandler}
            style={{...styles.container_gray, backgroundColor: 'transparent'}}>
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
        {qtyFree > 0 && (
          <Text style={{color: colors.color1, fontWeight: 'bold'}}>
            {qtyFree}x Promotion 3+1
          </Text>
        )}
     

        <View style={styles.content}>
        <Text numberOfLines={2} style={styles.details}>
            {qtyPaid}x {libelle}
          </Text>
          <Text style={styles.price}>
            {' '}
            {qtyPaid}x {item.unitPrice}€
            
          </Text>
        </View>

        <View style={styles.content}>
          {
            (qtyFree > 0 && (
              <>
                <Text style={{...styles.details, color: colors.color9}}>
                  {`${qtyFree} x ${libelle}`}
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
    padding: 10,
    width: 340,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
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
});

export default CartItem;
