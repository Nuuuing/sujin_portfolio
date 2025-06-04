import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head"; 

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>SUJIN PORTFOLIO</title>
                <meta name="description" content="수진의 포트폴리오입니다." />
                <link rel="icon" href="/icon/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
