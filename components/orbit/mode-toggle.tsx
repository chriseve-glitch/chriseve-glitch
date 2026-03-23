"use client";

import { motion } from "framer-motion";
import { Car, Users } from "lucide-react";

interface ModeToggleProps {
  isDriverMode: boolean;
  onToggle: () => void;
}

export function ModeToggle({ isDriverMode, onToggle }: ModeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      className="relative flex h-11 w-48 items-center rounded-full bg-secondary p-1 shadow-inner"
    >
      {/* Active indicator */}
      <motion.div
        className="absolute h-9 w-[92px] rounded-full bg-primary shadow-lg shadow-primary/30"
        animate={{ x: isDriverMode ? 94 : 4 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      />

      {/* Rider option */}
      <span
        className={`relative z-10 flex w-[92px] items-center justify-center gap-2 text-sm font-bold transition-colors duration-300 ${
          !isDriverMode ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        <Users className="h-4 w-4" />
        Rider
      </span>

      {/* Driver option */}
      <span
        className={`relative z-10 flex w-[92px] items-center justify-center gap-2 text-sm font-bold transition-colors duration-300 ${
          isDriverMode ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        <Car className="h-4 w-4" />
        Driver
      </span>
    </motion.button>
  );
}
