import { BlogPostT } from '../types';

const RSS_URL = 'https://nuu-stradamus.tistory.com/rss';

const NAMED_ENTITIES: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    rarr: '→', larr: '←', hellip: '…', mdash: '—', ndash: '–', middot: '·',
    ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', times: '×', deg: '°',
};

/**
 * HTML 엔티티를 실제 문자로 바꾼다.
 * RSS 제목에 &rarr; 같은 엔티티가 그대로 들어오는데, 디코딩하지 않으면
 * React가 & 를 한 번 더 이스케이프해서 화면에 &amp;rarr; 로 보인다.
 * &amp;lt; 처럼 두 번 감싸인 경우가 있어 두 번까지 푼다.
 */
const decodeEntities = (text: string): string => {
    const once = (s: string) => s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, body: string) => {
        if (body[0] === '#') {
            const code = body[1] === 'x' || body[1] === 'X'
                ? parseInt(body.slice(2), 16)
                : parseInt(body.slice(1), 10);
            return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code) : whole;
        }
        return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
    });
    return once(once(text));
};

const extractTag = (xml: string, tag: string): string | null => {
    const cdata = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'));
    if (cdata) return cdata[1];
    const plain = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    return plain ? plain[1].trim() : null;
};

const extractCategories = (xml: string): string[] => {
    const out: string[] = [];
    const matches = xml.matchAll(/<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi);
    for (const m of matches) {
        const v = m[1]?.trim();
        if (v) out.push(decodeEntities(v));
    }
    return out;
};

const extractThumbnail = (content: string | null): string | undefined => {
    if (!content) return undefined;
    const img = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    return img ? img[1] : undefined;
};

/**
 * HTML 태그와 엔티티를 걷어내고 요약문을 만든다.
 *
 * 순서가 중요하다. 태그를 먼저 지우고 엔티티를 나중에 풀면
 * &lt;p&gt; 같은 인코딩된 태그가 그때서야 <p> 로 바뀌어 본문에 글자로 남는다.
 * 그래서 디코딩 → 태그 제거를 두 번 돌려 두 경우를 모두 흡수한다.
 */
const toSummary = (html: string | null, max = 110): string | undefined => {
    if (!html) return undefined;

    const strip = (s: string, dropCode: boolean) =>
        decodeEntities(s)
            // 스크립트·스타일·코드 블록은 안쪽 내용까지 통째로 버린다.
            // 글이 코드로 시작하면 요약이 SQL·소스 덩어리가 되어 읽히지 않는다.
            .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
            .replace(dropCode ? /<(pre|code)[\s\S]*?<\/\1>/gi : /(?!)/g, ' ')
            .replace(/<[^>]*>/g, ' ');

    const clean = (s: string, dropCode: boolean) =>
        strip(strip(s, dropCode), dropCode).replace(/\s+/g, ' ').trim();

    // 코드를 뺀 산문이 너무 짧으면(코드만 있는 글) 코드라도 보여 준다
    const prose = clean(html, true);
    const text = prose.length >= 30 ? prose : clean(html, false);

    if (!text) return undefined;
    return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};

export const parseRSS = (xml: string): BlogPostT[] => {
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g);
    if (!items) return [];

    return items.map((itemXml) => {
        const pubDate = extractTag(itemXml, 'pubDate');
        const content = extractTag(itemXml, 'description');
        const categories = extractCategories(itemXml);

        return {
            title: decodeEntities(extractTag(itemXml, 'title') || ''),
            date: pubDate
                ? new Date(pubDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                : '',
            link: extractTag(itemXml, 'link') || '',
            thumbnail: extractThumbnail(content),
            categories: categories.length > 0 ? categories : undefined,
            summary: toSummary(content),
        };
    });
};

/**
 * 블로그 글 목록.
 *
 * 빌드 시점(서버)에서 RSS를 직접 가져온다. 이 사이트는 정적 내보내기라
 * 브라우저에서 바로 호출하면 CORS에 막히는데, 예전에 쓰던 공개 CORS 프록시들은
 * 전부 죽어서(403 / 522 / 연결 실패) 글이 하나도 뜨지 않았다.
 * 서버에서 가져와 HTML에 박아 넣으면 프록시도, 로딩 상태도 필요 없다.
 * 글 목록은 배포할 때마다 갱신된다.
 */
export async function getBlogPosts(limit = 6): Promise<BlogPostT[]> {
    try {
        const res = await fetch(RSS_URL, {
            headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*' },
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) {
            console.warn(`[blog] RSS ${res.status} — 블로그 섹션을 건너뜁니다`);
            return [];
        }
        const xml = await res.text();
        return parseRSS(xml).slice(0, limit);
    } catch (error) {
        // 빌드를 실패시키지 않는다. 글이 없으면 섹션이 안내 문구로 대체된다.
        console.warn('[blog] RSS를 가져오지 못했습니다:', error);
        return [];
    }
}
