"use client"
import { useState } from "react"

export default function Suppliers(){
    const [isFormActive, setIsFormActive] = useState(false)

    return (
        <main>
            <div>
                <h1>
                    Fonecedores
                </h1>
                <button onClick={()=> setIsFormActive(!isFormActive)}>
                    Adicionar
                </button>
            </div>
            <div>

            </div>
            {isFormActive && <form>
                <label htmlFor="name">nome</label>
                <input id="name" type="text" />
            </form>}
        </main>
    )
}