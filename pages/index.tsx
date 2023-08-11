import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Inter } from "next/font/google";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ChatCalc – Chat To Calculate using natural language",
    description:
        "Chat To Calculate using natural language, Built with LangchainJs and Vercel AI SDK",
};

const DynamicComponentWithNoSSR = dynamic(
  () => import('./App'),
  { ssr: false }
)

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Base Script</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
    </>
  )
}

export default Home

export async function getServerSideProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
            ])),
        },
    };
}
