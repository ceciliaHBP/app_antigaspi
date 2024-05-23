import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../styles/home';
import {fonts, colors} from '../styles/styles';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addDate} from '../reducers/cartSlice';
import axios from 'axios';
import {API_BASE_URL} from '../config';
import DateLogo from '../SVG/DateLogo';

const CustomDatePicker = () => {
  const dateRedux = useSelector(state => state.cart.date);

  const [date, setDate] = useState(dateRedux || null);
  const [openDate, setOpenDate] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]);

  const dispatch = useDispatch();

  const isTomorrowOrLater = selectedDate => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 0, 0); // Set current date to today at 23:59
    return selectedDate >= currentDate;
  };

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const {data} = await axios.get(`${API_BASE_URL}/getListeDates`);
        const formattedDates = data.map(dateObj => formatDate(dateObj.date));
        setBlockedDates(formattedDates);
      } catch (error) {
        console.error(
          'erreur lors de la récupération des dates bloquées:',
          error,
        );
      }
    };

    fetchBlockedDates();
  }, []);
  const isBlockedDate = selectedDate => {
    const formattedDate = formatDate(selectedDate);
    // console.log('Checking date:', formattedDate);
    // console.log('Blocked dates list:', blockedDates);
    return blockedDates.includes(formattedDate);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
      }}>
      {/* // Selection Jour  */}
      <TouchableOpacity
        onPress={() => setOpenDate(true)}
        style={styles.bordersPicker}>
        <Text style={{...styles.textPickerDate, marginBottom: 20}}>
          Pour quel jour
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            alignItems: 'center',
          }}>
          <DateLogo />
          <Text>
            {date ? (
              <Text style={styles.picker}>{dateRedux}</Text>
            ) : (
              <Text style={styles.pickerNoDate}>jj/mm/aaaa</Text>
            )}
          </Text>
        </View>

      </TouchableOpacity>

      <DatePicker
        cancelText="Annuler"
        confirmText="Confirmer"
        locale="fr"
        modal
        open={openDate}
        date={date ? new Date() : new Date()}
        mode="date"
        onConfirm={date => {
          setOpenDate(false);

          if (!isTomorrowOrLater(date)) {
            Toast.show({
              type: 'error',
              text1: 'Erreur, Vous arrivez trop tard pour cette date',
              text2: 'Veuillez selectionner une nouvelle date',
            });
            return;
          }

          //verification si dimanche = pas de commandes possibles
          const dayOfWeek = date;
          if (dayOfWeek === 0) {
            Toast.show({
              type: 'error',
              text1: 'Indisponible',
              text2: 'Le ClickandCollect est indisponible le dimanche 📅 ',
            });
            return;
          }
          //test date
          const formattedDate = formatDate(date.toISOString());

          // date bloquée
          if (isBlockedDate(date)) {
            Toast.show({
              type: 'error',
              text1: 'Date indisponible',
              text2:
                'Le ClickandCollect n’est pas disponible pour cette date 📅 ',
            });
            return;
          }
          setDate(formattedDate);
          dispatch(addDate(formattedDate));
          return Toast.show({
            type: 'success',
            text1: 'Succès',
            text2: `Commande choisie pour le ${formattedDate}`,
          });
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
        minimumDate={new Date()}
      />
    </View>
  );
};

export default CustomDatePicker;
