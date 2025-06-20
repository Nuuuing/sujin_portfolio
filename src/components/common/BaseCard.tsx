'use client';

import { motion } from "motion/react";


interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const BaseCard = (props: BaseCardProps) => {
  const { children, className = "", hoverEffect = true } = props;

  return (
    <motion.div
      whileHover={ hoverEffect ? { scale: 1.02 } : {}}
      className={`rounded-2xl shadow-md p-4 bg-[#f0f0f0] dark:bg-[#353535] transition-colors duration-300 ${className} cursor-pointer`}
    >
      {children}
    </motion.div>
  )
}