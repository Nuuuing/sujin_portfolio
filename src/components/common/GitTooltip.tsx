'use client';

import { ImageWithFallback } from './ImageFallback';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const gitIcon = `${process.env.BASE_PATH}/icon/github_logo.png`;

interface GitTooltipProps {
    url: string[];
}

export const GitTooltip = ({ url }: GitTooltipProps) => {
    const isMulti = url.length > 1;

    return (
        <>
            {url.map((urlItem: string, index: number) => {
                const tooltipId = `git-tooltip-${index}`;
                const tooltipContent = isMulti
                    ? index === 0
                        ? 'Front Git Repository'
                        : index === 1
                            ? 'Back Git Repository'
                            : 'Git Repository'
                    : 'Git Repository';

                return (
                    <div key={`git${index}`} className="relative">
                        <a
                            href={urlItem}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                            data-tooltip-id={tooltipId}
                            data-tooltip-content={tooltipContent}
                        >
                            <ImageWithFallback
                                src={gitIcon}
                                className="w-auto h-[2rem] filter dark:invert"
                                alt="GITHUB ICON"
                                width={20}
                                height={20}
                            />
                        </a>
                        <Tooltip id={tooltipId} place="top" style={{ zIndex: 9999 }} />
                    </div>
                );
            })}
        </>
    );
};
