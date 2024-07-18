import { Link } from "react-router-dom";

import { TbListDetails } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";


import { productQuantity, shortenText } from "../helpers/helpers";


import styles from "./Card.module.css"

import { useDispatch, useSelector } from "react-redux";

import { addItem, decrease, increase, removeItem } from "../features/cart/cartSlice";


function Card({data}) {
    const {image , title , id , price} = data;

// redux
const state = useSelector((store)=>store.cart)
// console.log(state)

const dispatch = useDispatch();

// redux

// for access to SelectedProducts Quantity
    const quantity = productQuantity(state , id)

    

  return (
    <div className={styles.card}>
        <img src={image} alt={title} />
        <h3>{shortenText(title)}</h3>
        <p>{price} $</p>

        <div className={styles.actions}>

          <Link to={`/products/${id}`}>
            <TbListDetails />
          </Link>

          <div>
            {quantity === 1 && (<button onClick={()=>dispatch(removeItem(data))}><FaRegTrashCan /></button>)}

            {quantity > 1 && (<button onClick={()=>dispatch(decrease(data))}>-</button>)}

            {quantity !== 0 && <span>{quantity}</span>}

            {quantity === 0 ?
             (<button onClick={()=>dispatch(addItem(data))}><FaBagShopping /></button>) :
             (<button onClick={()=>dispatch(increase(data))}>+</button>)
            }


          </div>

        </div>
    </div>
  )
}

export default Card