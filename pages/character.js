import { useEffect, useState } from "react"
import fetch from 'isomorphic-unfetch'
import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default ({ character }) => {
  const [ session, loading ] = useSession()
  const [char, setCharacter] = useState({inventory: {}, equipment: {}})

  // TODO: Instead of use AccessDenied, we should just allow users to log in and create their chars.
  if (!session) { return <AccessDenied/> }

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character))
    setCharacter(character)
  }, [])

  const equipment = Object.entries(char.equipment)
  const inventory = Object.entries(char.inventory)

  return (
    <Layout>
      <h1>Your character sheet</h1>
      <p>Name: {character.name}</p>
      <p>Class: {character.class}</p>
      <p>Gold: {character.gold} coins</p>
      <p>Equipment:</p> 
        <ul>
          {equipment.map(item => {
            return <li key={item[0]}>{item[0]}: {item[1] ? item[1] : "None"}</li>
          })}
        </ul>
      <p>Inventory:</p>
          <ul>
          {inventory.map(item => {
            if (item[0] !== 'items') {
              return <li key={item[0]}>{item[0]}: {item[1]}</li>
            }
          })}

          </ul>

      
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // If you need to make calls to a service (e.g. an API or database) to make
  // data avalible only to authenticated users, you can do that here by checking
  // the session object is not null or by accessing the contents of session.user
  const session = await getSession(context)
  const charName = session.user['name'].toLowerCase()
  
  const response = await fetch('http://localhost:3000/api/get-character', {method: "POST", body: JSON.stringify({"name": charName})})

  const character = await response.json()

  return {
    props: { session, character }
  }
}
