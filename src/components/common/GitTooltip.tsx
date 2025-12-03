'use client';

import { gitUrlT } from '@/types';
import { ImageWithFallback } from './ImageFallback';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const gitIcon = `/icon/github_logo.png`;

interface GitTooltipProps {
    git: gitUrlT[];
}

export const GitTooltip = ({ git }: GitTooltipProps) => {

    return (
        <>
            {git.map((data: gitUrlT, index: number) => {
                const tooltipId = `git-tooltip-${index}`;
                const tooltipContent = data.title;

                return (
                    <div key={`git${index}`} className="relative">
                        <a
                            href={data.url}
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
