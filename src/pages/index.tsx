import React, { useState } from 'react'
import { AllTests, NavBar } from '../../Components'
import Head from 'next/head'

const Home = () => {
  const [linkSelected, setLinkSelected] = useState<string>('file')
  const [isFile, setIsFile] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>Automatic Jest Test</title>
        <meta name="description" content="Get tests for your react app automatically" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <NavBar linkSelected={linkSelected} setLinkSelected={setLinkSelected} />
        <AllTests
          linkSelected={linkSelected}
          isFile={isFile}
          setIsFile={setIsFile}
        />
      </main>
    </>
  )
}

export default Home
