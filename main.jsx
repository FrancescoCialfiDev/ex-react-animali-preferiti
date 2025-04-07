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
// 
//     function getInput() {
//         const input = document.getElementById("addAnimal")
//         setAnimals([...animals, input.value])
//     }
// 
// 
//     return (
//         <>
//             <Modal title={"Inserisci un animale"} content={<input type="text" name="addAnimal" id="addAnimal" placeholder="Inserisci un animale" />} show={value} onClose={() => { setValue(false) }} onConfirm={getInput} />
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

// 🎯 Bonus: Utilizzare l'API per Creare Card

const animaliDefault = ["Corvo", "Maiale", "Papera", "Gatto", "Suricato", "Marmotta"]

const Componente = () => {

    const { useState } = React
    const [animals, setAnimals] = useState([])
    const [value, setValue] = useState(false)
    const [loader, setLoader] = useState(false)

    async function fetchData(url) {
        setLoader(true)
        try {
            const fetchData = await fetch(url)
            const objParse = await fetchData.json()
            return objParse
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false)
        }

    }

    function getInput() {
        const input = document.getElementById("addAnimal")
        fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/animals?search=${input.value}`)
            .then(res => {
                if (res.length > 0) {
                    setAnimals([...animals, { name: res[0].name, description: res[0].description, image: res[0].image }])
                    alert("Animale inserito correttamente")
                } else {
                    alert("Animale non trovato")
                }

            })

        setValue(false)
    }


    return loader === false ? (
        <>
            <Modal
                title={"Inserisci un animale"}
                content={<input type="text" name="addAnimal" id="addAnimal" placeholder="Inserisci un animale" />}
                show={value}
                onClose={() => { setValue(false) }}
                onConfirm={getInput}
            />
            <button onClick={() => { setValue(true) }}>Aggiungi Animale</button>
            <details>
                <summary>Animali</summary>
                <ul>
                    {animals.map((animale) =>
                        <>
                            <li>
                                <h2>{animale.name}</h2>
                                <p>{animale?.description ?? "Nessuna descrizione"}</p>
                                <img src={animale.image} alt="Immagine" />
                            </li>
                        </>
                    )}
                </ul>
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