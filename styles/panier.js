import {StyleSheet} from 'react-native';
import {colors, fonts} from '../styles/styles';

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.color4,
  },
  contentSafeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.color4,
  },
  lottieJson: {
    width: 300,
    aspectRatio: 300 / 600,
    flexGrow: 1,
    alignSelf: 'center',
  },
  headerCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    width: '100%',
  },
  contentHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: fonts.font1,
    color: colors.color1,
  },
  contentPickers: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  contentTotalMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.color1,
  },
  orangeBoldText: {
    color: colors.color2,
    fontWeight: 'bold',
  },
  whiteBoldText: {
    color: colors.color6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentTotalPrice: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  buttonOnline: {
    backgroundColor: colors.color9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 130,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export {styles};
