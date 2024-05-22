import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from '../styles/home';
import {useNavigation} from '@react-navigation/native';
import Sandwich from '../assets/sandwich.jpg';
import Pizza from '../assets/pizza.jpg';
import Wrap from '../assets/wrap.jpg';
import Salade from '../assets/salade.jpg';
import Burger from '../assets/burger.jpg';
import Panini from '../assets/panini.jpg';
import PainBagnat from '../assets/painbagnat.jpg';
import Quiche from '../assets/quiche.jpg';
import Croque from '../assets/croque.jpg';

import FormuleSandwich from '../assets/Formule36.jpg';
import FormulePizza from '../assets/Formule2.jpg';
import FormuleWrap from '../assets/Formule32.jpg';
import FormuleSalade from '../assets/Formule25.jpg';
import FormuleBurger from '../assets/Formule27.jpg';
import FormulePanini from '../assets/Formule55.jpg';
import FormulePainBagnat from '../assets/Formule28.jpg';
import FormuleQuiche from '../assets/Formule22.jpg';
import FormuleCroque from '../assets/Formule16.jpg';


const EnvieSalee = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: 'Sandwichs',
      image: Sandwich,
      style: {width: 200, height: 244},
      onPress: () =>
        navigation.navigate('enviesalee', {
          name: 'Sandwich',
          imageUri: Sandwich,
          categorie: 'Sandwichs',
          formule: 'formule',
          image: FormuleSandwich,
          description: 'Un sandwich, un dessert et une boisson',
          text: 'Un Sandwich classique, avec une touche du Pain du Jour. Garnitures généreuses et pain frais pour une satisfaction garantie',
        }),
    },
    {
      title: ['Pizzas', 'Wraps'],
      image: [Pizza, Wrap],
      style: [
        {width: 200, height: 80},
        {width: 200, height: 80},
      ],
      onPress: [
        () =>
          navigation.navigate('enviesalee', {
            name: 'Pizza',
            imageUri: Pizza,
            categorie: 'Pizzas',
            formule: 'formule',
            image: FormulePizza,
            description: 'Une pizza, un dessert et une boisson',
            text: `Découvrez notre Pizza croustillante, garnie avec soin. Un plaisir simple à partager.`,
          }),
        () =>
          navigation.navigate('enviesalee', {
            name: 'Wrap',
            imageUri: Wrap,
            categorie: 'Wraps',
            formule: 'formule',
            image: FormuleWrap,
            description: 'Un wrap, un dessert et une boisson',
            text: `Notre Wrap est pratique et savoureux. Des ingrédients bien choisis pour un repas rapide.`,
          }),
      ],
    },
    {
        title: 'Salades',
        image: Salade,
        style: {width: 200, height: 244},
        onPress: () =>
          navigation.navigate('enviesalee', {
            name: 'Salade',
            imageUri: Salade,
            categorie: 'Salades',
            formule: 'formule',
            image: FormuleSalade,
            description: 'Une salade, un dessert et une boisson',
            text: `Notre Salade est un choix léger et nutritif. Des légumes frais, une pointe d'assaisonnement, idéale pour une pause déjeuner.`,
          }),
    },  
    {
        title: ['Burgers', 'Paninis'],
        image: [Burger, Panini],
        style: [
          {width: 200, height: 80},
          {width: 200, height: 80},
        ],
        onPress: [
          () =>
            navigation.navigate('enviesalee', {
              name: 'Burger',
              imageUri: Burger,
              categorie: 'Burgers',
              formule: 'formule',
              image: FormuleBurger,
              description: 'Un burger, un dessert et une boisson',
              text: `Un Burger gourmand avec une touche artisanale. Viande tendre, pain moelleux, pour les amateurs de classiques.`,
            }),
          () =>
            navigation.navigate('enviesalee', {
              name: 'Panini',
              imageUri: Panini,
              categorie: 'Paninis',
              formule: 'formule',
              image: FormulePanini,
              description: 'Un panini, un dessert et une boisson',
              text: `Un Panini grillé, garnitures savoureuses. Le choix parfait pour une pause chaleureuse.`,
            }),
        ],
      },
    {
        title: 'Pains Bagnats',
        image: PainBagnat,
        style: {width: 200, height: 244},
        onPress: () =>
          navigation.navigate('enviesalee', {
            name: 'Pain Bagnat',
            imageUri: PainBagnat,
            categorie: 'Pains Bagnat',
            formule: 'formule',
            image: FormulePainBagnat,
            description: 'Un pain bagnat, un dessert et une boisson',
            text: `Le Pain Bagnat du Pain du Jour, c'est la Méditerranée en sandwich. Simple, frais et délicieux.`,
          }),
      },
    {
        title: ['Quiches', 'Croques'],
        image: [Quiche, Croque],
        style: [
          {width: 200, height: 80},
          {width: 200, height: 80},
        ],
        onPress: [
          () =>
            navigation.navigate('enviesalee', {
              name: 'Quiche',
              imageUri: Quiche,
              categorie: 'Quiches',
              formule: 'formule',
              image: FormuleQuiche,
              description: 'Une quiche, un dessert et une boisson',
              text: `Nos Quiches sont une invitation à la simplicité. Pâte fine, garniture onctueuse, pour un repas sans chichi.`,
            }),
          () =>
            navigation.navigate('enviesalee', {
              name: 'Croque',
              imageUri: Croque,
              categorie: 'Croques',
              formule: 'formule',
              image: FormuleCroque,
              description: 'Un croque, un dessert et une boisson',
              text: `Notre Croque est l'alliance parfaite du croustillant et du fondant. Idéal pour une petite faim.`,
            }),
        ],
      },
    // {
    //     title: "Plats Chauds",
    //     onPress: () => navigation.navigate('platchaud'),
    //     image: require('../assets/test_plat.jpg'),
    //     style: { width: 200, height: 244 }
    // },
  ];

  return (
    <View style={{marginLeft: 30, marginTop: 20}}>
      <Text style={styles.text1formule}>
        Une petite envie <Text style={styles.text2formule}>Salée ? </Text>
      </Text>

      <FlatList
        horizontal
        data={data}
        renderItem={({item}) => {
          if (Array.isArray(item.title)) {
            return (
              <View style={{flexDirection: 'column', marginRight: 10}}>
                {item.title.map((title, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={item.onPress[index]}
                    style={{marginBottom: 15}}>
                    <FastImage
                      source={item.image[index]}
                      style={item.style[index]}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                      <Text style={styles.titleFormule_envie}>{title}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          } else {
            return (
              <TouchableOpacity
                style={{marginRight: 10}}
                activeOpacity={0.8}
                onPress={item.onPress}>
                <FastImage
                  source={item.image}
                  style={item.style}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.cardTitle}>
                  <Text style={styles.titleFormule_envie}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default EnvieSalee;
