import React, { useState } from "react";
import { motion, scale } from "framer-motion";
import { X, Save } from "lucide-react";
import { toast } from "sonner";
import { useMyContext } from "@/context/context";

const EditModal = ({ onClose, editNote }) => {
  const { setNotes } = useMyContext();
  const [note, setNote] = useState(editNote.note);
  const [themeClr, setThemeClr] = useState(editNote.themeClr);

  const saveEditedNote = () => {
    if (editNote.note === note && themeClr === editNote.themeClr) {
      toast.info("No changes made");
      return;
    }
    if (note.trim().length === 0) {
      toast.warning("Note can't be empty");
      return;
    }

    setNotes((prev) =>
      prev.map((n) =>
        n.id === editNote.id
          ? {
              ...n,
              note,
              themeClr,
              lastEdited: new Date().toLocaleDateString("en-US", {
                month: "short", // full month name
                day: "numeric", // day without leading zero
                year: "numeric", // full year
              }),
            }
          : n
      )
    );
    toast.success("Note edited successfully ");
    onClose();
  };

  const notesTheme = [
    "bg-amber-200",
    "bg-orange-300",
    "bg-purple-200",
    "bg-cyan-300",
    "bg-lime-200",
  ];

  const containerVariants = {
    hidden: { transition: { when: "afterChildren" } },
    show: {
      transition: {
        duration: 0.3,

        staggerChildren: 0.08, // each button pops slightly after the previous
        delayChildren: 0.1, // wait before starting the sequence
      },
    },
    exit: { transition: { when: "beforeChildren" } },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm max-h-screen max-w-screen overflow-hidden flex items-center justify-center flex-col-reverse sm:flex-row gap-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layoutId={editNote.id}
        onClick={(e) => e.stopPropagation()}
        className={`p-8 rounded-2xl shadow-2xl w-[90%] h-[50%]  max-w-md text-center cursor-pointer ${themeClr} rounded-3xl flex flex-col gap-4`}
      >
        <div className="flex items-center gap-2 justify-center">
          <h2 className="font-bold text-3xl ">Edit note</h2>
          <img
            src="./edit.gif"
            className="h-10 w-10 mix-blend-multiply"
            alt=""
          />
        </div>
        <textarea
          autoFocus
          type="text"
          className="h-full w-full outline-none"
          placeholder="My new note..."
          value={note}
          //   onChange={(e) =>
          //     setEditNote((prev) => ({ ...prev, note: e.target.value }))
          //   }
          onChange={(e) => setNote(e.target.value)}
        >
          {/* My new notes */}
        </textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer hover:scale-110"
          >
            <X size={18} />
          </button>
          <button
            onClick={() => saveEditedNote()}
            className="w-fit p-2 rounded-full bg-black text-white active:scale-95 transition-all cursor-pointer hover:scale-110"
          >
            <Save size={18} />
          </button>
        </div>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
        className="flex sm:flex-col justify-center items-start gap-4 text-black  p-2 mb-4"
      >
        {notesTheme.map((bgClr) => (
          <motion.button
            key={bgClr}
            disabled={themeClr === bgClr}
            variants={itemVariants}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: themeClr != bgClr && 1.3 }}
            onClick={() => {
              setThemeClr(bgClr);
            }}
            className={`w-6 h-6 rounded-full cursor-pointer ${bgClr} active:scale-95 ${
              themeClr === bgClr && "scale-130"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EditModal;
