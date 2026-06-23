export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-[var(--bg)]/60 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[var(--taupe)] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}