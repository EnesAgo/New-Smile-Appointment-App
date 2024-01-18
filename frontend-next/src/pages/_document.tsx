import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      {/*<Head />*/}
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        </Head>
      <body className='bg-alto bg-background-img-one bg-fixed bg-cover'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
