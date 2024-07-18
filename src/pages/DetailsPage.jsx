import { Link, useParams } from "react-router-dom"

import { FaLayerGroup } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsData } from "../features/product/productSlice";
import styles from "./DetailsPage.module.css"
import Loader from "../components/Loader";


function DetailsPage() {

  // access to id
  const {id} = useParams();

   const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchProductsData())
    // console.log("first")
  } , [])

  // access to Details of selected product
  // const productDetails = useProductDetails(+id)
  const productDetails = useSelector((store)=>store.products.products.find((item)=> item.id === +id))
  // console.log(productDetails)

  if(!productDetails) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <FaLayerGroup />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <ImPriceTag />
            {productDetails.price} $
          </span>

          <Link to="/products">
            <MdOutlineKeyboardBackspace />
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage