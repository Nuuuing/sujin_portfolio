'use client';

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
        <img
            src={imgSrc}
            alt={alt}
            onError={() => fallbackSrc && setImgSrc(fallbackSrc)}
            className={className}
            width={width}
            height={height}
        />
    );
}
