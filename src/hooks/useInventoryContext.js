import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export const useInventoryContext = () => {
  // This hook returns the value of this context, in this case - (state, dispatch)
  const context = useContext(InventoryContext);

  if (!context) {
    throw Error(
      "useInventoryContext must be used inside an InventoryContextProvider"
    );
  }

  return context;
};
