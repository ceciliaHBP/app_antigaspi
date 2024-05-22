import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/styles'

export const styles = StyleSheet.create({
    titleProduct:{
        color:'white',
        fontFamily:fonts.font1,
        fontSize:24,
        position:'absolute',
        top:30,
        left:20,
        fontWeight:'bold'
    },
    titleOptions:{
        fontSize:20,
        fontWeight: "600",
        fontFamily:fonts.font2,
        color:colors.color1, 
    },
    descriptionProduit:{
      marginHorizontal:10,
      color:colors.color1
    },
    imageOptions:{
        width: 128, 
        height: 88, 
        borderRadius:6
    },
    libelle:{
        fontSize:12,
        fontFamily: fonts.font2,
        fontWeight: "400",
        paddingVertical:10, 
        color:colors.color1,
        marginLeft:10,
    },
    sousTexte:{
        // fontFamily:fonts.font2,
        fontSize:14,
        fontWeight: "400"
    },
    ingredients:{
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
        marginVertical:10,
        marginBottom:20
    },
    listeIngredients:{
        fontSize:13,
        fontFamily:fonts.font2,
        color:colors.color1
    },
    description:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        backgroundColor:'white',
        width:"85%",
        paddingHorizontal:19,
        paddingVertical:5,
        height:60,
        borderRadius:10,
        marginBottom:10
    },
    qtyContainer:{
      flexDirection:'row',
      gap:5
    },
    decrement:{
      backgroundColor:colors.color3,
      flexDirection:'row',
      alignItems:'center'
    },
    qtyText:{
      backgroundColor:colors.color3,
      paddingHorizontal: 5
    },
    increment:{
      backgroundColor:colors.color2,
      flexDirection:'row',
      alignItems:'center'
    },
    bandeau:{
      backgroundColor:colors.color6,
      paddingVertical:10
    },
    textBandeau:{
      paddingLeft:30,
      fontFamily:fonts.font3,
      fontWeight: "600",
      fontSize:20,
      color:colors.color1
    },
    titleFormule: {
      color:colors.color2,
      fontSize:20,
      fontWeight: "bold",
     },
     textFormule:{
       color:colors.color1,
       fontSize:14,
       fontWeight: "500",
       width:250
     },
     cardTitle:{
       backgroundColor:'white',
       height:57,
       borderBottomLeftRadius:10,
       borderBottomRightRadius:10,
       justifyContent:'center',
       paddingHorizontal:10
     },
     texteFormule:{
      fontSize:14,
      fontWeight: "700",
      fontFamily:fonts.font2,
      color:colors.color1
     },
     container_gray:{
      backgroundColor:'lightgray',
      width:30, height:25,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    touchable:{
      backgroundColor:'lightgray',
      paddingVertical:10, paddingHorizontal:20,
      borderRadius:20
    }
  });  