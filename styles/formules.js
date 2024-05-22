import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/styles'

const style = StyleSheet.create({
    title:{
        fontFamily:fonts.font1,
        fontSize:20,
        paddingBottom:10,
        color:colors.color1,
        fontWeight:'bold'
    },
    descriptionFormule:{
      color:colors.color1
    },
    contentTitleFormule: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      top: 30,
      paddingHorizontal: 30,
    },
    choixTitle:{
        textAlign:'center',
        fontSize:20,
        padding:10,
        backgroundColor:colors.color3,
        color:colors.color1
    },
    contentChoixTitle: {
      textAlign:'center',
      fontSize:20,
      padding:10,
      backgroundColor:colors.color3,
      color:colors.color1,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollProduct:{
        height:280,
        paddingHorizontal:20
    },
    sandwichImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
    },
    menu:{
      // flex:1, 
        height:80,
        backgroundColor: colors.color6,
        padding: 10,
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.6, 
        shadowOffset: { width: 0, height: 1 }, 
        shadowRadius: 2, 
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        // marginBottom:65,
        width:"100%",
    },
    androidMenu:{
      height:80,
    },
    codePromo:{
      // flex:1, 
        height:80,
        backgroundColor: colors.color6,
        padding: 10,
        marginBottom:-5,
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.6, 
        shadowOffset: { width: 0, height: 1 }, 
        shadowRadius: 2, 
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        // marginBottom:65,
        width:"100%"
    },
    codePromoAndroid:{
      height:80,
    },
    disabledCheckBox: {
      opacity: 0.2, 
    },
    btn:{
      backgroundColor:colors.color2,
      height:40,
      width:160,
      borderRadius:5,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      // paddingHorizontal:10,
      // textAlign:'center'
    },
    disabledBtn:{
      backgroundColor:colors.color3,
    },
    bandeauFormule:{
      flexDirection:'row', 
      width:180, 
      justifyContent:'space-between',
    },
   
    checkButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    checkInnerCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.color1,
    },

    //page produit
    texte_page_produit:{
      color:colors.color1,
      fontSize:15,
      fontFamily:fonts.font2,
      fontWeight: "400"
    },
    titleProduct:{ 
      color: "white",
      fontFamily:fonts.font1,
      fontSize:24,
      width:"85%",
      fontWeight:'bold'
    },
    btnPaiement:{
      backgroundColor:colors.color9,
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:5,
      width:130,
      height:35
    },
    pastilleContent:{
      position: 'absolute',
      bottom: 200,  
      right: 20,  
      width: 40,
      height: 40,
      backgroundColor: 'red', 
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentGlobal: {
      justifyContent: 'center', 
      alignItems: 'center', 
      marginBottom:15
    }, 
    contentCountDown: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: colors.color2,
      width: 180,
      height: 25,
      borderRadius:5
    },
    countDown:{
      color:colors.color6,
      fontSize:12,
    },
    contentProductCardFormule: {
      gap: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    }
  }
)

export { style };