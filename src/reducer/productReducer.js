const productReducer = (state,action)=>{
    switch (action.type) {
        case "SET_LOADING":
            return {
                  ...state,
                  isLoading:true
            }
            case "MY_API_DATA":
                const featureData = action.payload.filter((currE)=>{
                    return (
                        currE.featured ===true
                    )
                })
                return{
                  ...state,
                  isLoading:false,
                  isError:false,
                  products:action.payload,
                  featureProducts:featureData
                }
        case "API_ERROR":
            return{
              ...state,
              isLoading:false,
              isError:true
            }
            case "SET_SINGLE_LOADING":
                return {
                      ...state,
                      isSingleLoading:true
                }
                case "SINGLE_PROD_DATA":
                    
                    return{
                      ...state,
                      isSingleLoading:false,
                      isSingleError:false,
                      
                      singleProduct:action.payload
                    }
            case "SET_SINGLE_ERROR":
                return{
                  ...state,
                  isSingleLoading:false,
                  isSingleError:true
                }
            default:
                return state
    }
    
}
export default productReducer