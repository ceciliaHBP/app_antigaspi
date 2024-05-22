import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet, TouchableOpacity, Image} from 'react-native';
import logoSun from '../assets/logoSUNPremium.jpg'
import { colors } from '../styles/styles';

const PulseAnimation = ({onPress}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.spring(pulseAnim, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
    ).start();
  }, [pulseAnim]);

  return (
    <TouchableOpacity style={{position:'relative', width:"100%"}} onPressIn={onPress} >
    <Animated.View
      style={{
        ...styles.pastilleContent,
        transform: [{scale: pulseAnim}],
      }}>
       <Image
                source={logoSun}
                style={styles.logoSUN}
              />
    </Animated.View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pastilleContent: {
     position: 'absolute',
     bottom: 90,
     right: 10,
     width: 50,
     height: 50,
    backgroundColor: 'white',
     borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:colors.color2,
    borderWidth:1
  },
  logoSUN:{
    width:30,
    height:30
  }
});

export default PulseAnimation;
