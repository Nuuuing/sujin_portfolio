'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageFallbackProps {
    src: string;
    fallbackSrc?: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export const ImageWithFallback = (props: ImageFallbackProps) => {
    const { src, fallbackSrc, alt, className, width, height } = props;

    const [imgSrc, setImgSrc] = useState(src);

    return (
        <>
            {
                fallbackSrc !== undefined ? (
                    <Image
                        src={`${imgSrc}`}
                        alt={alt}
                        onError={() => setImgSrc(fallbackSrc)}
                        className={className}
                        width={width}
                        height={height}
                    />
                ) : (
                    <Image
                        src={`${imgSrc}`}
                        alt={alt}
                        className={className}
                        width={width}
                        height={height}
                    />

                )
            }
        </>
    );
}
