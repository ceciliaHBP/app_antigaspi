import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    numero_commande: '',
    productIds: [],
    products: [],
    orderId:null
  },
  reducers: {
    setNumeroCommande: (state, action) => {
      state.numero_commande = action.payload;
    },
    setProductIds: (state, action) => {
      state.productIds = action.payload;
    },
    setProducts: (state, action) => { 
      state.products = action.payload;
    },
    setOrderId: (state, action) => {    
      state.orderId = action.payload;
    },
  },
});

export const { setNumeroCommande, setProductIds, setProducts, setOrderId } = orderSlice.actions;
export default orderSlice.reducer;