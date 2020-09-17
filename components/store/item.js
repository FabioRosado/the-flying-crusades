import React, { useState } from "react"
import styles from "./item.module.css"

const Item = ({details, character}) => {
    const [bought, setBought] = useState(false)
    const [error, setError] = useState(false)
    const item = details
    const characterDetails = character

    console.log(character)

    const buyItem = (charaterDetails, itemDetails) => {
        fetch("http://localhost:3000/api/buy-item", 
            {
                method: "POST",
                body: JSON.stringify({character: characterDetails, item: itemDetails})
            }
        )
        .then(result => result.json())
        .then(character => {
            setBought(true)
            localStorage.setItem("character", JSON.stringify(character))    
        } )
        .catch(error => {
            console.warn("error")
            console.log(error.status, error.message)
            setError(error)
        })
    }

    return (
        <div key={item.name} className={styles.storeItem}>
           <p className={styles.itemName}>{item.name}</p>
            <img src={item.image} alt={item.name} className={bought ? styles.boughtAnimation : styles.itemImage} /> 
            <button 
                className={styles.itemButton} 
                onClick={() => buyItem(characterDetails, item)}
            >
                {item.cost}
            </button>
        </div>

    )

}


export default Item
