import Link from "next/link"

import styles from './footer.module.css'

export default () => (
  <footer className={styles.footer}>
    <hr/>
    <ul className={styles.navItems}>
      <li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
      <li className={styles.navItem}><Link href="/store"><a>Store</a></Link></li>
      <li className={styles.navItem}><Link href="/character"><a>Character Sheet</a></Link></li>
    </ul>
  </footer>
)