import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles} from '../styles/home'; 
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const FormulesSalees = () => {

    const navigation = useNavigation();

    const openFormuleSandwich = () => {
        navigation.navigate('formulesandwich')
    }
    const openFormulePoke = () => {
        navigation.navigate('formulepoke')
    }
    const openFormuleSalade = () => {
        navigation.navigate('formulesalade')
    }
    const openFormulePizzas = () => {
        navigation.navigate('formulepizza')
    }
    const openFormuleWraps = () => {
        navigation.navigate('formulewrap')
    }
    const openFormulePainBagnat = () => {
        navigation.navigate('formulepainbagnat')
    }
    const openFormuleBurger = () => {
        navigation.navigate('formuleburger')
    }
    const openFormuleCroque = () => {
        navigation.navigate('formulecroque')
    }
    const openFormulePanini = () => {
        navigation.navigate('formulepanini')
    }
    const openFormuleQuiche = () => {
        navigation.navigate('formulequiche')
    }
  
  return (
    <View style={{marginLeft:30, marginVertical:0}}>
              <Text style={styles.text1formule}>Notre sélection de</Text>
              <Text style={styles.text2formule}>snacks <Text style={styles.text1formule}>et </Text>formules</Text>
              
              <ScrollView horizontal={true} style={{marginVertical:10}}>

                {/* Poke Bowl */}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormulePoke} activeOpacity={0.8}>
                    {/* <Image
                            // source={require('../assets/PokeSaumon.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/PokeSaumon.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            /> */}
                            <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{uri:'https://cdn.lepaindujour.io/assets/PokeSaumon.jpg',
                                priority: FastImage.priority.high,
                            }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                   <Image
                            source={require('../assets/halles_solanid.jpg')} 
                            style={styles.pastilleSolanid}
                            />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Poké Bowl</Text>
                        <Text style={styles.textFormule}>Une salade, un dessert et une boisson</Text>
                    </View>
                    
                </TouchableOpacity>

                {/* Sandwich */}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleSandwich} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule36.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule36.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                 {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule36.jpg`,
                                priority: FastImage.priority.high,
                            }}
                    resizeMode={FastImage.resizeMode.cover}
                /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Sandwich</Text>
                        <Text style={styles.textFormule}>Un sandwich, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* Salades*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleSalade} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule25.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule25.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule25.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                            
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Salade</Text>
                        <Text style={styles.textFormule}>Une salade, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>
                    
                {/* Pizzas*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormulePizzas} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule2.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule2.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule2.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Pizza</Text>
                        <Text style={styles.textFormule}>Une pizza, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* Wraps*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleWraps} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule32.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule32.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule32.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Wrap</Text>
                        <Text style={styles.textFormule}>Un wrap, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* Pains Bagnats*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormulePainBagnat} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule28.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule28.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule28.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Pain Bagnat</Text>
                        <Text style={styles.textFormule}>Un pain bagnat, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* Burgers*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleBurger} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule27.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule27.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule27.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Burger</Text>
                        <Text style={styles.textFormule}>Un burger, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* croques*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleCroque} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule16.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule16.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule16.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Croque</Text>
                        <Text style={styles.textFormule}>Un croque, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* paninis*/}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormulePanini} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule55.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule55.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule55.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Panini</Text>
                        <Text style={styles.textFormule}>Un panini, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

                {/* quiches */}
                <TouchableOpacity style={{marginRight:10}} onPress={openFormuleQuiche} activeOpacity={0.8}>
                    <Image
                            // source={require('../assets/Formule22.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/Formule22.jpg'}}
                            style={{ width: 315, height: 200, resizeMode:'cover' }}
                            />
                    {/* <FastImage
                            style={{ width: 315, height: 200,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule22.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule}>Formule Quiche</Text>
                        <Text style={styles.textFormule}>Un panini, un dessert et une boisson</Text>
                    </View>
                </TouchableOpacity>

              </ScrollView>
          </View>
  )
}

export default FormulesSalees