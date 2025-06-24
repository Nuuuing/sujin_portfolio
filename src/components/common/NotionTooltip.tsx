'use client';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ImageWithFallback } from './ImageFallback';

const notionIcon = `${process.env.BASE_PATH}/icon/notion_logo.png`;

interface NotionTooltipProps {
    url: string;
}

export const NotionTooltip = ({ url }: NotionTooltipProps) => {
    const tooltipId = 'notion-tooltip';

    return (
        <div className="relative">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                data-tooltip-id={tooltipId}
                data-tooltip-content="Notion"
            >
                <ImageWithFallback
                    src={notionIcon}
                    className="w-auto h-[2rem] filter dark:invert"
                    alt="NOTION ICON"
                    width={20}
                    height={20}
                />
            </a>
            <Tooltip id={tooltipId} place="top" />
        </div>
    );
};
