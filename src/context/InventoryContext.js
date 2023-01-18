import { createContext, useReducer } from "react";

export const InventoryContext = createContext();

// 'state' => previous state before changes ... 'action' => the object passed into dispatch (Type property and payload property)
export const inventoryReducer = (state, action) => {
  switch (action.type) {
    // Populate the games array
    case "SET_GAMES":
      return {
        games: action.payload,
      };

    // Add a new value into the games array
    case "CREATE_GAME":
      return {
        games: [action.payload, ...state.games],
      };

    case "DELETE_GAME":
      return {
        games: state.games.filter((game) => game._id !== action.payload._id),
      };

    default:
      return state;
  }
};

// The children prop is the App component meaning that all components will be able to use this context and its values
export const InventoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    games: null,
    showModal: false,
  });
  // All components will have access to state and dispatch
  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};
