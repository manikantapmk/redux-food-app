export const ADD = (item) =>{
    return {
        type: "ADD_CART",
        payload: item
    }
}


export const DEL = (id) =>{
    return {
        type: "DEL_CART",
        payload: id
    }
}

export const incrementQuantity = (id) => ({
    type: "INCREMENT_QUANTITY",
    payload: id
  });
  
  export const decrementQuantity = (id) => ({
    type: "DECREMENT_QUANTITY",
    payload: id
  });
  