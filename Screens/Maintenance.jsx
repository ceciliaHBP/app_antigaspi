import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../styles/styles';

const Maintenance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maintenance en Cours</Text>
      <Text style={styles.text}>Nous améliorons actuellement votre expérience sur l'application "Le Pain du Jour Click and Collect".</Text>
      <Text style={styles.text}>Merci pour votre patience et votre compréhension.</Text>
      <Text style={styles.footer}>L'équipe du Pain du Jour</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.color1,
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.color3,
        marginBottom: 15,
    },
    text: {
        color: colors.color3,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    footer: {
        color: colors.color3,
        fontSize: 14,
        marginTop: 20,
        fontStyle: 'italic',
    }
});

export default Maintenance;
