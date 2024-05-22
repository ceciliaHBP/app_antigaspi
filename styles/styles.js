import { StyleSheet, Platform, StatusBar } from "react-native";

export const defaultStyle = StyleSheet.create({
    //padding: 5,
    // paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    
    
});

export const inputStyling = StyleSheet.create({
    height: Platform.OS === 'android' ? 50 : 40, 
    marginVertical: 5,
    backgroundColor:"white",
    width:"100%"
    
  });

export const colors = {
    color1: "#273545", //bleu pain du jour
    color2: "#E9520E", // orange
    color3: "#D9D9D9", //gris clair
    color4: "#ECECEC", //blanc cassé
    color5: "#636C77", //bleu grisé
    color6:"#FFFFFF", //blanc
    color7:"#000000", //noir
    color8:"#BF2D2D", //rouge
    color9:"#34AA55", //vert
};

export const fonts = {
    font1: "Postino Italic",
    font2:"Montserrat Medium",
    font3:"Monserrat Bold"
   
};