import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {styles} from '../styles/home';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import PokeSaumon from '../assets/PokeHall.jpg';
import FormuleSandwich from '../assets/Formule36.jpg';
import FormuleSalade from '../assets/Formule25.jpg';
import FormulePizza from '../assets/Formule2.jpg';
import FormuleWrap from '../assets/Formule32.jpg';
import FormulePainBagnat from '../assets/Formule28.jpg';
import FormuleBurger from '../assets/Formule27.jpg';
import FormuleCroque from '../assets/Formule16.jpg';
import FormulePanini from '../assets/Formule55.jpg';
import FormuleQuiche from '../assets/Formule22.jpg';
import FormulePlatsChauds from '../assets/formule_platschauds.jpg';

const FormulesSalees = () => {
  const navigation = useNavigation();

  const data = [
    {
      name: 'Sandwich',
      imageUri: FormuleSandwich,
      description: 'Un sandwich, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Sandwich',
          categorie: 'Sandwichs',
          imageUri: FormuleSandwich,
          text: 'Un Sandwich classique, avec une touche du Pain du Jour. Garnitures généreuses et pain frais pour une satisfaction garantie',
        }),
    },
    {
      name: 'Pain Bagnat',
      imageUri: FormulePainBagnat,
      description: 'Un pain bagnat, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Pain Bagnat',
          categorie: 'Pains Bagnat',
          imageUri: FormulePainBagnat,
          text: `Le Pain Bagnat du Pain du Jour, c'est la Méditerranée en sandwich. Simple, frais et délicieux.`,
        }),
    },
    {
      name: 'Salade',
      imageUri: FormuleSalade,
      description: 'Une salade, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Salade',
          categorie: 'Salades',
          imageUri: FormuleSalade,
          text: `Notre Salade est un choix léger et nutritif. Des légumes frais, une pointe d'assaisonnement, idéale pour une pause déjeuner.`,
        }),
    },
    {
      name: 'Burger',
      imageUri: FormuleBurger,
      description: 'Un burger, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Burger',
          categorie: 'Burgers',
          imageUri: FormuleBurger,
          text: `Un Burger gourmand avec une touche artisanale. Viande tendre, pain moelleux, pour les amateurs de classiques.`,
        }),
    },
    {
      name: 'Pizza',
      imageUri: FormulePizza,
      description: 'Une pizza, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Pizza',
          categorie: 'Pizzas',
          imageUri: FormulePizza,
          text: `Découvrez notre Pizza croustillante, garnie avec soin. Un plaisir simple à partager.`,
        }),
    },
    {
      name: 'Wrap',
      imageUri: FormuleWrap,
      description: 'Un wrap, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Wrap',
          categorie: 'Wraps',
          imageUri: FormuleWrap,
          text: `Notre Wrap est pratique et savoureux. Des ingrédients bien choisis pour un repas rapide.`,
        }),
    },
    {
      name: 'Croque',
      imageUri: FormuleCroque,
      description: 'Un croque, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Croque',
          categorie: 'Croques',
          imageUri: FormuleCroque,
          text: `Notre Croque est l'alliance parfaite du croustillant et du fondant. Idéal pour une petite faim.`,
        }),
    },
    {
      name: 'Poke Bowl',
      imageUri: PokeSaumon,
      description: 'Un Poke Bowl, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Poke Bowl',
          categorie: 'Poke Bowls',
          imageUri: PokeSaumon,
          text: `Notre Poke Bowl combine fraîcheur et équilibre. Des ingrédients simples et de qualité pour une pause déjeuner saine.`,
        }),
    },
    {
      name: 'Panini',
      imageUri: FormulePanini,
      description: 'Un panini, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Panini',
          categorie: 'Paninis',
          imageUri: FormulePanini,
          text: `Un Panini grillé, garnitures savoureuses. Le choix parfait pour une pause chaleureuse.`,
        }),
    },
    {
      name: 'Quiche',
      imageUri: FormuleQuiche,
      description: 'Une quiche, un dessert et une boisson',
      action: () =>
        navigation.navigate('formule', {
          name: 'Quiche',
          categorie: 'Quiches',
          imageUri: FormuleQuiche,
          text: `Nos Quiches sont une invitation à la simplicité. Pâte fine, garniture onctueuse, pour un repas sans chichi.`,
        }),
    },

    // {
    //     name: 'Pain Bagnat',
    //     imageUri: FormulePainBagnat,
    //     action: () => navigation.navigate('formulepainbagnat'),
    //     description: 'Un pain bagnat, un dessert et une boisson',
    //   },
    // {
    //     name: 'Salade',
    //     imageUri: FormuleSalade,
    //     action: () => navigation.navigate('formulesalade'),
    //     description: 'Une salade, un dessert et une boisson',
    //   },
    // {
    //     name: 'Burger',
    //     imageUri: FormuleBurger,
    //     action: () => navigation.navigate('formuleburger'),
    //     description: 'Un burger, un dessert et une boisson',
    //   },
    // {
    //     name: 'Pizza',
    //     imageUri: FormulePizza,
    //     action: () => navigation.navigate('formulepizza'),
    //     description: 'Une pizza, un dessert et une boisson',
    //   },
    // {
    //     name: 'Wrap',
    //     imageUri: FormuleWrap,
    //     action: () => navigation.navigate('formulewrap'),
    //     description: 'Un wrap, un dessert et une boisson',
    //   },
    // {
    //     name: 'Croque',
    //     imageUri: FormuleCroque,
    //     action: () => navigation.navigate('formulecroque'),
    //     description: 'Un croque, un dessert et une boisson',
    //   },
    // {
    //     name: 'Poke Bowl',
    //     imageUri: PokeSaumon,
    //     action: () => navigation.navigate('formulepoke'),
    //     description: 'Un Poke Bowl, un dessert et une boisson',
    //   },
    // {
    //     name: 'Panini',
    //     imageUri: FormulePanini,
    //     action: () => navigation.navigate('formulepanini'),
    //     description: 'Un panini, un dessert et une boisson',
    //   },
    // {
    //     name: 'Quiche',
    //     imageUri: FormuleQuiche,
    //     action: () => navigation.navigate('formulequiche'),
    //     description: 'Une quiche, un dessert et une boisson',
    //   },
    // { name: 'Sandwich', imageUri: FormuleSandwich, action: () => navigation.navigate('formulesandwich'), description: "Un sandwich, un dessert et une boisson" },
    // { name: 'Plat Chaud', imageUri: FormulePlatsChauds, action: () => navigation.navigate('formuleplatschauds'), description: "Un plat chaud, un dessert et une boisson" },
    // { name: 'Quiche', imageUri: 'https://cdn.lepaindujour.io/assets/Formule22.jpg', action: () => navigation.navigate('formulequiche'), description:"Une quiche, un dessert et une boisson" },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{marginRight: 10}}
      onPress={item.action}
      activeOpacity={0.8}>
      <FastImage
        style={{width: 315, height: 200}}
        source={
          typeof item.imageUri === 'string'
            ? {uri: item.imageUri, priority: FastImage.priority.high}
            : item.imageUri
        }
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.cardTitle}>
        <Text style={styles.titleFormule}>Formule {item.name}</Text>
        <Text style={styles.textFormule}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{marginLeft: 30, marginTop: 10}}>
      <Text style={styles.text1formule}>Notre sélection de</Text>
      <Text style={styles.text2formule}>
        snacks <Text style={styles.text1formule}>et </Text>formules
      </Text>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{marginVertical: 10}}
      />
    </View>
  );
};

export default FormulesSalees;
