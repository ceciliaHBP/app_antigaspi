import {View, Image, Text, Platform, StyleSheet} from 'react-native';
import Picker from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateUser} from '../reducers/authSlice';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {fonts, colors} from '../styles/styles';
import {styles} from '../styles/home';

import {API_BASE_URL} from '../config';
import Location from '../SVG/Location';

const StorePicker = ({onStoreUpdate}) => {
  const [stores, setStores] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [selectedStoreDetails, setSelectedStoreDetails] = useState({});

  useEffect(() => {
    if (user && user.role) {
      axios
        .post(`${API_BASE_URL}/getStore`, {
          role: user.role,
          storeId: user.storeId,
        })
        .then(response => {
          if (response.data.stores) {
            setStores(response.data.stores);
          }
          if (response.data.selectedStore) {
            setSelectedStoreDetails(response.data.selectedStore);
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
    }
  }, [user.role, user.storeId]);

  return (
    <View
      style={{
        width: 160,
        height: 80,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'column'}}>
        {user.role == 'SUNcollaborateur' && (
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: Platform.OS === 'ios' ? 8 : 0,
            }}>
            <Location />
            <Text style={{...styles.textPickerDate, textAlign: 'center'}}>
              Livraison
            </Text>
          </View>
        )}
        {Platform.OS === 'android' ? (
          <SelectDropdown
            key={selectedStoreDetails.nom_magasin}
            data={stores.map(store => store.nom_magasin)}
            onSelect={(selectedItem, index) => {
              const selected = stores.find(
                store => store.nom_magasin === selectedItem,
              );
              if (selected) {
                dispatch(updateUser({...user, storeId: selected.storeId}));
                // dispatch(updateSelectedStore(selected));
                setSelectedStoreDetails(selected);
                axios
                  .put(`${API_BASE_URL}/updateOneUser/${user.userId}`, {
                    storeId: selected.storeId,
                  })
                  .then(response => {
                    // console.log('Le choix du magasin a été mis à jour avec succès dans la base de données');
                  })
                  .catch(error => {
                    console.error(
                      'Erreur lors de la mise à jour du choix du magasin dans la base de données - erreur ici:',
                      error,
                    );
                  });
              } else {
                console.log('pas de magasin sélectionné encore');
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              width: 160,
              height: 30,
              padding: 0,
            }}
            buttonTextStyle={{
              fontSize: 10,
              fontWeight: 700,
              color: colors.color2,
              padding: 0,
            }}
            // defaultButtonText={selectedStore.nom_magasin}
            defaultButtonText={
              selectedStoreDetails
                ? selectedStoreDetails.nom_magasin
                : 'faites votre choix'
            }
            rowTextStyle={{fontSize: 10}}
            // rowStyle={{width:20}}
          />
        ) : (
          <Picker
            placeholder={{
              label: 'Choisissez un magasin',
            }}
            value={selectedStoreDetails.nom_magasin}
            // value={selectedStore.nom_magasin}
            onValueChange={value => {
              const selected = stores.find(
                store => store.nom_magasin === value,
              );

              if (selected) {
                // dispatch(updateSelectedStore(selected));
                dispatch(updateUser({...user, storeId: selected.storeId}));
                setSelectedStoreDetails(selected);
                axios
                  .put(`${API_BASE_URL}/updateOneUser/${user.userId}`, {
                    storeId: selected.storeId,
                  })
                  .then(response => {
                    // ici - je veux faire remonter que le composant est ok
                    // console.log('Le choix du magasin a été mis à jour avec succès dans la base de données');
                    if (onStoreUpdate) {
                      onStoreUpdate(); // Notify the parent component
                    }
                  })
                  .catch(error => {
                    console.error(
                      'Erreur lors de la mise à jour du choix du magasin dans la base de données (ici) - erreur ici:',
                      error,
                    );
                  });
              } else {
                // console.log('pas de magasin selectionné encore')
              }
            }}
            items={stores.map(store => ({
              label: store.nom_magasin,
              value: store.nom_magasin,
            }))}
            style={pickerSelectStyles}
            doneText="OK"
          />
        )}

        {user.role == 'client' ||
          (user.role == 'invite' && (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View>
                <Text style={{fontSize: 10, color: colors.color1, width: 130}}>
                  {selectedStoreDetails.adresse_magasin}
                </Text>
                <Text style={{fontSize: 10, color: colors.color1}}>
                  {selectedStoreDetails.cp_magasin}{' '}
                  {selectedStoreDetails.ville_magasin}
                </Text>
              </View>
            </View>
          ))}
      </View>
      {/* </View> */}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    color: colors.color2,
    textAlign: 'center',
    marginVertical: 2,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    color: colors.color1,
  },
});

const pickerStyles = Platform.select({
  ios: pickerSelectStyles.inputIOS, // Styles pour iOS
  android: pickerSelectStyles.inputAndroid, // Styles pour Android
});

export default StorePicker;
