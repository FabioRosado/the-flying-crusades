import { useEffect } from "react"
import fetch from 'isomorphic-unfetch'
import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default ({ character }) => {
  const [ session, loading ] = useSession()

  if (!session) { return <AccessDenied/> }

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character))
  }, [])

  return (
    <Layout>
      <h1>Your character sheet</h1>
      <p>Name: {character.name}</p>
      <p>Class: {character.class}</p>
      <p>Gold: {character.gold} coins</p>
      <p>Inventory: ...</p>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // If you need to make calls to a service (e.g. an API or database) to make
  // data avalible only to authenticated users, you can do that here by checking
  // the session object is not null or by accessing the contents of session.user
  const session = await getSession(context)

  // TODO: Remove hardcoded name on fetch! 
  const response = await fetch('http://localhost:3000/api/get-character', {method: "POST", body: JSON.stringify({"name": 'theflyingdev'})})

  const character = await response.json()

  return {
    props: { session, character }
  }
}
