import { Link } from "react-router-dom"


import { TfiShoppingCart } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";

import styles from "./Layout.module.css"
import { useSelector } from "react-redux";

function Layout({children}) {

    // for access to itemsCounter
  const state = useSelector(store => store.cart)
  console.log(state)

  return (
    <>
      <header className={styles.header}>

        <Link to="/products">Online Shop</Link>

        <Link to="/Checkout">
          <div>
            <TfiShoppingCart />
            {state.itemsCounter > 0 && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
        
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Danial with <FaHeart style={{color:"red"}}/></p>
      </footer>
    </>
  )
}

export default Layout