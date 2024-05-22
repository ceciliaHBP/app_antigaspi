import axios from 'axios';
import {API_BASE_URL} from '../config';

export const getAllStores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllStores`);
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des magasins:",
      error,
    );
    throw error; // Renvoie l'erreur pour permettre au composant appelant de la gérer
  }
};

export const fetchAllProductsClickandCollect = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsClickandCollect`,
    );
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite, error products :", error);
    throw error; // Pour propager l'erreur et
  }
};

export const checkStockFormule = async productIds => {
  try {
    let stocks = [];
    for (let productId of productIds) {
      const stockResponse = await axios.get(
        `${API_BASE_URL}/getStockByProduct/${productId}`,
      );
      stocks.push(stockResponse.data);
    }
    return stocks;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du stock formule:",
      error,
    );
  }
};
export const checkStockForSingleProduct = async productId => {
  try {
    const stockResponse = await axios.get(
      `${API_BASE_URL}/getStockByProduct/${productId}`,
    );
    // console.log('res', stockResponse.data)
    return stockResponse.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du stock single product:",
      error,
    );
  }
};

//check des stocks par produits
// export const checkStock = async (productIds) => {
//   try {
//     let stockByProduct = [];
//     for(let i = 0; i < productIds.length; i++){
//       const stockResponse = await axios.get(`${API_BASE_URL}/getStockByProduct/${productIds[i]}`);
//       stockByProduct.push(stockResponse.data);
//     }
//     return stockByProduct;
//   } catch (error) {
//     console.error("Une erreur s'est produite lors de la récupération du stock :", error);
//   }
// }

//modifier un user
export const modifyUser = async (userId, userUpdate) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/modifyUser/${userId}`,
      userUpdate,
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la mise à jour de l'utilisateur :",
      error,
    );
    throw error; // Lancer une erreur pour pouvoir la gérer dans votre composant
  }
};

//lister les produits par catégories pour les formules
export const getProductsByCategory = async category => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getProductsofOneCategory/${category}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des produits par catégorie:",
      error,
    );
    throw error;
  }
};

//recupérer un produit
export const fetchOneProduct = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getOneProduct/${id}`);
    //console.log('fetchOneproduct', response.data)
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des produits par catégorie:",
      error,
    );
    throw error;
  }
};

export const getFamilyProductDetails = async id => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getOneFamillyProduct/${id}`,
    );
    // console.log('res getOneFamillyProduct', response.data.familleProduit.nom_famille_produit)
    return {
      id: response.data.familleProduit.id_famille_produit,
      name: response.data.familleProduit.nom_famille_produit,
    };
  } catch (error) {
    // console.error('Une erreur s\'est produite lors de la récupération des détails de la famille de produits:', error);
    return null;
  }
};

//recuperer le nom du magasin
export const getStoreById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getOneStore/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Une erreur s est produite lors de la récupération des données du magasin :',
      error,
    );
    return null;
  }
};

//recuperer famille du produit
export const getFamilyOfProduct = async id => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getFamillyOfProduct/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Une erreur s est produite lors de la récupération des données du magasin :',
      error,
    );
    return null;
  }
};

//recupérer la liste des desserts
export const fetchDessertIds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getDessertIds/ids`);
    //console.log('ids', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching dessert IDs:', error);
  }
};

//recupérer la liste des boissons
export const fetchBoissonIds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBoissonIds/ids`);
    //console.log('ids', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching boisson IDs:', error);
  }
};

/**
 *
 * @param {number} userId
 * @param {date} dateForDatabase
 * @returns boolean
 * @description verifie si une commande contient un produit type 'offreSUN' pour la baguette gratuite
 * en teant compte de la date de la commande
 */
export const checkIfUserOrderedOffreSUNToday = async (
  userId,
  dateForDatabase,
) => {

  try {
    // Format the date to ISO string and encode it to include in the URL
    const dateStr = encodeURIComponent(new Date(dateForDatabase).toISOString());

    const response = await axios.get(`${API_BASE_URL}/ordersOfUser/${userId}?date=${dateStr}`);
    const orders = response.data;

    // Return true if there are any orders, false otherwise
    return orders.length > 0;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error("An error occurred while trying to fetch the user's orders.");
  }
};

export const fetchAllProductsClickAndCollect = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsClickandCollect`,
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des produits:",
      error,
    );
  }
};

