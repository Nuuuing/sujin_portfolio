'use client'

export const Header = () => {
    return (
        <div className="w-[100%] flex justify-between z-50 h-10 mt-[0.3rem]">
            <img
                src="/logo.png"
                alt="Logo"
                className="object-contain w-[10rem] h-full"
            />
            <div className="hidden md:flex gap-6 text-sm font-medium mr-[2rem] items-center">
                <p>소개</p>
                <p>기술</p>
                <p>경력</p>
                <p>프로젝트</p>
                <p>블로그</p>
            </div>
        </div>
    )
}