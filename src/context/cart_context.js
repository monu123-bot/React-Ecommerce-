import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductontext } from "./ProductContext";
import reducer from "../reducer/cartReducer"
const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const getLocalcartData = ()=>{
    let newD = localStorage.getItem("cartData")
    // if (newD===[])
    // {return []}
    // else{
    //   return JSON.parse(newD)
    // }
    const parseData =  JSON.parse(newD)
    if(!Array.isArray(parseData)) return []
    return parseData
  }
    const initialState ={
     cart:getLocalcartData(),
     total_item:0,
     total_amount:0,
     shipping_fee:50000
    }
  const { products } = useProductontext();
  const [state, dispatch] = useReducer(reducer, initialState);
  
useEffect(()=>{
  dispatch({type:"CART_TOTAL_ITEM"})
  dispatch({type:"CART_TOTAL_PRICE"})
  localStorage.setItem("cartData",JSON.stringify(state.cart))
},[state.cart])
 const removeItem = (id)=>{
  let cartId =id
  
  dispatch({type:"REMOVE_FROM_CART",payload:id})
  dispatch({type:"CART_TOTAL_PRICE"})

 }
 const clearCart = ()=>{

  dispatch({type:"CLEAR_CART"})
 }
 const setDecrease = (id)=>{
  
    dispatch({type:"SET_DECREMENT",payload:id})
    dispatch({type:"CART_TOTAL_PRICE"})
 }
 const setIncrease = (id)=>{
  
  dispatch({type:"SET_INCREMENT",payload:id})
  dispatch({type:"CART_TOTAL_PRICE"})
 }
  const updateCart = (id,color,amount,product)=>{
   
    dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}})
  
  }
  return (
    <CartContext.Provider
      value={{ ...state, updateCart,removeItem,clearCart,setDecrease,setIncrease}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};