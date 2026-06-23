'use client';

import { motion } from "motion/react";


interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  backgroundImage?: string;
  onClick?: () => void;
  isSelected?: boolean;
  selectedClassName?: string;
  defaultClassName?: string;
}

export const BaseCard = (props: BaseCardProps) => {
  const {
    children,
    className = "",
    hoverEffect = true,
    backgroundImage,
    onClick,
    isSelected,
    selectedClassName = "",
    defaultClassName = "bg-[var(--bg-card)]"
  } = props;

  const bgClass = isSelected !== undefined
    ? (isSelected ? selectedClassName : defaultClassName)
    : defaultClassName;

  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl shadow-md p-4 transition-all duration-300 ${bgClass} ${className} cursor-pointer`}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-md"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}