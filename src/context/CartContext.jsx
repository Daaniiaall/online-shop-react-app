import { createContext, useContext, useReducer ,useEffect} from "react"

import { sumProducts } from "../helpers/helpers";


const CardContext = createContext();

const initialState = {
    // selectedItems = Array of Object
    selectedItems :[] ,
    itemsCounter :0 ,
    total :0 ,
    checkout: false ,
};

function reducer(state , action){
    // console.log({state , action})

    switch(action.type){
        case "ADD_ITEM" :
            // if user selects product that is not exist in shoppingBox(=selectedItems)
            if( !state.selectedItems.find((item)=> item.id === action.payload.id)) {
                state.selectedItems.push({...action.payload , quantity :1 , finalPrice:action.payload.price})
            }
            localStorage.setItem("basketInfo" , {...state})
            //  return an object:
            return {
                ...state ,
                checkout:false ,
                ...sumProducts(state.selectedItems) ,
            }

        case "REMOVE_ITEM" :
            // when user Remove an item that he previously selected
            const newSelectedItems = state.selectedItems.filter((item)=> item.id !== action.payload.id)
            // return an object:
            return {
                // because we changed state by Variable( =newSelectedItems ) ===> we should use this Variable in returned state
                selectedItems:[...newSelectedItems],
                checkout: false ,
                ...sumProducts(newSelectedItems)
            }

        case "INCREASE" :
            // findIndex = Array method 
            const increaseIndex = state.selectedItems.findIndex((item)=> item.id === action.payload.id)
            state.selectedItems[increaseIndex].quantity++ ;
            state.selectedItems[increaseIndex].finalPrice = action.payload.price * state.selectedItems[increaseIndex].quantity
            // return an object:
            return {
                ...state ,
                ...sumProducts(state.selectedItems),
            }

            
        case "DECREASE" :
            // findIndex : Array method 
            const decreaseIndex = state.selectedItems.findIndex((item)=> item.id === action.payload.id)
            state.selectedItems[decreaseIndex].quantity-- ;
            state.selectedItems[decreaseIndex].finalPrice = action.payload.price * state.selectedItems[decreaseIndex].quantity
            // return an object:
            return {
                ...state ,
                ...sumProducts(state.selectedItems),
            }
                
        case "CHECKOUT" :
            return {
                selectedItems :[] ,
                itemsCounter :0 ,
                total :0 ,
                checkout: true ,
            }

        default:
            throw new Error("invalid action")
            
    }
};


function CartProvider({children}) {

    const [state , dispatch] = useReducer(reducer , initialState);

    useEffect(function(){
        if(state !== initialState){
            localStorage.setItem("basketInfo" , JSON.stringify(state))
        }

      } , [state])

      useEffect(function(){
        const localStorageData = JSON.parse(localStorage.getItem("basketInfo"))
        console.log(localStorageData)
      } , [])

  return (
    <CardContext.Provider value={ {state:state , dispatch:dispatch} }>
        {children}
    </CardContext.Provider>
  )
}

// custom hook for access this context all over project
function useCart(){
    const {state , dispatch} = useContext(CardContext)
    return [state , dispatch];
}

export default CartProvider
export {useCart}