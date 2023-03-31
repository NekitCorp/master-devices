import { Layout } from "@/components/layout";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

const config: QueryClientConfig = {};
const queryClient = new QueryClient(config);

export default function App({ Component, pageProps }: AppProps) {
    const { isReady } = useRouter();

    if (!isReady) {
        return null; // Or any loading component
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
}
