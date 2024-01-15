import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import {useEffect} from "react";
import redirectIfNotLoggedIn from "@/functions/redirectIfNotLogedIn";

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const routerNext = useRouter()

  useEffect(() => {
    redirectIfNotLoggedIn(routerNext)
  }, [])

  return <Component {...pageProps} />
}
