"use client";

import { useMyContext } from "@/context/context";
import { motion } from "framer-motion";
import { Clock, Rabbit } from "lucide-react";

export const NoNotes = () => {
  return (
    <motion.div
      key={"NoNotes"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" flex flex-col items-center justify-center w-full h-64 bg-yellow-100 border-2 border-dashed border-yellow-300 rounded-3xl p-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="h-16 w-16 mb-4 text-yellow-400"
      >
        <Clock size={60} />
      </motion.div>

      <h2 className="text-xl font-bold mb-2 text-yellow-700">No Notes Yet!</h2>
      <p className="text-sm text-yellow-800 opacity-80">
        Your notes will appear here. Click "Add Note" to create your first note.
      </p>
    </motion.div>
  );
};

export const NoSearchNotes = () => {
  const { searchQuery, setSearchQuery } = useMyContext();
  return (
    <motion.div
      key={"NoSearchNotes"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className=" flex flex-col items-center justify-center w-full h-64 bg-yellow-100 border-2 border-dashed border-yellow-300 rounded-3xl p-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="h-16 w-16 mb-4 text-yellow-400"
      >
        <Rabbit size={60} />
      </motion.div>

      <h2 className="text-2xl font-bold mb-2 text-yellow-700">
        No result for "{searchQuery}"
      </h2>
      <p className="text-md text-yellow-800 opacity-80">
        This note might exist in the future… but it hasn’t created yet.
      </p>

      <div className="mt-2 space-y-1">
        <p className="text-sm">
          This note doesn’t seem to exist… yet. Try searching similar terms,
        </p>
        <button
          onClick={() => setSearchQuery("")}
          className="bg-red-600 text-white p-2 rounded-2xl cursor-pointer active:scale-95"
        >
          Clear search & try again
        </button>
      </div>
    </motion.div>
  );
};
