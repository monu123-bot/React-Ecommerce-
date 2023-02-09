import { createContext, useContext, useEffect, useReducer } from "react";
import { json } from "react-router-dom";
import axios from "axios"
import  reducer  from "../reducer/productReducer";


const AppContext = createContext()
const API = "https://api.pujakaitem.com/api/products"
const initialState = {
    isLoading:false,
    isError:false,
    products:[],
    featureProducts:[],
    isSingleLoading:true,
    isSingleError:false,
    singleProduct:{}
}
const AppProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialState)
    const getData =async (url)=>{
        dispatch({type:"SET_LOADING"})
        try {
            const res = await axios.get(url)
           

            const product = await res.data
            dispatch({type:"MY_API_DATA",payload:product}) 
            // return json(data)
        } catch (error) {
            // return error
         
            dispatch({type:"API_ERROR"}) 
        }
    }
   
    const getSingleProduct = async (url)=>{
        dispatch({type:"SET_SINGLE_LOADING"}) 
        try {
            const singleP = await axios.get(url)
            const singleProd = await singleP.data
          
            dispatch({type:"SINGLE_PROD_DATA",payload:singleProd})

            
        } catch (error) {
            dispatch({type:"SET_SINGLE_ERROR"}) 
        }
    }
   useEffect(()=>{
    getData(API)
   },[])
    return <AppContext.Provider value={{ ...state,getSingleProduct }}>{children}</AppContext.Provider>
}

const useProductontext = ()=>{

    return useContext(AppContext)
}
export {AppContext,AppProvider,useProductontext}