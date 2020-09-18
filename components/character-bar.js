import { signIn, signOut, useSession } from 'next-auth/client'
import styles from "./header.module.css"
export default () => {
    const [ session, loading ] = useSession()
    
    return (
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
          </>}
        </p>
      </div>
    )
}
