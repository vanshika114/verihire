"use client";

import { motion } from "framer-motion";

const orbitNodes = [
  { label: "OCR", position: "top-2 left-1/2 -translate-x-1/2" },
  { label: "Signals", position: "right-0 top-1/2 -translate-y-1/2" },
  { label: "Reports", position: "bottom-2 left-1/2 -translate-x-1/2" },
  { label: "Score", position: "left-0 top-1/2 -translate-y-1/2" },
];

export function CheckingAnimation() {
  return (
    <div className="relative flex h-64 items-center justify-center">
      <motion.div
        className="absolute h-56 w-56 rounded-full border border-cyan-400/25"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 2.3, repeat: Infinity }}
      />
      <motion.div
        className="absolute h-40 w-40 rounded-full border border-emerald-400/20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
      />

      <motion.div
        className="relative flex h-32 w-32 items-center justify-center rounded-[28px] border border-white/30 bg-slate-950/80 text-center shadow-[0_20px_60px_-20px_rgba(34,211,238,0.35)] backdrop-blur-xl"
        animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">trust engine</div>
          <div className="mt-2 text-lg font-semibold text-white">Verifying</div>
        </div>
      </motion.div>

      {orbitNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className={`absolute ${node.position}`}
          animate={{ opacity: [0.7, 1, 0.7], y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 2 + index * 0.35, repeat: Infinity }}
        >
          <div className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur">
            {node.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
