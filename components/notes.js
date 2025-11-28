"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMyContext } from "@/context/context";
import { Pencil, Trash } from "lucide-react";
import NoNotes from "./noNotes";

export default function SimpleGrid() {
  const {
    createNoteClr,
    setCreateNoteClr,
    setNotes,
    notes,
    showNoNotesCon,
    setShowNoNotesCon,
  } = useMyContext();
  const [note, setNote] = useState("");

  const boxes = [
    "bg-amber-200",
    "bg-orange-300",
    "bg-purple-200",
    "bg-cyan-300",
    "bg-lime-200",
  ];
  const saveNote = () => {
    if (!note) {
      alert("Note cannot be empty");
      return;
    }

    const newNote = {
      id: Date.now(),
      note,
      themeClr: createNoteClr,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short", // full month name
        day: "numeric", // day without leading zero
        year: "numeric", // full year
      }),
    };
    setNotes([newNote, ...notes]);
    setNote("");
    setCreateNoteClr("");
    alert("Note saved succesfully");
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return notes.length === 0 && showNoNotesCon ? (
    <NoNotes />
  ) : (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 text-black"
      transition={{ layout: { type: "spring", stiffness: 120, damping: 14 } }}
    >
      {/* New note card */}
      {createNoteClr && (
        <motion.div
          layout
          key={createNoteClr}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className={`${createNoteClr} rounded-3xl p-4 w-64 h-64 mx-auto text-black border flex flex-col`}
        >
          <textarea
            autoFocus
            type="text"
            className="h-full w-full outline-none"
            placeholder="My new note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          >
            {/* My new notes */}
          </textarea>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setCreateNoteClr(false);
                setShowNoNotesCon(true);
              }}
              className="block mt-4 border rounded px-3 py-1 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                saveNote();
                setShowNoNotesCon(true);
              }}
              className="block mt-4 border rounded px-3 py-1 text-sm hover:bg-gray-100"
            >
              Save
            </button>
          </div>
        </motion.div>
      )}

      {/* Regular notes */}
      {notes.map((n) => (
        <motion.div
          key={n.id}
          layout
          className={`${n.themeClr} rounded-3xl p-4 w-64 h-64 mx-auto flex flex-col gap-2`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
        >
          <p className="text-md font-semibold h-full">{n.note}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm">{n.createdAt}</p>
            <div className="flex items-center gap-2">
              <button className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer">
                <Pencil size={18} />
              </button>

              <button
                onClick={() => {
                  setNotes((prev) => prev.filter((p) => p.id != n.id));
                }}
                className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
