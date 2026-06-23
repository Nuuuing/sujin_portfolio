'use client';

import { useState, useEffect } from 'react';
import { convertDriveUrl } from '@/utils';

const DEFAULT_FALLBACK = '/preparing.png';

// 표시 불가로 간주하는 src (빈값 / '-' / preparing 플레이스홀더)
const isUnusableSrc = (value?: string): boolean => {
    if (!value) return true;
    const v = value.trim();
    return v === '' || v === '-' || v.includes('preparing.png');
};

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
    // convertDriveUrl은 멱등이라 이미 변환된 값(http/슬래시 경로)은 그대로 통과한다.
    // 호출부가 변환을 누락했더라도 여기서 한 번 더 안전하게 정규화.
    const normalizedSrc = convertDriveUrl(src);
    const invalidSrc = isUnusableSrc(src);

    const [imgSrc, setImgSrc] = useState(invalidSrc ? fallbackSrc : normalizedSrc);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(invalidSrc ? fallbackSrc : normalizedSrc);
        setHasError(false);
    }, [normalizedSrc, fallbackSrc, invalidSrc]);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            if (hideOnError) {
                onHidden?.();
                return;
            }
            // fallback이 또 실패해도 hasError가 true라 재진입하지 않음 (무한 루프 방지)
            setImgSrc(fallbackSrc);
        }
    };

    useEffect(() => {
        if (hideOnError && invalidSrc) {
            onHidden?.();
        }
    }, [hideOnError, onHidden, invalidSrc]);

    if (hideOnError && (invalidSrc || hasError)) {
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
