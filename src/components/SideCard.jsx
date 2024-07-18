import { BiCategory } from "react-icons/bi";

import { createQueryObject } from "../helpers/helpers";
import { categories } from "../constants/categoryList";

import styles from "./SideCard.module.css"


function SideCard({query , setQuery}) {

// function for handle selected Category
function categoryHandler(e){
    const {tagName} = e.target;
    const category = e.target.innerText.toLowerCase();

    if(tagName !== "LI"){return;}

    // setQuery((query)=>({...query , category:category}))
    setQuery((query)=>(createQueryObject(query , {category:category})))
}

  return (
    <div className={styles.sidebar}>
    <div>
      <BiCategory />
      <p>Categories</p>
    </div>
    <ul onClick={categoryHandler}>
      {categories.map((item)=>(
        <li key={item.id} className={query.category === item.type.toLowerCase() ? styles.selected : null}>{item.type}</li>
      ))}
    </ul>
  </div>
  )
}

export default SideCard