import { useSelector } from "react-redux";
import BasketCard from "../components/BasketCard";
import BasketSideBar from "../components/BasketSideBar";


import styles from "./Checkout.module.css"

function Checkout() {

  const state = useSelector(store => store.cart)
  // console.log(state)

  
  if (state.itemsCounter === 0) {
    return (
      <div className={styles.container}>
        <p>empty</p>
      </div>
    );   
  }
  

  return (
    <div className={styles.container}>

       <BasketSideBar state={state} />

      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard key={product.id} data={product}  />
        ))}
      </div>

    </div> 

  );
}

export default Checkout;
