import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const NoNotes = () => {
  return (
    <div className=" flex flex-col items-center justify-center w-full h-64 bg-yellow-100 border-2 border-dashed border-yellow-300 rounded-3xl p-6 text-center">
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
    </div>
  );
};

export default NoNotes;
