"use client";
import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [createNoteClr, setCreateNoteClr] = useState("");
  const [notes, setNotes] = useState([]);
  const [showNoNotesCon, setShowNoNotesCon] = useState(true);

  return (
    <MyContext.Provider
      value={{
        createNoteClr,
        setCreateNoteClr,
        notes,
        setNotes,
        showNoNotesCon,
        setShowNoNotesCon,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
