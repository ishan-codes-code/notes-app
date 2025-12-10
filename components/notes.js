"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMyContext } from "@/context/context";
import { Pencil, Trash, X, Save, Copy, Check } from "lucide-react";
import { NoNotes, NoSearchNotes } from "./noNotes";
import EditModal from "./editNote";
import { toast } from "sonner";

export default function NotesWrapper() {
  const {
    createNoteClr,
    setCreateNoteClr,
    setNotes,
    notes,
    showNoNotesCon,
    setShowNoNotesCon,
    searchQuery,
  } = useMyContext();
  const [note, setNote] = useState("");
  const [editNote, setEditNote] = useState({});
  const [sortedNotes, setSortedNotes] = useState(notes);
  const [showCopy, setShowCopy] = useState("");

  const saveNote = () => {
    if (!note) {
      toast.warning("Note cannot be empty");
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
    toast.success("Note saved succesfully");
  };

  const deleteNote = (n) => {
    setNotes((prev) => prev.filter((p) => p.id !== n.id));

    toast.success("Deleted Successfully!", {
      action: {
        label: "Undo",
        onClick: () => setNotes((prev) => [n, ...prev]), // ← FIX
      },
    });
  };

  const searchNotes = () => {
    if (searchQuery) {
      setSortedNotes(
        notes.filter((n) =>
          n.note.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  const handleCopy = (n) => {
    navigator.clipboard.writeText(n.note);
    toast.success("Text copied successfully");

    setShowCopy(n.id);

    setTimeout(() => {
      setShowCopy("");
    }, 10000);
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    setSortedNotes(notes);

    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (!searchQuery) setSortedNotes(notes);
    const timeout = setTimeout(() => searchNotes(), 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <AnimatePresence mode="wait">
      {notes.length === 0 && showNoNotesCon ? (
        <NoNotes />
      ) : sortedNotes.length === 0 && showNoNotesCon ? (
        <NoSearchNotes />
      ) : (
        <motion.div
          layout
          key={"con"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className={`text-black columns-1 sm:columns-2 lg:columns-3 gap-4`}
          transition={{
            layout: { type: "spring", stiffness: 120, damping: 14 },
          }}
        >
          {/* New note card */}
          {createNoteClr && (
            <motion.div
              layout
              key={createNoteClr}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className={`${createNoteClr} rounded-3xl p-4 mb-4 break-inside-avoid text-black border flex flex-col`}
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
                  className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer hover:scale-110"
                >
                  <X size={18} />
                </button>
                <button
                  onClick={() => {
                    saveNote();
                    setShowNoNotesCon(true);
                  }}
                  className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer hover:scale-110"
                >
                  <Save size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Regular notes */}
          {sortedNotes.map((n) => (
            <motion.div
              layout
              key={n.id}
              layoutId={n.id}
              title={n.lastEdited && `Last edited on ${n.lastEdited}`}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className={`${
                n.themeClr
              } rounded-3xl p-4 mb-4 break-inside-avoid flex flex-col gap-2 relative ${
                n.id === editNote.id && "invisible"
              }`}
            >
              <span className="absolute right-0 mr-4 text-gray-800">
                <AnimatePresence mode="wait">
                  {showCopy != n.id ? (
                    <motion.button
                      title="copy"
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, y: 0 }}
                      transition={{ duration: 0.4, ease: "anticipate" }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 rounded-lg cursor-pointer hover:bg-black/10 hover:backdrop-blur-xl  "
                      onClick={() => handleCopy(n)}
                    >
                      <Copy size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      disabled
                      key="check"
                      title="copied"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.4, ease: "anticipate" }}
                      className="p-1 rounded-lg cursor-pointer hover:bg-black/10 hover:backdrop-blur-xl "
                    >
                      <Check size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </span>
              <p className="text-md font-semibold h-full whitespace-pre-wrap ">
                {n.note}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-sm">{n.createdAt}</p>
                <div className="flex items-center gap-2">
                  <button
                    title="Edit"
                    onClick={() => {
                      setEditNote(n);
                    }}
                    className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    title="Delete"
                    onClick={() => deleteNote(n)}
                    className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          <AnimatePresence mode="wait">
            {editNote.id && (
              <EditModal
                onClose={() => {
                  setEditNote({});
                }}
                editNote={editNote}
                setEditNote={setEditNote}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
