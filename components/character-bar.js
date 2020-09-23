import { signIn, signOut, useSession } from 'next-auth/client'
import { useState, useEffect } from 'react'
import styles from "./header.module.css"
export default () => {
    const [ session, loading ] = useSession()
    const [ character, setCharacter ] = useState({})
   // TODO: Add character info: name, gold and class
   
   useEffect(() => {
     const char = localStorage.getItem("character")

     setCharacter(JSON.parse(char))

   }, [])

    return (
      <div className={styles.signedInStatus}>
        <div className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <div className={styles.notSignedInText}>You are not signed in</div>
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
          {session && <div className={styles.charInfo}>
            <div style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>
            <div className={styles.info}>
              <small>Name</small>
              <strong>{session.user.name}</strong>
            </div>
            <div className={styles.info}>
              <small>Class</small>
              <strong>{character.class}</strong>
            </div>
            <div className={styles.info}>
              <small>Level</small>
              <strong>1</strong>
            </div>           
            <div className={styles.info}>
              <small>Exp</small>
              <strong>40/150</strong>
            </div>            
            <div className={styles.info}>
              <small>Gold</small>
              <strong>{character.gold}</strong>
            </div>            
            <div className={styles.info}>
              <small>HP</small>
              <strong>40/40</strong>
            </div>
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
          </div>}
        </div>
      </div>
    )
}
