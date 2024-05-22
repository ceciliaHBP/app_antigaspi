if (user.fonction === 'gerant') {
  // 1. je n'ouvre pas stripe
  // 2. je valide le paiement à "paid"
  // 3. je créer la commande
  // 4. je met à jour le stock

  const orderData = {
    cart: cart,
    userRole: user.role,
    firstname_client: user.firstname,
    lastname_client: user.lastname,
    prix_total: totalPrice,
    date: dateForDatabase,
    heure: selectedTime,
    userId: user.userId,
    storeId: selectStore,
    slotId: null,
    promotionId: null,
    // paymentMethod: 'card' ? 'online' : 'onsite',

    products: (() => {
      let products = [];
      let processedProductIds = []; // Pour garder une trace des IDs de produits déjà traités

      // Traitement des produits fusionnés avec des offres (3+1)
      aggregatedCartItems.forEach(item => {
        const productData = {
          productId: item.productId,
          quantity: item.qty,
          prix_unitaire: item.prix_unitaire,
        };

        if (item.isFree) {
          productData.offre = item.offre;
        }

        products.push(productData);
        processedProductIds.push(item.productId); // Ajoutez l'ID du produit à la liste des produits traités
      });

      cart.forEach(item => {
        // Si l'ID du produit a déjà été traité, sautez ce produit
        //pour eviter les doublons dans le panier
        if (processedProductIds.includes(item.productId)) return;

        // Traitement des produits de type 'formule'
        if (item.type === 'formule') {
          ['option1', 'option2', 'option3'].forEach(option => {
            if (item[option]) {
              products.push({
                productId: item[option].productId,
                quantity: item.qty,
                formule: item.libelle,
                category: item[option].categorie,
              });
            }
          });
        }

        // Traitement des produits réguliers (qui n'ont pas d'offre ou dont l'offre n'a pas été utilisée ou quil y es tune offre, mais c'est un produit antigaspi donc un seul produit)
        else if (!item.offre || (item.offre && item.qty < 4)) {
          if (item.productId) {
            products.push({
              productId: item.productId,
              quantity: item.qty,
              prix_unitaire: item.prix_unitaire,
            });
          }
        }
      });

      return products;
    })(),
  };

  const createorder = await createOrder(orderData);

  const numero_commande = createorder.numero_commande;
  dispatch(setNumeroCommande(numero_commande));
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

  // console.log('envoi de l email', res.data)

  cart.forEach(async item => {
    // console.log(item);
    // mise à jour du stock normal

    await updateAntigaspiStock(item);
    await updateStock(item);
  });

  navigation.navigate('success');

  return;
}

// check stock antigaspi en doublon

//3. je vérifie le stock des produits anti gaspi
const checkStockAntiGaspi = async () => {
  // console.log('cart', cart);
  try {
    const response = await axios.post(`${API_BASE_URL}/checkStockAntiGaspi`, {
      cart,
    });
    // console.log('response stockantigaspi', response.data);
    cart.forEach(item => {
      if (item.antigaspi) {
        const stockDisponible = response.data[item.productId];
        // console.log('stock', stockDisponible);
        if (stockDisponible !== undefined) {
          if (item.qty <= stockDisponible) {
            // console.log(
            //   `Stock suffisant pour le produit ${item.libelle}.`,
            // );
            // Logique pour gérer le stock suffisant
          } else {
            // console.log(
            //   `Stock insuffisant pour le produit ${item.libelle}.`,
            // );
            return Toast.show({
              type: 'error',
              text1: `Le produit ${item.libelle} n'est plus disponible`,
              text2: `Victime de son succès, quantité maximale: ${stockDisponible}`,
            });
          }
        } else {
          console.log(
            `Informations de stock non disponibles pour le produit ${item.libelle}.`,
          );
          // Logique pour gérer l'absence d'information sur le stock
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors da verif du stock antigaspi', error);
  }
};
checkStockAntiGaspi();

// carItem
<CartItem
  libelle={group.items[0].libelle}
  prix_unitaire={group.items[0].prix || group.items[0].prix_unitaire}
  qty={qty}
  incrementhandler={() =>
    incrementhandler(
      group.items[0].productId,
      group.items[0].offre,
      'product',
      group,
    )
  }
  decrementhandler={() =>
    // decrementhandler(
    //   group.items[0].productId,
    //   dispatch,
    // )
    // decrementhandler(group.items[0].productId, dispatch, group,  group.items.length, 'product')
    decrementhandler('product', group.items[0].productId, group, dispatch)
  }
  removehandler={() =>
    removehandler(
      'product',
      group.items[0].productId,
      group,
      dispatch,
      group.items
        .filter(item => item.productId === group.items[0].productId) // Assurez-vous que l'ID est correct ici
        .reduce((sum, item) => sum + item.qty, 0),
    )
  }
  index={index}
  isFree={group.items[0].isFree}
  freeCount={group.freeCount}
/>;
