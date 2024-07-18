import { useEffect, useState } from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";

// import { useProducts } from "../context/ProductsContext"

import { useSearchParams } from "react-router-dom";

import { filterProducts, getInitialQuery, searchProducts } from "../helpers/helpers";

import styles from "./ProductsPage.module.css"
import SideCard from "../components/SideCard";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../features/product/productSlice";



function ProductsPage() {

  const {products , loading} = useSelector((store)=> store.products)
  // console.log(products, loading)
  
  const dispatch = useDispatch();
  
useEffect(()=>{
  dispatch(fetchProductsData())
} , [])
  
// Use custom hook ===> for get fetched data ===> products = all fetched data
  // const products = useProducts();


  
  // state for handle search input
  const [search , setSearch] = useState("")
  // state for display(show) products
  const [displayed , setDisplayed] = useState([])
  // state for access to selectedCategory & searchedProducts
  const [query , setQuery] = useState({})
  
  // use Hook for handle QUERY STRING
  const [searchParams , setSearchParams]=useSearchParams()
  
  // Hook for show products first load
  useEffect(function(){
    setDisplayed(products)

    // When User Reload Pages ==> we want current page still showing
    setQuery(getInitialQuery(searchParams))


  } , [products])

  // Hook for show products when user searched & selected category
  useEffect(function(){

    
    let finalProducts = searchProducts(products , query.search)
    finalProducts = filterProducts(finalProducts , query.category)
    
    setDisplayed(finalProducts)
    
    setSearchParams(query)

    // when user fill search input & then he Reload pages ===> we want input's value showing inside the input
    setSearch(query.search || "")
    
  } , [query])



  
  return (
    <>

      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>

      <div className={styles.container}>
        {loading && <Loader />}

        <div className={styles.products}>
          {displayed.map((p)=>(
            <Card key={p.id} data={p} />
            ))}
        </div>

            <SideCard query={query} setQuery={setQuery}/>

      </div>
    </>
  )
}

export default ProductsPage