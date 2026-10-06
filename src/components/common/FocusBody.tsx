import { parseContent } from "@/utils"
import type { FocusGroup } from "@/utils/career"

interface Metric {
    value: string
    label: string
    caption?: string
}

interface FocusBodyProps {
    group: FocusGroup
    metrics?: Metric[]
}

const stripLabel = (text: string) =>
    text.replace(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*/, '').replace(/\s+/g, ' ').trim()

/**
 * 문제 / 설계·구현 / 결과·역량.
 *
 * 3열로 나누면 카드 폭이 좁아 네댓 글자마다 줄바꿈이 생겨 읽기 어렵다.
 * 라벨을 왼쪽 고정 열에 두고 본문이 가로를 다 쓰게 한다. 좁은 화면에서는 라벨이 위로 간다.
 */
export const FocusBody = ({ group, metrics = [] }: FocusBodyProps) => {
    const rows = [
        group.challenge && { key: '문제', text: group.challenge, accent: false },
        group.implementation && { key: '설계 · 구현', text: group.implementation, accent: false },
        group.outcome && { key: '결과 · 역량', text: group.outcome, accent: true },
    ].filter(Boolean) as { key: string; text: string; accent: boolean }[]

    return (
        <div>
            <dl className="space-y-3.5">
                {rows.map((r) => (
                    <div
                        key={r.key}
                        className="grid gap-x-5 gap-y-1.5 sm:grid-cols-[6.5rem_1fr]"
                    >
                        <dt>
                            <span className={`tag ${r.accent ? '' : 'tag-line'}`}>{r.key}</span>
                        </dt>
                        <dd className={`m-0 text-[0.97rem] leading-[1.85] ${r.accent ? 'font-medium text-ink' : 'text-ink-soft'}`}>
                            {parseContent(stripLabel(r.text))}
                        </dd>
                    </div>
                ))}
            </dl>

            {metrics.length > 0 && (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {metrics.map((m, i) => (
                        <div key={`${m.label}-${i}`} className="rounded-[var(--r-lg)] bg-ac-soft px-5 py-4">
                            <span className="fig block text-[1.9rem] leading-none text-ac">{m.value}</span>
                            <span className="mt-2 block text-[0.92rem] font-bold text-ink">{m.label}</span>
                            {m.caption && (
                                <span className="mt-0.5 block text-[0.84rem] leading-snug text-ink-soft">{m.caption}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
