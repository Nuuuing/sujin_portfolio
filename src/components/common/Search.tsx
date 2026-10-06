'use client';

import React from "react";

interface SearchProps {
    title: string;
    children: React.ReactNode;
}

export const Search = ({ title, children }: SearchProps) => {
    return (
        <div className="mb-3 flex w-full flex-col items-center justify-center md:flex-row">
            <p className="eyebrow w-auto whitespace-nowrap p-1 text-center md:w-20 md:p-2 md:text-right">{title}</p>
            <div className="relative flex w-fit max-w-full gap-1 border border-line bg-card-soft p-1">
                {children}
            </div>
        </div>
    );
};
