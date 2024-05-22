import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { colors, fonts } from '../styles/styles'

 const LoaderHome = () => {
  const rotateValue = useRef(new Animated.Value(0)).current; // Initial value for rotation: 0

  useEffect(() => {
    // Configuration de l'animation
    Animated.loop(
      Animated.timing(
        rotateValue,
        {
          toValue: 1,  // 1 cycle complet
          duration: 5000, // durée de l'animation en ms
          useNativeDriver: true, // Utilise le pilote natif pour de meilleures performances
        }
      )
    ).start();
  }, []);

  // Convertir la valeur de rotation en une transformation de rotation en degrés
  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

   return (
    <View style={style.container}>
      <Animated.Image
        source={require("../assets/logo_pdj.png")} // Remplacez 'logo_pdj' par le nom de votre image
        style={{ 
          width: 240, 
          height: 240, 
          resizeMode: "contain",
          transform: [{ rotate: rotation }]  // Applique la transformation de rotation ici
        }}
      />
     </View>

   );
 }

const style = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.color1,
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

 export default LoaderHome;
