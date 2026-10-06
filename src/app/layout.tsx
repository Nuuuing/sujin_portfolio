import type { Metadata } from "next";
import { Figtree, Noto_Sans_KR, Sacramento } from "next/font/google";
import "./globals.css";

/* 본문·제목: 둥글고 개방적인 그로테스크 */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* 영문 악센트 단어 전용 스크립트 */
const sacramento = Sacramento({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/* 한국어 본문 */
const notoKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUJIN's PORTFOLIO",
  description: "Sujin's portfolio website showcasing full-cycle service development projects and experience.",
  keywords: ["portfolio", "full-stack", "service development", "React", "Next.js", "TypeScript", "ASP.NET", "MSSQL"],
  authors: [{ name: "Sujin Kim" }],
  openGraph: {
    title: "SUJIN's PORTFOLIO",
    description: "Sujin's portfolio website showcasing full-cycle service development projects and experience.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${figtree.variable} ${sacramento.variable} ${notoKr.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
