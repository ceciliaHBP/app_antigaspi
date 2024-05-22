import {StyleSheet} from 'react-native';
import {colors, fonts} from '../styles/styles';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  badge_container: {
    position: 'relative',
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: 0,
  },
  // image_container:{
  //     width:'100%',
  //     height:'50%'
  // },
  details: {
    margin: 30,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 10,
    // marginVertical:10,
  },
  qtyText: {
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
    borderRadius: 5,
  },
  titleProduct: {
    color: 'white',
    fontFamily: fonts.font1,
    fontSize: 24,
    width: '80%',
    fontWeight: 'bold',
  },
  prixSun: {
    color: colors.color2,
    fontWeight: 'bold',
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    paddingHorizontal: 30,
  },
  contentLibelle: {
    backgroundColor: colors.color6,
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export {styles};
