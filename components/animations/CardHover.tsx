"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cardHover } from "@/lib/animations";

interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

export default function CardHover({ children, className = "" }: CardHoverProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className={className}
    >
      {children}
    </motion.div>
  );
}

