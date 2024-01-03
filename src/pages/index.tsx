import React, { useState } from 'react'
import { NavBar, MainBox } from '../../Components'
import Head from 'next/head'

const Home = () => {
  const [linkSelected, setLinkSelected] = useState<'file' | 'code' | 'params'>('file')

  return (
    <>
      <Head>
        <title>Automatic Jest Test</title>
        <meta name="description" content="Get tests for your react app automatically" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <NavBar linkSelected={linkSelected} setLinkSelected={setLinkSelected} />
        <MainBox linkSelected={linkSelected} />
      </main>
    </>
  )
}

export default Home
