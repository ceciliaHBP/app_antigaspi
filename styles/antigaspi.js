import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../styles/styles'

export const styleAntigaspi = StyleSheet.create({
    ViewTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
    titleProduct: {
      color: 'white',
      fontFamily: fonts.font1,
      fontSize: 24,
      width: '90%',
    },
    TouchArrow: {
      backgroundColor: 'black',
      borderRadius: 25,
    },
    container_texte: {
      paddingHorizontal: 30,
      paddingTop: 50,
    },
    container_familleProduct: {
      gap: 20,
      marginBottom: 100,
    },
    familleProduct: {
      marginLeft: 30,
      marginVertical: 10,
      color: colors.color1,
      fontFamily: fonts.font2,
      fontWeight: '700',
    },
    container_cards: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    colorText: {
      fontWeight: 'bold',
      color: colors.color1,
    },
  });