export const updateAntigaspiStock = async item => {
  if (item.antigaspi) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/getUpdateStockAntigaspi`,
        {
          productId: item.productId,
          quantityPurchased: item.qty,
        },
      );

      if (response.status === 200) {
        console.log(
          'Stock antigaspi mis à jour avec succès pour le produit',
          item.libelle,
        );
      }
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour du stock antigaspi pour le produit',
        item.libelle,
        ':',
        error,
      );
    }
  }
};

export const addStockAntigaspi = async item => {
  if (item) {
    try {
      const response = await axios.put(`${API_BASE_URL}/getAddStockAntigaspi`, {
        productId: item.productId,
        quantityPurchased: item.qty,
      });

      if (response.status === 200) {
        console.log(
          `Stock antigaspi mis à jour ( + ${item.qty}) avec succès pour le produit`,
          item.productId,
        );
      }
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour du stock antigaspi pour le produit',
        item.libelle,
        ':',
        error,
      );
    }
  }
};

// j'enleve du stock
export const updateStock = async item => {
  if (item) {
    // console.log('item stock', item)
    try {
      const response = await axios.put(`${API_BASE_URL}/getUpdateStock`, {
        productId: item.productId,
        quantityPurchased: item.qty,
      });
      // console.log('response', response.data)

      if (response.status === 200) {
        // console.log(
        //   `Stock mis à jour avec succès(- ${item.qty})  pour le produit`,
        //   item.productId,
        // );
      }
    } catch (error) {
      // Vérification spécifique pour les erreurs HTTP (status code 400)
      if (error.response && error.response.status === 400) {
        console.error(`Stock insuffisant pour le produit ${item.libelle}.`);
      } else {
        // Gestion des autres types d'erreurs
        console.error(
          'Erreur lors de la mise à jour du stock pour le produit',
          item.libelle,
          ':',
          error,
        );
      }
    }
  }
};

// j'ajoute du stock
export const addStock = async item => {
  // console.log('jajoute du stock')
  if (item) {
    // console.log('item addstock', item)
    try {
      const response = await axios.put(
        `${API_BASE_URL}/getAddStock`,
        {
          productId: item.productId,
          quantityPurchased: item.qty,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        // console.log(
        //   `Stock mis à jour avec succès(+ ${item.qty})  pour le produit id`,
        //   item.productId,
        // );
      }
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour du stock pour le produit',
        item.productId,
        ':',
        error,
      );
    }
  }
};

// recuperer info prefcommande d'un user
export const getPrefCommande = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getInfoPrefCommande/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Une erreur s est produite lors de la récupération des infos du user :',
      error,
    );
    return null;
  }
};

export const getStatusSUN = async userId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getStatusSun/${userId}`);
    return response.data.statusSUN;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du status SUN",
      error,
    );
    throw error;
  }
};

// response
export const RefusApresDemandeSun = async (idSUN, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/RefusApresDemandeSun`, {
      idSUN,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la réinitialisation du status et de l'id SUN",
      error,
    );
    throw error;
  }
};

// response
export const ConfirmationDemandeSun = async (userId, idSUN) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/ConfirmationDemandeSun`,
      {userId, idSUN},
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite l'envoi de l'id SUN et userId",
      error,
    );
    throw error;
  }
};

export const DemandeConnexionPdjToSun = async (userId, email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/DemandeConnexionPdjToSun`,
      {userId, email},
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite l'envoi de l userId et l'email",
      error,
    );
    throw error;
  }
};

export const AnnulationApresErreurPdj = async userId => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/AnnulationApresErreurPdj`,
      {userId},
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l AnnulationApresErreurPdj",
      error,
    );
    throw error;
  }
};

export const getCart = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getCart/${userId}`,
    );
    if (response.data.message && response.data.message === "No active cart found") {
      // console.log("No active cart available for this user.");
       return null;
      // return { ProductsCarts: [] };
    }

    return response.data;
  } catch (error) {
    console.error(
      'Une erreur s est produite lors de la récupération du panier du user :',
      error,
    );
    return null;
  }
};

export const getCartItemId = async (userId, productId, type, key) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getCartItemId/`, {
        params: { userId, productId, type , key}
      }
    );
    // console.log('response', response)
    if (response.data.status === 404) {
      console.log('ce produit nest pas dans le panier')
      // console.log("No active cart available for this user.");
      // return null;
      return { cartItemIds: [] };
    }
    return response.data.cartItemIds;
  } catch (error) {
    console.error(
      'Une erreur s est produite lors de la récupération du cartItemId du produit :',
      error,
    );
    return null;
  }
};

export const getItemsOffre31 = async productId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getOffer31ItemsGroupedByOfferId/${productId}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la recup des produits offre31 du panier",
      error,
    );
    throw error;
  }
};

export const clearUserCart = async userId => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/clearUserCart/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la suppression du panier",
      error,
    );
    throw error;
  }
};

export const fetchAllProductsAntigaspi = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAllProductsAntigaspi`,
    );
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite, error products :", error);
    throw error; 
  }
};

export const hourAntigaspi = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/checkAntiGaspi`,
    );
    // console.log('response', response.data.accessible)
    return response.data.accessible;
  } catch (error) {
    console.error("Une erreur s'est produite, error products :", error);
    throw error; 
  }
};