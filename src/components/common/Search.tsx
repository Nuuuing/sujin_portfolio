'use client';

import React from "react";

interface SearchProps {
    title: string;
    children: React.ReactNode;
}

export const Search = ({ title, children }: SearchProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center mb-3 md:mb-4 w-full">
            <p className="font-medium text-xs md:text-sm w-auto md:w-20 p-1 md:p-2 whitespace-nowrap text-ink-soft text-center md:text-right">{title}</p>
            <div className="relative flex bg-cream rounded-full p-1 gap-1 w-fit max-w-full border border-line">
                {children}
            </div>
        </div>
    );
};
