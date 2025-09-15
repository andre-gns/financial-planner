import React, { createContext, useContext, useState, ReactNode } from "react";

type ClientSelectionContext = {
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
};

const ClientContext = createContext<ClientSelectionContext | undefined>(
  undefined
);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedClientId, setSelectedClientId] = useState("");
  return (
    <ClientContext.Provider value={{ selectedClientId, setSelectedClientId }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClientSelection() {
  const ctx = useContext(ClientContext);
  if (!ctx)
    throw new Error("useClientSelection must be used within ClientProvider");
  return ctx;
}
