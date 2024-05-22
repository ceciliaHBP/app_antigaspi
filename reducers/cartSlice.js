import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Thunk pour la mise à jour du panier en backend
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { getState, rejectWithValue }) => {
    const userId = getState().auth.user.userId;  // Assurez-vous que le chemin d'accès est correct
    // console.log('je mets à jour mon panier')
    try {
      const response = await axios.get(`${API_BASE_URL}/getCart/${userId}`);
      if (response.status === 200) {
        // console.log(' reducer getCArt', response.data);
        // return response.data.ProductsCarts; 
        return response.data.ProductsCarts || []; // Gérer un panier vide
      } else {
        throw new Error('Failed to fetch the cart');
      }
    } catch (error) {
      // Ici, vous pouvez aussi passer plus d'informations d'erreur si nécessaire
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);



export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productDetails) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addOrUpdateCartItem`, productDetails);
      if (response.status === 200) {
        // console.log('mise a jour backend ok')
        // console.log('response addTocart', response.data)
        return response.data;
      } else {
        throw new Error('Failed to update the cart');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);


export const getTotalCart = createAsyncThunk(
  'cart/getTotalCart',
  async (_, { getState }) => {
    const userId = getState().auth.user.userId;
    try {
      const response = await axios.get(`${API_BASE_URL}/getCartTotalQuantity/${userId}`);
      if (response.status === 200) {
        // console.log('response totalpanier', response.data.totalQuantity)
        return response.data;
      } else {
        throw new Error('Failed to update the cart');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);


 // await dispatch(
      //   addToCart({
      //     userId: user.userId,
      //     productId: item.productId,
      //     quantity: 1,
      //     unitPrice: item.unitPrice,
      //     type: item.type,
      //     isFree: false,
      //     option1ProductId: null,
      //     option2ProductId: null,
      //     option3ProductId: null,
      //     offerId: null,
      //     libelle: item.libelle,
      //     key: null,
      //     product: item.product,
      //   }),
      // );


const initialState = {
  cart: [],
  cartTotal: {},
  freeProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
    reducers: {
      setCart: (state, action) => {
        state.cart = action.payload;  
      },
    // addToCart: (state, action) => {
    //   const product = action.payload;

    //   const existingProductIndex = state.cart.findIndex(
    //     (item) => item.productId === product.productId && item.offre === product.offre
    //   );

    //   if (existingProductIndex !== -1) {
    //     state.cart[existingProductIndex].qty += 1;
    //   } else {
    //     state.cart.push({ ...product, qty: 1, isFree: false });
    //   }
    // },
    // addToCart: (state, action) => {
    //   const newItem = action.payload;

    //   if (newItem.type === 'formule') {
    //     // Créez une clé unique basée sur les IDs des options de la formule.
    //     const formuleKey = `${newItem.option1?.productId ?? 'none'}-${
    //       newItem.option2?.productId ?? 'none'
    //     }-${newItem.option3?.productId ?? 'none'}`;

    //     // Recherchez une formule existante avec la même clé unique.
    //     const existingFormuleIndex = state.cart.findIndex(
    //       item => item.type === 'formule' && item.formuleKey === formuleKey,
    //     );

    //     if (existingFormuleIndex !== -1) {
    //       // Une formule identique a été trouvée, incrémente la quantité.
    //       state.cart[existingFormuleIndex].qty += newItem.qty;
    //     } else {
    //       // Aucune formule identique, ajoutez la nouvelle formule au panier.
    //       state.cart.push({...newItem, formuleKey: formuleKey});
    //     }
    //   } else {
    //     // Recherchez un produit existant avec le même productId et offre
    //     const existingIndex = state.cart.findIndex(
    //       item =>
    //         item.productId === newItem.productId &&
    //         item.offre === newItem.offre &&
    //         item.type === newItem.type,
    //     );

    //     if (existingIndex !== -1) {
    //       // Un article existant a été trouvé, incrémente la quantité.
    //       // state.cart[existingIndex].qty += newItem.qty;
    //       state.cart[existingIndex].qty += 1;
    //     } else {
    //       // Aucun article existant, ajoute le nouvel article.
    //       state.cart.push(newItem);
    //     }
    //   }
    // },
    addToCartReducer: (state, action) => {
      const newItem = action.payload;
      state.cart.push(newItem);
    },
    acceptOffer: (state, action) => {
      const {productId, offre} = action.payload;
      // console.log('productId', productId)
      // console.log('offre', offre)
      const existingIndex = state.cart.findIndex(
        item => item.productId === productId && item.offre === offre,
      );

      if (existingIndex !== -1) {
        // L'utilisateur a accepté l'offre pour le produit existant, ajoutez donc un produit supplémentaire gratuitement.
        const newItem = {
          ...state.cart[existingIndex],
          qty: 1,
          prix_unitaire: 0,
        };
        state.cart.push(newItem);
      } else {
        // Gérer l'erreur ou la situation où le produit n'existe pas si nécessaire.
      }
    },

    // makeLastSmallPizzaFree: (state, action) => {
    //   //console.log('jeneleve le prix dune pizza')
    //   const lastPizzaIndex = state.cart.length - 1;
    //   if (lastPizzaIndex !== -1) {
    //     const lastPizza = state.cart[lastPizzaIndex];
    //     if (lastPizza.offre && lastPizza.offre.startsWith('offre31_Petite')) {
    //       lastPizza.prix_unitaire = 0;
    //       lastPizza.isFree = true;
    //     }
    //   }
    // },
    makeLastSmallPizzaFree: (state, action) => {
      const eligibleProducts = state.cart.filter(
        product => product.offre && product.offre.startsWith('offre31_Petite'),
      );

      // S'assure que les produits éligibles sont considérés individuellement, même s'ils ont été ajoutés en tant que quantités multiples
      const individualEligibleProducts = eligibleProducts.flatMap(product =>
        Array(product.qty)
          .fill()
          .map((_, index) => ({
            ...product,
            qty: 1,
            isFree: index === product.qty - 1, // Marque le dernier produit comme gratuit s'il est le quatrième dans un lot
          })),
      );

      // Retrouver tous les produits marqués comme gratuits et les mettre à jour dans le panier
      individualEligibleProducts.forEach((product, index) => {
        if ((index + 1) % 4 === 0) {
          // Trouve chaque quatrième produit
          product.isFree = true;
          product.prix_unitaire = 0; // Met à jour le prix à 0 pour le produit gratuit
        } else {
          product.isFree = false; // Assure que les autres produits ne sont pas marqués comme gratuits
        }
      });

      // Reconstitue le panier avec les produits individuels éligibles mis à jour et les autres produits non éligibles
      state.cart = [
        ...state.cart.filter(
          product =>
            !product.offre || !product.offre.startsWith('offre31_Petite'),
        ), // Exclut les produits éligibles existants
        ...individualEligibleProducts, // Ajoute les produits éligibles mis à jour
      ];
    },

    makeLastBigPizzaFree: (state, action) => {
      //console.log('jeneleve le prix dune pizza')
      const lastPizzaIndex = state.cart.length - 1;
      if (lastPizzaIndex !== -1) {
        const lastPizza = state.cart[lastPizzaIndex];
        if (lastPizza.offre && lastPizza.offre.startsWith('offre31_Grande')) {
          lastPizza.prix_unitaire = 0;
          lastPizza.isFree = true;
        }
      }
    },
    // pour les formules
    decrementOrRemoveFromCart: (state, action) => {
      const {id} = action.payload; // ID de la formule
      const formuleIndex = state.cart.findIndex(
        item => item.type === 'formule' && item.id === id,
      );

      if (formuleIndex !== -1) {
        const formule = state.cart[formuleIndex];

        if (formule.qty > 1) {
          // Décrémentez la quantité de la formule
          formule.qty -= 1;
        } else {
          // Quantité de la formule est 1, donc enlevez la formule entière du panier
          state.cart.splice(formuleIndex, 1);
        }
      }
    },
    // pour les produits (hors formule)
    popLastItemOfType: (state, action) => {
      const {type, offre} = action.payload;

      // console.log('type', type);
      // console.log('cart reducer pop', state.cart)

      if (offre != null) {
        // console.log('offre renseignée:', offre);
        // Recherche à partir de la fin pour trouver le dernier élément correspondant
        for (let i = state.cart.length - 1; i >= 0; i--) {
          if (state.cart[i].offre === offre) {
            // state.cart.splice(i, 1); // Enlève le dernier élément trouvé qui correspond à l'offre
            // break; // Sort de la boucle une fois l'élément trouvé et enlevé
            if (state.cart[i].qty > 1) {
              // Si la quantité est supérieure à 1, réduire de 1.
              state.cart[i].qty -= 1;
            } else {
              // Si la quantité est égale à 1, supprimer l'élément.
              state.cart.splice(i, 1);
            }
            break;
          }
        }
      } else {
        // console.log('pas d offre renseignée');
        for (let i = state.cart.length - 1; i >= 0; i--) {
          if (state.cart[i].type === type) {
            if (state.cart[i].qty > 1) {
              // Si la quantité est supérieure à 1, réduire de 1.
              state.cart[i].qty -= 1;
            } else {
              // Si la quantité est égale à 1, supprimer l'élément.
              state.cart.splice(i, 1);
            }
            break; // Importante: Sortir de la boucle une fois la modification faite.
          }
        }
      }
    },
    incrementProductQty: (state, action) => {
      const productId = action.payload;

      const productInCart = state.cart.find(
        item => item.productId === productId,
      );

      if (productInCart) {
        productInCart.qty += 1;
      }
    },
    // removeFromCart: (state, action) => {
    //   //console.log('cart avant suppression', state.cart);
    //   //console.log("Removing one product:", action.payload.productId);
    //   const productId = action.payload.productId;
    //   state.cart = state.cart.filter(
    //     item => !item.productId || item.productId !== productId,
    //   );
    //   //console.log('cart apres suppression', state.cart);
    // },
    removeFromCartAfterCountDown: (state, action) => {
      const {productId, type} = action.payload;
      state.cart = state.cart.filter(item => {
        // Gardez tous les éléments qui ne correspondent pas exactement au productId ET au type
        return item.productId !== productId && item.type !== type;

      });
    },
    removeFromCart: (state, action) => {
      const {productId, type} = action.payload;
      // console.log('productId', productId)
      // console.log('type reducer', type)
      state.cart = state.cart.filter(item => {
        return item.productId !== productId || item.type !== type;

      });
    },

    removeMultipleFromCart: (state, action) => {
      const formuleId = action.payload.formuleId;
      //console.log("Removing formule:", formuleId);
      state.cart = state.cart.filter(
        item => !(item.type === 'formule' && item.id === formuleId),
      );
    },
    updateCart(state, action) {
      state.cart = action.payload;
    },
    clearCart: state => {
      state.cart = [];
    },
    addDate: (state, action) => {
      state.date = action.payload;
    },
    clearDate: state => {
      state.date = null;
    },
    addTime: (state, action) => {
      state.time = action.payload;
    },
    clearTime: state => {
      state.time = null;
    },
    resetDateTime: state => {
      state.date = null;
      state.time = null;
    },
    addPaiement: (state, action) => {
      state.paiement = action.payload;
    },
    updateCartTotal: (state, action) => {
      state.cartTotal = {
        groupedItems: action.payload.groupedItemsArray,
        formules: action.payload.formules,
      };
    },
    addPromo: (state, action) => {
      state.promotionId = action.payload;
    },
    resetPromo: state => {
      state.promotionId = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
        // Vous pourriez aussi vouloir gérer les erreurs ici
      })
      .addCase(getTotalCart.pending, (state) => {
        // Gérer l'état pendant la requête en cours si nécessaire
      })
      .addCase(getTotalCart.fulfilled, (state, action) => {
        state.cartTotal = action.payload; // Met à jour l'état avec le total du panier
      })
      .addCase(getTotalCart.rejected, (state, action) => {
        // Gérer l'état en cas d'échec de la requête si nécessaire
      });
  }
});

export const {
  setCart, 
  addToCartReducer,
  removeFromCart,
  updateCart,
  clearCart,
  addDate,
  clearDate,
  addTime,
  resetDateTime,
  clearTime,
  addPaiement,
  decrementOrRemoveFromCart,
  addFreeProductToCart,
  incrementProductQty,
  updateCartTotal,
  removeMultipleFromCart,
  makeLastSmallPizzaFree,
  makeLastBigPizzaFree,
  addPromo,
  resetPromo,
  popLastItemOfType,
  acceptOffer,
  removeFromCartAfterCountDown
} = cartSlice.actions;
export default cartSlice.reducer;
