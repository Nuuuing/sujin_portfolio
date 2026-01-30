import { Timestamp } from 'firebase/firestore';

export function toDateSafe(value: unknown): Date | undefined {
    if (!value) return undefined;
    if (value instanceof Date) return value;

    if (typeof value === 'object' && value !== null) {
        const obj = value as { toDate?: () => Date; seconds?: number; nanoseconds?: number };

        if (obj.toDate && typeof obj.toDate === 'function') {
            return obj.toDate();
        }

        if (obj.seconds !== undefined) {
            return new Timestamp(obj.seconds, obj.nanoseconds || 0).toDate();
        }
    }

    if (typeof value === 'string' && value.length === 6) {
        const year = parseInt(value.substring(0, 4));
        const month = parseInt(value.substring(4, 6)) - 1;
        return new Date(year, month);
    }

    return undefined;
}

export { getCareers, getCareerSubs } from '@/features/career';
export { getProjects, getProjectDetails } from '@/features/project';
export { getSkills } from '@/features/skill';
