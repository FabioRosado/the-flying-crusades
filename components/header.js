import Link from 'next/link'

import CharBar from "../components/character-bar"
import styles from './header.module.css'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <CharBar />

      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
          <li className={styles.navItem}><Link href="/store"><a>Store</a></Link></li>
          <li className={styles.navItem}><Link href="/client"><a>Client Side</a></Link></li>
          <li className={styles.navItem}><Link href="/server"><a>Server Side</a></Link></li>
          <li className={styles.navItem}><Link href="/character"><a>Character Sheet</a></Link></li>
        </ul>
      </nav>
    </header>
  )
}