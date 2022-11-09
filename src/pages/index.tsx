import { type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

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

const Home: NextPage = () => {
  const date = new Date()
  const { format: dateFormatter } = new Intl.DateTimeFormat('pt-Br', {
    month: 'long',
    year: '2-digit',
  })

  return (
    <>
      <Head>
        <title>Endividômetro</title>
        <meta name="description" content="O pardal das suas dívidas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="mx-2 mt-2 flex items-center justify-between">
        <button className="btn-ghost btn">
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
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4"></main>
    </>
  )
}

export default Home
