
          // 3. je mets à jour le paymentId dans la commande
          const numero_commande = createorder.numero_commande;
          dispatch(setNumeroCommande(numero_commande));

          // console.log('respPaiement', respPaiement);
          const paymentId = respPaiement.paymentId;
          // console.log('paymentId', paymentId);
          // console.log('numero_commande', numero_commande);

          const updateData = {numero_commande, status, paymentId};

          const response = await axios.post(
            `${API_BASE_URL}/updateOrder`,
            updateData,
          );
          // console.log('response updateOrder', response.data);

          // console.log('paiement ok');
          // console.log('commande créée');
          // console.log('commande mise à jour');

          //4. récuperer le magasin du user = userId - le store du user
          const callApi = await axios.get(
            `${API_BASE_URL}/getOneStore/${user.storeId}`,
          );
          // console.log('data', callApi.data);
          const point_de_vente = callApi.data.nom_magasin;

          // 5. envoi de l'email de confirmation de commande
          const res = await axios.post(`${API_BASE_URL}/confirmOrder`, {
            email: emailConfirmOrder,
            firstname: firstnameConfirmOrder,
            numero_commande,
            date: orderData.date,
            point_de_vente,
          });




          // 1. je crée le paiement
          const paymentData = {
            method,
            status,
            transactionId,
          };
          const respPaiement = await createPaiement(paymentData);