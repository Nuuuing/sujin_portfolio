'use client'

import Image from 'next/image';

export const Header = () => {
    return (
        <div className="fixed top-4 left-4 z-50 w-[15rem] h-18">
            <Image
                src={`${process.env.BASE_PATH}/logo.png`}
                alt="Logo"
                className="object-contain "
                width={150}
                height={50} 
            />
        </div>
    )
}