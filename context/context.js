"use client";
import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [createNoteClr, setCreateNoteClr] = useState("");
  const [notes, setNotes] = useState([]);
  const [showNoNotesCon, setShowNoNotesCon] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MyContext.Provider
      value={{
        createNoteClr,
        setCreateNoteClr,
        notes,
        setNotes,
        showNoNotesCon,
        setShowNoNotesCon,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
