"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMyContext } from "@/context/context";

const Navbar = () => {
  const { setCreateNoteClr, setShowNoNotesCon } = useMyContext();
  const [activeClrOpts, setActiveClrOpts] = useState(false);

  const notesTheme = [
    "bg-amber-200",
    "bg-orange-300",
    "bg-purple-200",
    "bg-cyan-300",
    "bg-lime-200",
  ];

  // Parent animation (handles stagger)
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

  // Child animation (each button)
  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <>
      <div className="flex sm:flex-col border-r border-r-gray-200 px-4 p-4 sm:py-8 items-center sm:gap-12 justify-between sm:justify-start ">
        <h1 className="font-bold">
          <i>Quicknotes</i>
        </h1>

        <button
          onClick={() => {
            setActiveClrOpts((prev) => !prev);
          }}
          className={`w-fit p-2 rounded-full bg-black transition-transform duration-300 hover:rotate-90 active:scale-95 active:duration-100 cursor-pointer ${
            activeClrOpts && "rotate-45 hover:rotate-135"
          }`}
        >
          <Plus className="text-white " />
        </button>
        <AnimatePresence mode="wait">
          {activeClrOpts && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden w-full sm:flex sm:flex-col items-center gap-4 text-black overflow-hidden py-2"
            >
              {notesTheme.map((bgClr) => (
                <motion.button
                  key={bgClr}
                  variants={itemVariants}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => {
                    setCreateNoteClr(bgClr);
                    setShowNoNotesCon(false);
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-6 h-6 rounded-full cursor-pointer ${bgClr} active:scale-95`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mx-auto">
        <AnimatePresence mode="wait">
          {activeClrOpts && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="sm:hidden w-full flex sm:flex-col items-center gap-4 text-black overflow-hidden p-2 mb-4"
            >
              {notesTheme.map((bgClr) => (
                <motion.button
                  key={bgClr}
                  variants={itemVariants}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => {
                    setCreateNoteClr(bgClr);
                    setShowNoNotesCon(false);
                    setActiveClrOpts(false);
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-6 h-6 rounded-full cursor-pointer ${bgClr} active:scale-95`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
