
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface DetailLayoutProps {
    children: ReactNode;
}

export const DetailLayout = ({ children }: DetailLayoutProps) => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div>
            <div
                onClick={() => handleBack()}
                className="w-full flex items-center pl-1 pt-7">
                <h1> &lt; 돌아가기</h1>
            </div>

            <div className="m-10 border-t-1 border-[#f0f0f0]">
                <div className="pt-10">
                    {children}
                </div>
            </div>
        </div>
    );
};