import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/Config";

const initialState = {
    loading: false ,
    products: [] ,
    error: "" ,
}

const fetchProductsData = createAsyncThunk("products/fetchProducts" , ()=>{
    return api.get("/products")
})

const productSlice = createSlice({
    name: "products",
    initialState ,
    extraReducers:
    // when data is loading
    (builder) => {builder.addCase(fetchProductsData.pending , (state)=>{
        state.loading = true ;
    });
    // when fetching data was successfully
    {builder.addCase(fetchProductsData.fulfilled , (state , action)=>{
        state.loading = false ;
        state.products = action.payload
        state.error= ""
    })}
    // when fetching data was wrong 
    {builder.addCase(fetchProductsData.rejected , (state , action)=>{
        state.loading = false
        state.products = []
        state.error = action.error.message
    })}

    }
})

export default productSlice.reducer;
export {fetchProductsData};