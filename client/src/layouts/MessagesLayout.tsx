import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export function MessagesLayout({ children }: Props) {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 }
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-50 dark:bg-[#0f0f0f] pt-16">
      <motion.div
        className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="space-y-4">{children}</div>
      </motion.div>
    </main>
  );
}
