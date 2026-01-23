"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { pageTransition } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setDisplayChildren(children);
  }, [pathname, children]);

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      variants={pageTransition}
    >
      {displayChildren}
    </motion.div>
  );
}

