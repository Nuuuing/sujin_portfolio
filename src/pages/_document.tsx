// pages/_document.tsx
import Document, { Html, Main, NextScript, DocumentContext, Head } from "next/document";

class MainDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link rel="icon" href="/icon/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MainDocument;
