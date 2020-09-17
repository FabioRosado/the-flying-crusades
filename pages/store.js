import { useEffect, useState } from "react"
import Layout from "../components/layout"

import store from '../data/store.json'
import Item from "../components/store/item"

export default () => {
   const [character, setCharacter] = useState(null)

    useEffect(() => {
        const char = localStorage.getItem("character")
        setCharacter(JSON.parse(char))
    }, [])

    return (
        <Layout>
          <div style={{display: 'flex'}}>
            {store.map(item => 
                <Item 
                    details={item} 
                    character={character} 
                    key={item.name + Math.floor((Math.random() * 30) + 1)} 
                />

            )}
          </div> 
        </Layout>
    )

}
