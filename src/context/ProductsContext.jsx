import { createContext, useContext, useEffect, useState } from "react"

import api from "../services/Config"


// create context
export const ProductsContext = createContext();
// create context

// Create ContextProvider
function ProductsProvider({children}) {
    const [products , setProducts] = useState([])

    useEffect(function(){
        async function fetchProducts(){
            try {
                // const response = await api.get("/products");
                // console.log(response);
                setProducts(response) ;
            } 
            catch (error) {
                console.log(error.message)
            }
        }
        fetchProducts(); 
    } , [])

  return (
    <ProductsContext.Provider value={products}>
        {children}
    </ProductsContext.Provider>
  );
}
// Create ContextProvider


// Create Custom Hook ===> for prevent extra import in another components
function useProducts(){
    const products = useContext(ProductsContext);
    // console.log(products)
    return products;
}

// create custom Hook ===> for access to "Details of selected Product" in <DetailsPage />
function useProductDetails(id){
    // all products data:
    const products = useContext(ProductsContext);
    // find selected item :
    const result = products.find((item)=> item.id === id)
    return result;
}

export default ProductsProvider;
export {useProducts , useProductDetails};