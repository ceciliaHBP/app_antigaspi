import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/styles'

export const stylesInvite = StyleSheet.create({
    btn:{
        backgroundColor:colors.color9, 
        paddingVertical:8, 
        paddingHorizontal:10,
        borderRadius:5,
        flexDirection:'row',
        gap:5,
        alignItems:'center',
        justifyContent:'center'
      },
      textBtn:{
        color:colors.color6,
        fontFamily:fonts.font2,
        fontWeight:"700",
        fontSize:14
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
        
      },
      modalContent: {
        backgroundColor: colors.color1,
        padding: 10,
        borderRadius: 20,
        width: '95%',
        height: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:colors.color3,
        borderWidth:1
      },
      btn_cookies: {
        backgroundColor: colors.color4,
        margin: 1,
        borderRadius:6,
        borderColor:colors.color5,
        borderWidth:1,
        borderStyle:'solid',
        flexDirection:'row', 
        alignItems:'center',
        gap:15, 
        paddingHorizontal:20,
        paddingVertical:10,
      },
      label:{
        fontWeight:"bold",
         color:colors.color1,
         paddingVertical:5
       },
  });  