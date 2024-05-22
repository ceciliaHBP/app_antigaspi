import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { API_BASE_URL } from '@env';
import { API_BASE_URL } from '../config';

const FCMManager = () => {
    const user = useSelector((state) => state.auth.user);
    const [tokenInitialized, setTokenInitialized] = useState(false);

    const sendTokenToBackend = async (fcmToken) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/saveToken`, {
                userId: user.userId, 
                fcmToken: fcmToken,
            });
            // console.log('Token envoyé au backend avec succès', response.data);
        } catch (error) {
            console.error("Erreur lors de l'envoi du token au backend", error);
        }
    };

    useEffect(() => {
        if (!tokenInitialized && user && user.userId) {
            const initializeFCM = async () => {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    // console.log('Authorization status:', authStatus);
                    const token = await messaging().getToken();
                    // console.log('FCM Token dans composant FCM:', token);
                    if (token) {
                        sendTokenToBackend(token);
                    }
                } else {
                    console.log('Failed token status', authStatus);
                }
            };

            initializeFCM();
            setTokenInitialized(true);
        }

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const messageBody = remoteMessage.notification.body;
            Alert.alert(
                'Le Pain du Jour',
                messageBody || 'You received a new message',
            );
        });

        return unsubscribe;
    }, [user, tokenInitialized]);

    return null;
};

export default FCMManager;
