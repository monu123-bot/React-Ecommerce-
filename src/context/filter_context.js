import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductontext } from "./ProductContext";
import reducer from "../reducer/filterReducer";
import { Action } from "@remix-run/router";
const FilterContext = createContext();
const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: false,
  sorting_value: "lowest",
  filters:{
    text:"",
    category:"All",
    company:"All",
    color:"All",
    price:6000000,
    maxPrice:6000000,
    minPrice:0
  }
};
export const FilterContextProvider = ({ children }) => {
  const { products } = useProductontext();
  const [state, dispatch] = useReducer(reducer, initialState);
  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };
  const sorting = (e)=>{ 
    let val=e.target.value
    dispatch({type:"GET_SORT_VALUE",payload:val})
  }
  const updateFilterValue = (e)=>{
    let name = e.target.name
    let value = e.target.value
    
    dispatch({type:"UPDATE_FILTER_VALUE",payload:{name,value}})
    
  }
  const clearFilters = ()=>{
    
    dispatch({type:"CLEAR_FILTERS"})
  }
  useEffect(()=>{
    dispatch({type:"GET_SORT_DATA",payload:state.filter_products})
  },[state.sorting_value])
 useEffect(()=>{
  dispatch({type:"FILTER_PRODUCTS"})
 },[state.filters])
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider
      value={{ ...state, setGridView,setListView,sorting ,updateFilterValue,clearFilters}}>
      {children}
    </FilterContext.Provider>
  );
};
export const useFilterContext = () => {
  return useContext(FilterContext);
};