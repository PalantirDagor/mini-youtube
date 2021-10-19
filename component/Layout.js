import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'Mini videos divertidos'

export default function Layout({children, title, description, home}) {
    return(
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <header className={styles.header}>
                {home ? (
                <>
                    <Image
                    priority
                    src="/img/logo.png"
                    className={utilStyles.borderCircle}
                    height={395}
                    width={616}
                    alt={name}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
                ) : (
                <>
                    <Link href="/">
                    <a>
                        <Image
                        priority
                        src="/img/logo.png"
                        className={utilStyles.borderCircle}
                        height={198}
                        width={308}
                        alt={name}
                        />
                    </a>
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                    <Link href="/">
                        <a className={utilStyles.colorInherit}>{name}</a>
                    </Link>
                    </h2>
                </>
                )}
            </header>
            <nav>
                <Link href="/">
                            <a>Inicio | </a>
                </Link>
                <Link href="/subirVideos">
                            <a>Subir Videos | </a>
                </Link>
                <Link href="/reproduccion">
                            <a>Reproduccion | </a>
                </Link>
                <Link href="/buscar">
                            <a>Buscar | </a>
                </Link>
            </nav>

            <main>
                {children}
            </main>

            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Volver al Inicio</a>
                </Link>
                </div>
            )}
        </div>
    )
}

Layout.defaultProps = {
    title: "Mini-Youtube",
    description: "Mini sitio para ver mini videos!"
}