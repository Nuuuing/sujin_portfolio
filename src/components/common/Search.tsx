'use client';

import React from "react";

interface SearchProps {
    title: string;
    children: React.ReactNode;
}

export const Search = ({ title, children }: SearchProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center mb-3 md:mb-4 w-full">
            <p className="font-medium text-xs md:text-sm w-auto md:w-20 p-1 md:p-2 whitespace-nowrap text-gray-500 dark:text-gray-500 text-center md:text-right">{title}</p>
            <div className="relative flex bg-[#e8e8e8] dark:bg-[#2a2a2a] rounded-full p-1 gap-1 w-fit max-w-full">
                {children}
            </div>
        </div>
    );
};
