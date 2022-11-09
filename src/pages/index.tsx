import { useCallback, useState } from 'react'
import { type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Message } from '@root/components'

const LoginButton: React.FC = () => {
  const { data: sessionData } = useSession()

  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip={sessionData ? 'SAIR' : 'ENTRAR'}
    >
      <button
        className="btn-ghost btn-circle btn-lg btn"
        onClick={sessionData ? () => signOut() : () => signIn('google')}
      >
        <div className="avatar">
          <div className="w-12 rounded-full bg-base-content">
            <Image
              src={sessionData?.user?.image ?? '/person.svg'}
              width={32}
              height={32}
              alt="foto de perfil do usuário"
            />
          </div>
        </div>
      </button>
    </div>
  )
}

function formatFeedback(feedback: string, index: number) {
  if (!feedback) return <></>
  if (feedback.startsWith('ERRO'))
    return (
      <Message key={`${feedback}${index}`} variant="error">
        <span>{feedback}</span>
      </Message>
    )
  return (
    <Message key={`${feedback}${index}`} variant="success">
      <span>{feedback}</span>
    </Message>
  )
}

const Home: NextPage = () => {
  const date = new Date()
  const { format: dateFormatter } = new Intl.DateTimeFormat('pt-Br', {
    month: 'long',
    year: '2-digit',
  })
  const [feedbacks, setFeedbacks] = useState([] as string[])
  const addFeedback = useCallback(
    (feedback: string) => setFeedbacks((old) => [...old, feedback]),
    [setFeedbacks]
  )

  return (
    <>
      <Head>
        <title>Endividômetro</title>
        <meta name="description" content="O pardal das suas dívidas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="mx-2 mt-2 flex items-center justify-between">
        <button
          className="btn-ghost btn"
          onClick={() => addFeedback('Em breve, criação de vários quadros')}
        >
          <picture>
            <source
              srcSet="/menu-dark.svg"
              width={32}
              height={32}
              media="(prefers-color-scheme: light)"
            />
            <Image
              src={'/menu-light.svg'}
              width={32}
              height={32}
              alt="lista de quadros"
            />
          </picture>
        </button>
        <strong>{dateFormatter(date).toUpperCase()}</strong>
        <LoginButton />
      </nav>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <div className="toast">
          {/* TODO: (a11y) utilizar ul e li */}
          {feedbacks.map((feedback, index) => formatFeedback(feedback, index))}
        </div>
      </main>
    </>
  )
}

export default Home
