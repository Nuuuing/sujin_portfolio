'use client';

import { useState, useEffect } from 'react';

const DEFAULT_FALLBACK = '/preparing.png';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    fallbackSrc?: string;
    className?: string;
    width?: number;
    height?: number;
    hideOnError?: boolean;
    onHidden?: () => void;
}

export const ImageWithFallback = ({
    src,
    alt,
    fallbackSrc = DEFAULT_FALLBACK,
    className,
    width,
    height,
    hideOnError = false,
    onHidden
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src || fallbackSrc);
        setHasError(false);
    }, [src, fallbackSrc]);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            if (hideOnError) {
                onHidden?.();
                return;
            }
            setImgSrc(fallbackSrc);
        }
    };

    useEffect(() => {
        if (hideOnError && (!src || src === '-')) {
            onHidden?.();
        }
    }, [hideOnError, onHidden, src]);

    if (hideOnError && (!src || src === '-' || hasError)) {
        return null;
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            className={className}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
        />
    );
};
