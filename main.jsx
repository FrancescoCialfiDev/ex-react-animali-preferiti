// 📌 Milestone 1: Inserire un Componente React
// - Monta un componente React all’interno dell’elemento con classe .lista-animali
/* Il componente deve includere:
 - Un elemento <details> con titolo "Animali", che contiene:
 - Una lista <ul> statica che viene creata a partire da un array di stringhe (animals) dove ciascuna stringa rappresenta il nome di un animale.*/

// const animali = ["Corvo", "Maiale", "Papera", "Gatto", "Suricato", "Marmotta"]
//
// const Componente = () => {
//
//     return (
//         <>
//             <details>
//                 <summary>Animali</summary>
//                 <ul>
//                     {animali.map(animale => <li>{animale}</li>)}
//                 </ul>
//             </details>
//         </>
//     )
// }
//
// ReactDOM.createRoot(document.querySelector(".lista-animali")).render(<Componente />)

///////////////////////////////////////////////////////////////////////////////////////////

// 📌 Milestone 2: Aggiungere Animali Casuali
// - Trasforma l’array animals usando useState (l’array è inizialmente vuoto).
// - Aggiungi un bottone "Aggiungi Animale" sopra il <details>.
// - Cliccando il bottone, un animale casuale viene aggiunto alla lista.
// - Usa un array predefinito per scegliere casualmente:

// const animaliDefault = ["Corvo", "Maiale", "Papera", "Gatto", "Suricato", "Marmotta"]
//
// const Componente = () => {
//
//     const { useState } = React
//     const [animals, setAnimals] = useState([])
//
//     function randomAnimal() {
//         const randomIndex = Math.floor(Math.random() * animaliDefault.length)
//         const randomAnimal = animaliDefault[randomIndex]
//         setAnimals([...animals, randomAnimal])
//     }
//
//     return (
//         <>
//             <button onClick={randomAnimal}>Aggiungi Animale</button>
//             <details>
//                 <summary>Animali</summary>
//                 <ul>
//                     {animals.map((animale, index) => <li key={index}>{animale}</li>)}
//                 </ul>
//             </details>
//         </>
//     )
// }

///////////////////////////////////////////////////////////////////////////////////////////

// 📌 Milestone 3: Usare una Modale per Aggiungere Animali
/*
Espandilo affinché:

-La vecchia prop content può essere usata per passare un componente qualsiasi.
-Un nuovo div in fondo alla modale contiene il bottone Annulla e un nuovo bottone Conferma.
-Una nuova prop onConfirm si aspetta una funzione per gestire l’azione di conferma.
-Sostituisci l’aggiunta casuale dell’animale con una modale interattiva:
-Cliccando il bottone "Aggiungi Animale," si apre una modale.
-La modale include un input di testo (passato al prop content) per inserire il nome di un animale.
-Conferma: Aggiunge l’animale alla lista e chiude la modale.
-Annulla: Chiude la modale senza modificare la lista.

Obiettivo: L’utente può aggiungere animali specifici utilizzando la modale.
*/

// const animaliDefault = ["Corvo", "Maiale", "Papera", "Gatto", "Suricato", "Marmotta"]
//
// const Componente = () => {
//
//     const { useState } = React
//     const [animals, setAnimals] = useState([])
//     const [value, setValue] = useState(false)
//     const [animalValue, setAnimalValue] = useState("")
//
//     function getInput() {
//         if (!animalValue) return;
//         setAnimals(curr => [...curr, animalValue])
//         setAnimalValue("")
//         setValue(false)
//     }
//
//
//     return (
//         <>
//             <Modal
//                 title={"Inserisci un animale"}
//                 content={<input type="text" name="addAnimal" id="addAnimal" placeholder="Inserisci un animale" value={animalValue} onChange={(e) => { setAnimalValue(e.target.value) }} />}
//                 show={value}
//                 onClose={() => { setValue(false) }}
//                 onConfirm={getInput}
//             />
//             <button onClick={() => { setValue(true) }}>Aggiungi Animale</button>
//             <details>
//                 <summary>Animali</summary>
//                 <ul>
//                     {animals.map((animale, index) => <li key={index}>{animale}</li>)}
//                 </ul>
//             </details>
//         </>
//     )
// }
//
//
// function Modal({
//     title,
//     content,
//     show,
//     onClose,
//     onConfirm
// }) {
//     return show && ReactDOM.createPortal(
//         <div className="modal-container">
//             <div className="modal">
//                 <h2>{title}</h2>
//                 <div>{content}</div>
//                 <div>
//                     <button onClick={onClose}>Annulla</button>
//                     <button onClick={onConfirm}>Conferma</button>
//                 </div>
//             </div>
//         </div>,
//         document.body
//     )
// }
//
// ReactDOM.createRoot(document.querySelector(".lista-animali")).render(<Componente />)

///////////////////////////////////////////////////////////////////////////////////////////

//🎯 Bonus: Utilizzare l'API per Creare Card

const { useState } = React

const Componente = () => {


    const [animals, setAnimals] = useState([]) // Tiene il valore dell'array con gli animali
    const [animalInput, setAnimalInput] = useState("") // Tiene il valore dell'animale inserito nel campo di input 
    const [show, setShow] = useState(false) // Tiene il valore show per la modale
    const [loader, setLoader] = useState(false) // Tiene il valore del loader di caricamento in attesa dei dati 
    const [error, setError] = useState("")

    const aggiungiAnimale = async () => {
        setError("")
        setLoader(true)
        try {
            const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/animals?search=${animalInput}`)
            const [animalData] = await response.json()
            if (!animalData) {
                throw new Error("Animale non trovato")
            }
            const newAnimal = {
                name: animalData.name || "Nessun nome trovato",
                description: animalData.description || "Nessuna descrizione trovata",
                image: animalData.image || null
            }
            setAnimals(curr => [...curr, newAnimal])

        } catch (error) {
            console.log(error.message)
            const message = error.message === "Animale non trovato" ? "Animale non trovato" : "Errore nella ricerca"
            setError(message)
            console.error(error)
        } finally {
            setShow(false)
            setAnimalInput("")
            setLoader(false)
        }

    }



    return loader === false ? (
        <>
            <Modal
                title={"Inserisci un animale"}
                content={<input type="text" name="addAnimal" id="addAnimal" placeholder="Inserisci un animale" value={animalInput} onChange={(e) => { setAnimalInput(e.target.value) }} />}
                show={show}
                onClose={() => { setShow(false) }}
                onConfirm={aggiungiAnimale}
            />
            <button onClick={() => { setShow(true) }}>Aggiungi Animale</button>
            <details>
                <summary>Animali</summary>
                {error ? <div>{error}</div> : animals.map((animale, index) =>
                    <div key={index}>
                        <h2>{animale.name}</h2>
                        <p>{animale.description}</p>
                        <figure>
                            <img src={animale.image} alt="" />
                        </figure>
                    </div>
                )}

            </details>
        </>
    ) : <><h1>Loading...</h1></>
}


function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm
}) {
    return show && ReactDOM.createPortal(
        <div className="modal-container">
            <div className="modal">
                <h2>{title}</h2>
                <div>{content}</div>
                <div>
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>Conferma</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

ReactDOM.createRoot(document.querySelector(".lista-animali")).render(<Componente />)