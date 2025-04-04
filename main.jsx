const animaliVari = ["Cane", "Gatto", "Pappagallo", "Cavallo", "Panda"];

const Componente = () => {

    const { useState } = React
    const [animals, setAnimals] = useState([])


    function randomAnimalGenerator() {
        const randomNumber = Math.floor(Math.random() * animaliVari.length)
        const animaleCasuale = animaliVari[randomNumber]
        if (!animals.includes(animaliVari[randomNumber])) {
            setAnimals([...animals, animaleCasuale])
        }
    }


    return (

        <>
            <button onClick={() => { randomAnimalGenerator() }}>Aggiungi animale</button>
            <details>
                <summary><strong>Animali</strong></summary>
                <ul>
                    {
                        animals ? animals.map((element, index) => <li key={index}>{element}</li>) : <li>Nessun animale disponibile</li>
                    }
                </ul>
            </details>
        </>

    )
}

const elementRoot = ReactDOM.createRoot(document.querySelector(".lista-animali"))
elementRoot.render(<Componente />)

