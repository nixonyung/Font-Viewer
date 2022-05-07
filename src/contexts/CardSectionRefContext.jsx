import { createContext, useRef } from "react";

export const CardSectionRefContext = createContext(null);

export default function CardSectionRefProvider({ children }) {
  const CardSectionRef = useRef(null);

  return (
    <CardSectionRefContext.Provider value={CardSectionRef}>
      {children}
    </CardSectionRefContext.Provider>
  );
}
