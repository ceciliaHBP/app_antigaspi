import {StyleSheet} from 'react-native';
import {colors, fonts} from '../styles/styles';

const style = StyleSheet.create({
  btn: {
    backgroundColor: colors.color2,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  back: {
    backgroundColor: colors.color1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnReorder: {
    backgroundColor: colors.color2,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    textDecorationColor: colors.color5,
    color: colors.color5,
  },
  newPrice: {
    color: colors.color2,
    fontWeight: 'bold',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 0,
  },
  orderFormule: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPrices: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  text: {
    color: colors.color1,
  },
  textWidth: {
    width: '70%',
    flexWrap: 'wrap',
    color: colors.color1,
  },
  title: {
    color: colors.color1,
    fontWeight: 'bold',
  },
  optionFormule: {
    color: colors.color9,
  },
  optionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:10,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  oldOrderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  backOldOrder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: colors.color6,
    marginVertical: 5,
  },
  contentOlderOder: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 20,
    height: 70,
  },
  textTicker: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.color4,
    paddingHorizontal: 10,
    width: 125,
  },
  flexStart: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  underlineText: {
    color: colors.color5,
    fontSize: 10,
    textTransform: 'capitalize',
  },
  detailsArticles: {
    color: colors.color5,
    fontSize: 10,
  },
  backArrow: {
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
  },
  expandedOrders: {
    flex: 1,
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  lastOrderTitle: {
    paddingLeft: 30,
    marginVertical: 20,
    fontFamily: fonts.font3,
    fontWeight: '600',
    color: colors.color1,
    fontSize: 16,
  },
  storeTitle: {
    color: colors.color1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsOrderTitle: {
    marginVertical: 10,
    color: colors.color2,
    fontFamily: fonts.font2,
    fontWeight: '700',
  },
  lastOrderView: {
    backgroundColor: colors.color6,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageNumber: {
    marginHorizontal: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.color1,
    borderRadius: 5,
  },
  pageNumberText: {
    color: colors.color1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  activePageNumber: {
    backgroundColor: colors.color1,
  },
  activePageNumberText: {
    color: '#fff',
  },
  noOrders: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    borderRadius: 20,
  },
  titlePageNoOrders: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.font1,
  },
  contentTitlePageNoOrders: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
    marginVertical: 30,
  },
  viewContentTitlePageNoOrder: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.color3,
  },
  titlePage: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.font1,
    color: colors.color1,
  },
  contentTitlePage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  viewContentTitlePage: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.color4,
  },
});

export {style};
