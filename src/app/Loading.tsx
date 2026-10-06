export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-[var(--bg)]/60 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--ink)] border-t-transparent" />
        </div>
    );
}