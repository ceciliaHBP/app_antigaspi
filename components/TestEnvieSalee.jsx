import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles} from '../styles/home'; 
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const TestEnvieSalee = () => {

    const navigation = useNavigation();

    const openPageSandwich = () => {
        navigation.navigate('sandwich')
    }
    const openPagePizza = () => {
        navigation.navigate('pizza')
    }
    const openPageWrap = () => {
        navigation.navigate('wrap')
    }
    const openPageSalade = () => {
        navigation.navigate('salade')
    }
    const openPageBurger = () => {
        navigation.navigate('burger')
    }
    const openPagePanini = () => {
        navigation.navigate('panini')
    }
    const openPagePainBagnat = () => {
        navigation.navigate('painbagnat')
    }
    const openPageQuiche = () => {
        navigation.navigate('quiche')
    }
    const openPageCroque = () => {
        navigation.navigate('croque')
    }
  return (
    <View style={{marginLeft:30, marginTop:10}}>
        <Text style={styles.text1formule}>Une petite envie <Text style={styles.text2formule}>Salée ? </Text></Text>
        
        <ScrollView horizontal={true} style={{marginTop:10}}>

            {/* Sandwichs */}
            <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPageSandwich}>
                    {/* <Image
                            // source={require('../assets/Formule36.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/sandwich.jpg'}}
                            style={{ width: 200, height: 234, resizeMode:'cover' }}
                            /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 234,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule36.jpg`,
                                priority: FastImage.priority.high,
                            }}
                    resizeMode={FastImage.resizeMode.cover}
                /> */}
               <FastImage
              source={require('../assets/sandwich.jpg')}
              style={{ width: 200, height: 234,  }}
              resizeMode={FastImage.resizeMode.cover}
            />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Sandwichs</Text>
                    </View>
            </TouchableOpacity>

            {/* Wraps et pizza */}
            <TouchableOpacity style={{marginRight:10, flexDirection:'column', gap:12}}  activeOpacity={0.8}>
                
                <TouchableOpacity onPress={openPagePizza}>
                    {/* <Image
                        // source={require('../assets/Formule2.jpg')} 
                        source={{uri:'https://cdn.lepaindujour.io/assets/pizza.jpg'}}
                        style={{ width: 200, height: 85, resizeMode:'cover' }}
                    /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 85,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule2.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <FastImage
              source={require('../assets/pizza.jpg')}
              style={{ width: 200, height: 80,  }}
              resizeMode={FastImage.resizeMode.cover}
            />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Pizzas</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openPageWrap}>
                    {/* <Image
                        // source={require('../assets/Formule32.jpg')} 
                        source={{uri:'https://cdn.lepaindujour.io/assets/wrap.jpg'}}
                        style={{ width: 200, height: 80, resizeMode:'cover' }}
                    /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 80,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule32.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <FastImage
                    source={require('../assets/wrap.jpg')}
                    style={{ width: 200, height: 80,  }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Wraps</Text>
                    </View>
                </TouchableOpacity>
                    
            </TouchableOpacity>

            {/* Salades */}
            <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPageSalade}>
                    {/* <Image
                            // source={require('../assets/Formule26.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/salade.jpg'}}
                            
                            style={{ width: 200, height: 234, resizeMode:'cover' }}
                            /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 234,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule26.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <FastImage
                    source={require('../assets/salade.jpg')}
                    style={{ width: 200, height: 234,  }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Salades</Text>
                    </View>
            </TouchableOpacity>

            {/* Burgers et Paninis */}    
            <TouchableOpacity style={{marginRight:10, flexDirection:'column', gap:12}}>            
                <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPageBurger}>
                    {/* <Image
                        // source={require('../assets/Formule27.jpg')} 
                        source={{uri:'https://cdn.lepaindujour.io/assets/burger.jpg'}}
                        style={{ width: 200, height: 85, resizeMode:'cover' }}
                    /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 85,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule27.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <FastImage
                    source={require('../assets/burger.jpg')}
                    style={{ width: 200, height: 80,  }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Burgers</Text>
                    </View>
                </TouchableOpacity>
               

                <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPagePanini}>
                    {/* <Image
                        // source={require('../assets/Formule55.jpg')} 
                        source={{uri:'https://cdn.lepaindujour.io/assets/panini.jpg'}}
                        style={{ width: 200, height: 80, resizeMode:'cover' }}
                    /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 80,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule55.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                    <FastImage
                    source={require('../assets/panini.jpg')}
                    style={{ width: 200, height: 80,  }}
                    resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Paninis</Text>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>    

            {/* Pains bagnats */}
            <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPagePainBagnat}>
                    {/* <Image
                            // source={require('../assets/Formule28.jpg')} 
                            source={{uri:'https://cdn.lepaindujour.io/assets/painbagnat.jpg'}}
                            style={{ width: 200, height: 234, resizeMode:'cover' }}
                            /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 234,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule28.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                     <FastImage
              source={require('../assets/painbagnat.jpg')}
              style={{ width: 200, height: 234,  }}
              resizeMode={FastImage.resizeMode.cover}
            />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Pains Bagnats</Text>
                    </View>
            </TouchableOpacity>

            {/* Quiches et Croques */}
            <TouchableOpacity style={{marginRight:10, flexDirection:'column', gap:12}}  activeOpacity={0.8}>
                
                <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPageQuiche}>
                    {/* <Image
                        // source={require('../assets/Formule22.jpg')} 
                        source={{uri:'https://cdn.lepaindujour.io/assets/quiche.jpg'}}
                        style={{ width: 200, height: 85, resizeMode:'cover' }}
                    /> */}
                {/* <FastImage
                            style={{ width: 200, height: 85,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule22.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                        <FastImage
              source={require('../assets/quiche.jpg')}
              style={{ width: 200, height: 80,  }}
              resizeMode={FastImage.resizeMode.cover}
            />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Quiches</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.8} onPress={openPageCroque}>
                    {/* <Image
                        // source={require('../assets/Formule16.jpg')} 
                        source={{uri:'https://cdn.lepaindujour.io/assets/croque.jpg'}}
                        style={{ width: 200, height: 80, resizeMode:'cover' }}
                    /> */}
                    {/* <FastImage
                            style={{ width: 200, height: 80,  }}
                            source={{
                            uri: `${API_BASE_URL}/Images/Formule16.jpg`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                    /> */}
                        <FastImage
              source={require('../assets/croque.jpg')}
              style={{ width: 200, height: 80,  }}
              resizeMode={FastImage.resizeMode.cover}
            />
                    <View style={styles.cardTitle}>
                        <Text style={styles.titleFormule_envie}>Croques</Text>
                    </View>
                </TouchableOpacity>
                    
            </TouchableOpacity>

        </ScrollView>

    </View>
  )
}

export default TestEnvieSalee
