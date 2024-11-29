const INIT_STATE = {
    carts: []
  };
  
  export const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "ADD_CART":
        // Check if the item already exists in the cart
        const existingItem = state.carts.find((el) => el.id === action.payload.id);
        if (existingItem) {
          // If it exists, update the quantity
          return {
            ...state,
            carts: state.carts.map((el) =>
              el.id === action.payload.id
                ? { ...el, quantity: el.quantity + 1 }
                : el
            )
          };
        }
        // If it doesn't exist, add it with an initial quantity of 1
        return {
          ...state,
          carts: [...state.carts, { ...action.payload, quantity: 1 }]
        };
  
      case "DEL_CART":
        const data = state.carts.filter((el) => el.id !== action.payload);
        return {
          ...state,
          carts: data
        };
  
      case "INCREMENT_QUANTITY":
        return {
          ...state,
          carts: state.carts.map((el) =>
            el.id === action.payload
              ? { ...el, quantity: el.quantity + 1 }
              : el
          )
        };
  
      case "DECREMENT_QUANTITY":
        return {
          ...state,
          carts: state.carts.map((el) =>
            el.id === action.payload
              ? { ...el, quantity: el.quantity > 1 ? el.quantity - 1 : 1 }
              : el
          )
        };
  
      default:
        return state;
    }
  };
  