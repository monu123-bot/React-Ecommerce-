const filterReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_FILTER_PRODUCTS":
        let maxPrice = 6000000
        return {
          ...state,
          filter_products: [...action.payload],
          all_products: [...action.payload],
          filters:{...state.filters,maxPrice,price:maxPrice}
        };
      case "SET_GRID_VIEW":
        return {
          ...state,
          grid_view: true,
        };
     case "SET_LIST_VIEW":
        return {
            ...state,
            grid_view:false
        }
    case "GET_SORT_VALUE":
        let sort_value = action.payload
        return {
            ...state,
            sorting_value:sort_value
        }
    case "GET_SORT_DATA":
        let newSortData
   let tempSortData = [...action.payload]
   if(state.sorting_value==='a-z'){
    newSortData = tempSortData.sort((a,b)=>{
     return a.name.localeCompare(b.name)
    })
   }
   if(state.sorting_value==='z-a'){
    newSortData = tempSortData.sort((a,b)=>{
     return b.name.localeCompare(a.name)
    })
   }
   if(state.sorting_value==='lowest'){
    const sortingProducts =(a,b)=>{
        return a.price-b.price
    }
    newSortData = tempSortData.sort(sortingProducts) 
   }
   if(state.sorting_value==='highest'){
    const sortingProducts =(a,b)=>{
        return b.price-a.price
    }
    newSortData = tempSortData.sort(sortingProducts) 
   }
   return {
    ...state,
    filter_products:newSortData
   }
   case "UPDATE_FILTER_VALUE":
   let  {name,value} = action.payload
     return{
        ...state,
        filters:{
            ...state.filters,[name]:value
        }
     }
     case "FILTER_PRODUCTS":
        let {all_products} = state;
        let tempFilterProducts = [...all_products]
        const {text,category,company,color,price} = state.filters
    
        if (text){
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
                return currEle.name.toLowerCase().includes(text)
            })
        }
       
        if (category){
          if (category==='All'){
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
              
               return currEle
              
           })
          }
          else{
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
              if (currEle.category===category){
               return currEle
              }
           })
          }
          
        }
       
        if (company){
          if (company==='All'){
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
              
              return currEle
             
          })
          }
          else{
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
              if (currEle.company===company){
               return currEle
              }
           })
          }
          
        }
        if (color){
          if (color==='All'){
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
               return currEle
           })
          }
          else{
            tempFilterProducts = tempFilterProducts.filter((currEle)=>{
              if (currEle.colors.includes(color)){
               return currEle
              }
           })
          }
        }
        if(price){
          tempFilterProducts = tempFilterProducts.filter((currEle)=>{
            if (currEle.price<=price){
             return currEle
            }
         })
        }
    
        return {
            ...state,
            filter_products:tempFilterProducts
        }
      case "CLEAR_FILTERS":
      
        return {
          ...state,
          filters:{
            text:"",
            category:"All",
            company:"All",
            color:"All",
            price:6000000,
            maxPrice:6000000,
            minPrice:0
        
          }
        }
      default:
        return state;
    }
  };
  export default filterReducer;