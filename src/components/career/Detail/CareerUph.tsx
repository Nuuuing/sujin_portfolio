export const CareerUph = () => {
    return (
        <div className="px-4 sm:px-8">
            {/* 회사 정보 */}
            <div className="mb-12">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold">(주)유팜몰</h2>
                    <div className="mt-2 space-y-1 text-sm sm:text-base text-gray-300">
                        <p>약국 전자상거래</p>
                        <p>개발팀 • 주임</p>
                    </div>
                </div>

                {/* 기간 & 포지션 */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <p className="bg-gray-600 text-xs sm:text-sm px-3 py-1 rounded-full font-bold">2025.03 - ING</p>
                    <p className="bg-gray-600 text-xs sm:text-sm px-3 py-1 rounded-full font-bold">WEB FULLSTACK</p>
                </div>
            </div>

            {/* 기술 스택 */}
            <div className="mb-8 flex flex-wrap gap-2">
                {['C#', 'ASP.NET', 'IIS', 'MSSQL', 'JAVA'].map((skill) => (
                    <p key={skill} className="bg-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                        {skill}
                    </p>
                ))}
            </div>

            {/* 업무 내용 */}
            <div className="text-sm sm:text-base leading-relaxed space-y-2">
                <p>• 시스템 기능 개선 및 운영 고도화 작업 수행</p>
                <p>• 영업 부서 및 관련 부서와의 지속적인 커뮤니케이션을 통한 요구사항 분석 및 반영</p>
                <p>• MSSQL 기반 프로시저 최적화, 대용량 데이터 처리 성능 개선</p>
                <p>• 대규모 거래 데이터 관리, 데이터 정합성 유지 및 품질 관리</p>
                <p>• 도매 거래처 ERP DB 연동 시스템 유지관리 및 장애 대응</p>
                <p>• 시스템 이슈 대응</p>
                <p>• 경쟁사 데이터 수집 및 분석을 위한 외부 시스템 개발</p>
            </div>
        </div>
    );
};
