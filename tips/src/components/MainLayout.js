import Head from "next/head";
import Image from 'next/image'
import classes from "../styles/main.module.css";
import logo from '../assets/logo.png'

function getYear() {
  return new Date().getFullYear()
}

export default function MainLayout({ title = 'Три холма', children }) {
  return (
    <>
      <Head>
        <link rel="icon" href='../assets/favicon.png' />
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Head>
      <div className={classes.app}>
        <header className={classes.header}>
          <div className={classes.header__logo}>
            <a href="https://tri-xolma.ru/" target="_blank" rel="noreferrer">
              <Image src={logo} width={96} height={64} alt="logo" />
            </a>
          </div>
        </header>
        <main className={classes.main}>
          <div className={classes.content}>
            {children}
          </div>
        </main>
        <footer className={classes.footer}>
          <small>© Три холма {getYear()}</small>
        </footer>
      </div>
    </>
  )
}