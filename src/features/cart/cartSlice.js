import { createSlice } from "@reduxjs/toolkit";
import { sumPrice, sumQuantity } from "../../helpers/helpers";

const initialState = {
    selectedItems :[] ,
    itemsCounter :0 ,
    total :0 ,
    checkout: false ,
};

const cartSlice = createSlice({
    name: "cart",
    initialState ,
    reducers:{
      addItem : (state , action)=>{
        if(!state.selectedItems.find((item)=> item.id === action.payload.id)){
            state.selectedItems.push({...action.payload , quantity: 1 , finalPrice:action.payload.price})
            
            state.itemsCounter = sumQuantity(state.selectedItems);
            state.total = sumPrice(state.selectedItems);
            state.checkout = false;
        }
      },

      removeItem : (state , action)=>{
        const newSelectedItems = state.selectedItems.filter((item)=> item.id !== action.payload.id);

        state.selectedItems = [...newSelectedItems]
        state.itemsCounter = sumQuantity(newSelectedItems);
        state.total = sumPrice(newSelectedItems);
        state.checkout = false;
      },

      increase : (state , action)=>{
        const increaseIndex = state.selectedItems.findIndex((item)=> item.id === action.payload.id);
        state.selectedItems[increaseIndex].quantity++;
        state.selectedItems[increaseIndex].finalPrice = action.payload.price * state.selectedItems[increaseIndex].quantity;

        state.itemsCounter = sumQuantity(state.selectedItems);
        state.total = sumPrice(state.selectedItems);
        state.checkout = false;
      },

      decrease : (state , action)=>{
        const decreaseIndex = state.selectedItems.findIndex((item)=> item.id === action.payload.id);
        state.selectedItems[decreaseIndex].quantity--;
        state.selectedItems[decreaseIndex].finalPrice = action.payload.price * state.selectedItems[decreaseIndex].quantity;

        state.itemsCounter = sumQuantity(state.selectedItems);
        state.total = sumPrice(state.selectedItems);
        state.checkout = false;
      },

      checkout : (state)=>{
        state.selectedItems = [];
        state.checkout = true;
        state.itemsCounter = 0;
        state.total = 0;
      },
    }
})

export default cartSlice.reducer;
export const {addItem , removeItem , increase , decrease , checkout} = cartSlice.actions;