import { FiSearch } from "react-icons/fi";

import { createQueryObject } from "../helpers/helpers";

import styles from "./SearchBox.module.css"

function SearchBox({search , setSearch , setQuery}) {

// function for handle search input
  function searchHandler(){
    // setQuery((query)=>({...query , search:search}))
    setQuery((query)=>(createQueryObject(query , {search:search})))
  }

  return (
    <div className={styles.search}>
      <input type="text" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value.toLowerCase().trim())} />
      <button onClick={searchHandler}><FiSearch /></button>
    </div>
  )
}

export default SearchBox