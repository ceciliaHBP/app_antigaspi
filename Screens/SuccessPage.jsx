import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect} from 'react'
import {  colors, fonts} from '../styles/styles'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart} from '../reducers/cartSlice';
import FooterProfile from '../components/FooterProfile';
import { Rating } from 'react-native-ratings';
import { API_BASE_URL } from '../config';
// import {  API_BASE_URL, API_BASE_URL_ANDROID, API_BASE_URL_IOS } from '@env';
import axios from 'axios';
import { ApplyCode } from '../SVG/ApplyCode';
import ArrowLeft from '../SVG/ArrowLeft';
import { SimpleArrowLeft } from '../SVG/SimpleArrowLeft';
import { Success } from '../SVG/Success';



const SuccessPage = ({navigation}) => {
    

    const user = useSelector((state) => state.auth.user)
    const order = useSelector((state) => state.order.orderId)
    //console.log('order', order)
    const role = user.role
    //console.log('user', user)
    //console.log('role', role)

    const [modalVisible, setModalVisible] = React.useState(false);
    const [ratingValue, setRatingValue] = React.useState(5);
    const [commentValue, setCommentValue] = React.useState("");


    const openRatingModal = () => {
        setModalVisible(true);
        
    }
    const sendReviews = async () => {
        const reviewData = {
            orderId: order, // Vous devez obtenir cela probablement via un useSelector
            user: `${user.firstname} ${user.lastname}`,
            rating: ratingValue,
            comment: commentValue,
        };
        //console.log('review',reviewData)
       
        try {
            const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
            
            if(response.status === 200 || response.status === 201) {
                //console.log('Review successfully submitted:', response.data);
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    }

    const closeRatingModal = () => {
        setModalVisible(false);
    }

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.cart); 


    useEffect(() => {
      if (cart.length > 0) {
          dispatch(clearCart())
      }
  }, [cart, dispatch]);

    const submitHandler = async () => {
        navigation.navigate('home')
    }

  return (
   <>
   
        <View style={style.container}>

            <View>
                <Success />
            </View>

            <View style={style.centeredTextContainer}>
              <View style={style.centeredText}>
                  <Text style={style.text1Color}>Merci d'avoir passé ta commande  </Text>
                  <Text style={style.text1Color}> au Pain du Jour Mas Guérido </Text>

              </View>
              <View style={style.centeredText}>
                {
                    role === 'SUNcollaborateur' 
                    ? <Text style={style.text2Color}>Ta commande arrivera demain dans la matinée via la tournée de la navette</Text>
                    : <Text style={style.text2Color}>Vous recevrez un message quand la commande sera prête à être récupérée </Text>
                }
                  
              </View>
            </View>
        <View style={style.contentWrapper}>
            
            <View style={style.centeredButton}>
            <TouchableOpacity onPress={openRatingModal} style={style.btnBack} >
                        <Text style={style.textBtnBack}>Donner son avis</Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={submitHandler} style={{...style.btnBack, backgroundColor:colors.color1, flexDirection:'row', gap: 10, justifyContent:'space-around'}} >
                    <SimpleArrowLeft />
                    <Text style={style.textBtnBack}>Retourner à l'accueil</Text>
                </TouchableOpacity>
            </View>
        </View>
     
        <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={closeRatingModal}>
                    <KeyboardAvoidingView
                    keyboardVerticalOffset={10}
                        behavior={Platform.OS === 'ios' ? 'padding' : ''} style={{flexGrow:1}}
                        >
                    <View style={{ flex: 1, alignItems: 'center',justifyContent:'center', marginVertical:10 }}>
                        <View style={{ width: '90%', height: '90%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', borderColor:'lightgray', borderWidth:1, justifyContent:'center',gap:10 }}>
                            <TouchableOpacity onPress={closeRatingModal} style={{ position:'absolute', top:0, right:10 }}>
                                <Text style={{ fontSize: 36 , color:colors.color1}}>&times;</Text>
                            </TouchableOpacity>
                                <Text style={{fontWeight:"bold", color:colors.color1}}>Ton option nous intéresse !</Text>
                                <Text style={{color:colors.color1}}>Comment s'est déroulée ton expérience d'achat ?</Text>
                                <Rating
                                    startingValue={5}
                                    onFinishRating={(rating) => setRatingValue(rating)}
                                    style={{ paddingVertical: 10 }}
                                />
                                
                                <TextInput
                                    numberOfLines={1}
                                    placeholder="Laissez-nous vos suggestions..."
                                    style={{ borderColor: 'gray', borderWidth: 1, width: '100%', padding: 10, marginTop: 10, height:50 }}
                                    onChangeText={(text) => setCommentValue(text)}

                                />
                                
                                <TouchableOpacity 
                                    style={style.submitButton}
                                    onPress={sendReviews}
                                >
                            <Text style={style.submitButtonText}>Envoyer</Text>
                        </TouchableOpacity>                 
                        </View>
                    </View>
                    </KeyboardAvoidingView>
                </Modal>
                
    </View>
   
    <FooterProfile />

    </>
  )
}
const style = StyleSheet.create({
    
    container:{
        flex:1,
        flexDirection:'column',
        // padding:20,
        justifyContent:'center',
        alignItems:'center',
        //reajustement margin pour laisser de la place au footer
        // marginBottom:70,
        backgroundColor:'white', 
        borderRadius:10,
        gap:60, paddingHorizontal:30
    },
    btnBack: {
        backgroundColor:colors.color9,
        paddingVertical:10,
        paddingHorizontal: 20,
        borderRadius:5,
        width:200
    },
    textBtnBack:{
      color:colors.color6,
      fontSize:16,
      textAlign:'center'
    },
    contentWrapper: {
      alignItems: 'center',
      gap: 20
  },
  centeredTextContainer: {  
    justifyContent: 'center',
    alignItems: 'center',
  },  
  centeredText: {
    alignSelf: 'center',
    textAlign: 'center',  
    width: '100%', 
    marginVertical: 20      
  },
  centeredButton: {
      alignSelf: 'center', 
      width: 200,
      gap:10
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 10,
},
submitButton: {
    backgroundColor: colors.color9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
},
submitButtonText: {
    color: colors.color6,
    fontSize: 16
},
text2Color:{
    color:colors.color1,
    textAlign:'center'
},
text1Color:{
    color:colors.color2,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:18
}


})

export default SuccessPage