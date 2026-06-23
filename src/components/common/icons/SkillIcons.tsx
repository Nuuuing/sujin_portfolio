/* eslint-disable @next/next/no-img-element */

interface SkillIconProps {
    skillName: string;
    className?: string;
    size?: number;
}

const skillImageMap: { [key: string]: string } = {
    // TypeScript
    'typescript': '/icon/skills/typescript.svg',
    'ts': '/icon/skills/typescript.svg',
    // JavaScript
    'javascript': '/icon/skills/javascript.svg',
    'js': '/icon/skills/javascript.svg',
    // React
    'react': '/icon/skills/react.svg',
    'react.js': '/icon/skills/react.svg',
    'reactjs': '/icon/skills/react.svg',
    // Next.js
    'next': '/icon/skills/next.svg',
    'next.js': '/icon/skills/next.svg',
    'nextjs': '/icon/skills/next.svg',
    // Java
    'java': '/icon/skills/java.svg',
    // Spring Boot
    'spring': '/icon/skills/spring.svg',
    'spring boot': '/icon/skills/spring.svg',
    'springboot': '/icon/skills/spring.svg',
    // Tailwind CSS
    'tailwind': '/icon/skills/tailwind.svg',
    'tailwind css': '/icon/skills/tailwind.svg',
    'tailwindcss': '/icon/skills/tailwind.svg',
    // MySQL
    'mysql': '/icon/skills/mysql.svg',
    // Oracle
    'oracle': '/icon/skills/oracle.svg',
    // .NET
    '.net': '/icon/skills/dotnet.svg',
    'dotnet': '/icon/skills/dotnet.svg',
    'net': '/icon/skills/dotnet.svg',
    // C#
    'c#': '/icon/skills/csharp.svg',
    'csharp': '/icon/skills/csharp.svg',
    // Unity
    'unity': '/icon/skills/unity.svg',
    // Linux
    'linux': '/icon/skills/linux.svg',
    // Photoshop
    'photoshop': '/icon/skills/photoshop.svg',
    'ps': '/icon/skills/photoshop.svg',
    // Illustrator
    'illustrator': '/icon/skills/illust.svg',
    'ai': '/icon/skills/illust.svg',
    // Tanstack Query
    'tanstack': '/icon/skills/tanstack.png',
    'tanstack query': '/icon/skills/tanstack.png',
    'react query': '/icon/skills/tanstack.png',
    // Zustand
    'zustand': '/icon/skills/zustand.png',
    // Figma
    'figma': '/icon/skills/figma.svg',
};

const needsWhiteBackground = new Set([
    'react',
    'react.js',
    'reactjs',
    'spring',
    'spring boot',
    'springboot',
    'tailwind',
    'tailwind css',
    'tailwindcss',
    'java',
    'unity',
    'linux',
    'mysql',
    'oracle',
    'next',
    'next.js',
    'nextjs',
    'tanstack',
    'tanstack query',
    'react query',
    'zustand',
    'figma',
]);

export const SkillIcon = ({ skillName, className, size = 20 }: SkillIconProps) => {
    const normalizedName = skillName.toLowerCase().trim();
    const imagePath = skillImageMap[normalizedName];
    const needsContain = needsWhiteBackground.has(normalizedName);

    if (!imagePath) {
        return (
            <div
                className={`inline-flex items-center justify-center rounded-md bg-cream overflow-hidden ${className || ''}`}
                style={{ width: size, height: size }}
            >
                <span className="text-xs font-medium text-ink-soft">
                    {skillName.slice(0, 2).toUpperCase()}
                </span>
            </div>
        );
    }

    // 투명 배경
    if (needsContain) {
        return (
            <div
                className={`inline-flex items-center justify-center rounded-md bg-white overflow-hidden ${className || ''}`}
                style={{ width: size, height: size, padding: size * 0.08 }}
            >
                <img
                    src={imagePath}
                    alt={skillName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
        );
    }

    // 배경이 꽉 찬 아이콘
    return (
        <div
            className={`inline-flex items-center justify-center rounded-md overflow-hidden ${className || ''}`}
            style={{ width: size, height: size }}
        >
            <img
                src={imagePath}
                alt={skillName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
};
