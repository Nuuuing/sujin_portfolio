import { CareerT } from "@/features";

/** YYYYMM → YYYY.MM */
export const formatTerm = (term: string | undefined): string => {
    if (!term) return '';
    if (term.length === 6) return `${term.slice(0, 4)}.${term.slice(4, 6)}`;
    return term;
};

/** YYYYMM → 1970.01 기준 누적 월수. 형식이 어긋나면 null */
const termToMonths = (term: string | undefined): number | null => {
    if (!term || term.length !== 6) return null;
    const year = Number(term.slice(0, 4));
    const month = Number(term.slice(4, 6));
    if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return null;
    return year * 12 + (month - 1);
};

const nowInMonths = (): number => {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth();
};

/** 재직 개월 수. endTerm이 없으면 현재까지. 시작월과 종료월을 모두 포함해 센다 */
export const careerMonths = (career: CareerT): number => {
    const start = termToMonths(career.startTerm);
    if (start === null) return 0;
    const end = termToMonths(career.endTerm) ?? nowInMonths();
    return Math.max(0, end - start + 1);
};

/** 개월 수 → "4년 2개월" / "7개월" */
export const formatDuration = (months: number): string => {
    if (months <= 0) return '';
    const years = Math.floor(months / 12);
    const rest = months % 12;
    if (years === 0) return `${rest}개월`;
    if (rest === 0) return `${years}년`;
    return `${years}년 ${rest}개월`;
};

export interface CareerStats {
    /** 경력 총 개월 수 (기간이 겹치면 중복으로 세지 않는다) */
    totalMonths: number;
    /** 회사 수 */
    companyCount: number;
    /** 회사에서 담당한 프로젝트 건수 */
    companyProjectCount: number;
    /** 주요 업무 단위 수 (project형 프로젝트 + contents형 Focus) */
    workUnitCount: number;
    /** 가장 이른 입사 시점 (YYYY.MM) */
    firstTerm: string;
    /** 재직 중인 경력이 하나라도 있는지 */
    isActive: boolean;
}

/**
 * 경력 목록에서 대표 지표를 계산한다.
 * 기간이 겹치는 경력이 있어도 총 개월 수가 부풀지 않도록 구간을 병합해서 센다.
 */
export const getCareerStats = (careers: CareerT[]): CareerStats => {
    const ranges = careers
        .map((c) => {
            const start = termToMonths(c.startTerm);
            if (start === null) return null;
            const end = termToMonths(c.endTerm) ?? nowInMonths();
            return { start, end: Math.max(start, end) };
        })
        .filter((r): r is { start: number; end: number } => r !== null)
        .sort((a, b) => a.start - b.start);

    let totalMonths = 0;
    let cursor: { start: number; end: number } | null = null;
    for (const r of ranges) {
        if (cursor && r.start <= cursor.end + 1) {
            cursor.end = Math.max(cursor.end, r.end);
        } else {
            if (cursor) totalMonths += cursor.end - cursor.start + 1;
            cursor = { ...r };
        }
    }
    if (cursor) totalMonths += cursor.end - cursor.start + 1;

    const sortedByStart = careers
        .slice()
        .sort((a, b) => (a.startTerm || '').localeCompare(b.startTerm || ''));

    return {
        totalMonths,
        companyCount: careers.length,
        companyProjectCount: careers.reduce((sum, c) => sum + (c.projects?.length || 0), 0),
        workUnitCount: careers.reduce(
            (sum, c) => sum + (c.projects?.length || 0) + getFocusGroups(c).length,
            0,
        ),
        firstTerm: formatTerm(sortedByStart[0]?.startTerm),
        isActive: careers.some((c) => !c.endTerm),
    };
};

export interface FocusGroup {
    title?: string;
    challenge?: string;
    implementation?: string;
    outcome?: string;
}

const parseLabeledLine = (text: string) => {
    const match = text.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*(.*)$/);
    if (!match) return null;

    const label = match[1];
    const field: 'challenge' | 'implementation' | 'outcome' =
        label === '문제' ? 'challenge'
            : label === '해결' || label === '설계/구현' ? 'implementation'
                : 'outcome';

    return { field, text: match[2] };
};

/**
 * detailContents를 [문제 / 설계·구현 / 결과·역량] 묶음으로 접는다.
 * title이 붙은 줄이 새 묶음의 시작이다.
 */
