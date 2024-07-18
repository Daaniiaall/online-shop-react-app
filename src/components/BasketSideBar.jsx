import { LuBadgeCheck } from "react-icons/lu";
import { TbChecklist } from "react-icons/tb";
import { HiOutlineHashtag } from "react-icons/hi";

import { useDispatch } from "react-redux";

import { checkout } from "../features/cart/cartSlice";

import styles from "./BasketSideBar.module.css"

function BasketSideBar({state }) {
    // console.log(state)

    const dispatch = useDispatch();


    function clickHandler(){
      dispatch(checkout())
    }


  return (
    <div className={styles.sidebar}>
        <div>
            <TbChecklist />
            <p>total :</p>
            <span>{state.total.toFixed(2)} $</span>
        </div>
        <div>
            <HiOutlineHashtag />
            <p>Quantity :</p>
            <span>{state.itemsCounter}</span>
        </div>
        <div>
            <LuBadgeCheck />
            <p>status :</p>
            {!state.checkout && <span>pending...</span>}
        </div>

        <button onClick={clickHandler}>Checkout</button>
    </div>
  )
}

export default BasketSideBar