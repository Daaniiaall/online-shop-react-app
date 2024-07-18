import { shortenText } from "../helpers/helpers"

import { FaRegTrashCan } from "react-icons/fa6";

import styles from "./BasketCard.module.css"
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../features/cart/cartSlice";



function BasketCard({data}) {

    // console.log(data)

    const {image , title , quantity , price , finalPrice} = data

    const dispatch = useDispatch();

  return (
    <div className={styles.card}>
        <img src={image} alt={title} />
        <p>{shortenText(title)}</p>
        <p>{price} $</p>
        <p>Final Price :{finalPrice.toFixed(2)} $</p>
        <div className={styles.actions}>
            {quantity === 1 && <button onClick={()=>dispatch(removeItem(data))}><FaRegTrashCan /></button>}
            {quantity > 1 && <button onClick={()=>dispatch(decrease(data))}>-</button>}
            <span>{quantity}</span>
            <button onClick={()=>dispatch(increase(data))}>+</button>
        </div>
    </div>
  )
}

export default BasketCard