export const getFocusGroups = (career: CareerT): FocusGroup[] => {
    const groups: FocusGroup[] = [];

    career.detailContents?.forEach((content) => {
        const parsed = parseLabeledLine(content.contents);

        if (!parsed) {
            groups.push({ title: content.title, outcome: content.contents });
            return;
        }

        if (content.title?.trim() || parsed.field === 'challenge' || groups.length === 0) {
            groups.push({ title: content.title });
        }

        groups[groups.length - 1][parsed.field] = parsed.text;
    });

    return groups.filter((g) => g.challenge || g.implementation || g.outcome);
};

/** Focus 제목. title이 없으면 내용 키워드로 만든다 */
export const getFocusTitle = (group: FocusGroup): string => {
    if (group.title?.trim()) return group.title.trim();

    const text = `${group.challenge || ''} ${group.implementation || ''} ${group.outcome || ''}`;

    if (text.includes('MSSQL') || text.includes('ERP') || text.includes('거래 데이터')) return '데이터 처리 및 연동 안정화';
    if (text.includes('PG') || text.includes('결제')) return '결제 연동';
    if (text.includes('iOS') || text.includes('Android') || text.includes('스토어')) return '모바일 앱 배포';
    if (text.includes('현업') || text.includes('요구사항') || text.includes('업무 시스템')) return '업무 시스템 운영 개선';
    if (text.includes('OpenAPI')) return '외부 연계 기반 구축';
    if (text.includes('ReactQuery')) return '화면 응답성과 데이터 흐름 개선';

    return '운영 개선';
};

/** Focus 제목에 귀속된 지표만 추린다 (group 필드가 Focus title과 일치하는 것) */
export const getMetricsForFocus = (career: CareerT, focusTitle: string) =>
    career.metrics?.filter((m) => m.group && m.group.trim() === focusTitle.trim()) ?? [];

/** 특정 Focus에 귀속되지 않은 지표 (경력 전체 지표) */
export const getUngroupedMetrics = (career: CareerT) => {
    const titles = getFocusGroups(career).map((g) => getFocusTitle(g).trim());
    return career.metrics?.filter((m) => !m.group || !titles.includes(m.group.trim())) ?? [];
};

/** 경력에서 스택 키워드를 추린다 */
export const getCareerStack = (career: CareerT): string[] => {
    const text = [
        career.description,
        career.contents,
        ...(career.detailContents?.map((i) => i.contents) || []),
        ...(career.projects?.flatMap((p) => [
            p.projName,
            p.description,
            ...(p.tasks || []),
            ...(p.achievements || []),
        ]) || []),
    ].filter(Boolean).join(' ');

    const rules: Array<[string, string]> = [
        ['ReactQuery', 'ReactQuery'],
        ['React', 'React'],
        ['Next', 'Next.js'],
        ['TypeScript', 'TypeScript'],
        ['jQuery', 'jQuery'],
        ['ASP.NET', 'ASP.NET'],
        ['Spring', 'Spring'],
        ['Java', 'Java'],
        ['WebRTC', 'WebRTC'],
        ['MSSQL', 'MSSQL'],
        ['프로시저', '프로시저 튜닝'],
        ['Oracle', 'Oracle'],
        ['ERP', 'ERP 연동'],
        ['OpenAPI', 'OpenAPI'],
        ['PG', 'PG 결제'],
        ['iOS', 'iOS 배포'],
        ['Android', 'Android 배포'],
        ['공공', '공공 SI/SM'],
    ];

    return Array.from(new Set(
        rules.filter(([token]) => text.includes(token)).map(([, label]) => label)
    )).slice(0, 6);
};

/* ── 프로젝트 기간 (YYYY.MM 또는 YYYY.MM.DD) ───────────── */

const parseDotDate = (value: string | undefined): Date | null => {
    if (!value) return null;
    const parts = value.trim().split('.').map((p) => Number(p));
    const [y, m, d] = parts;
    if (!Number.isFinite(y) || !Number.isFinite(m)) return null;
    return new Date(y, m - 1, Number.isFinite(d) ? d : 1);
};

/**
 * 프로젝트 소요 기간을 사람이 읽는 문자열로.
 * 45일 미만이면 일 단위, 그 이상이면 개월 단위로 센다.
 */
export const projectDuration = (start?: string, end?: string): string => {
    const s = parseDotDate(start);
    const e = parseDotDate(end) ?? new Date();
    if (!s) return '';

    const days = Math.round((e.getTime() - s.getTime()) / 86400000) + 1;
    if (days <= 0) return '';
    if (days < 45) return `${days}일`;

    const months = Math.max(1, Math.round(days / 30.44));
    return formatDuration(months);
};
