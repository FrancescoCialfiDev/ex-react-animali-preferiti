const animaliVari = ["Cane", "Gatto", "Pappagallo", "Cavallo", "Panda"];
const Componente = () => {

    const { useState } = React
    const [animals, setAnimals] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [addedAnimal, setAddedAnimal] = useState("")

    const Input = () => {
        return <input type="text" name="animale" id="animalInput" placeholder="Inserisci un animale" />
    }

    function Modal({ title, content, show, onConfirm, onClose }) {
        return show && ReactDOM.createPortal(
            <div className="modal-container">
                <div className="modal">
                    <h2>{title}</h2>
                    <div className="modalContent">
                        {content}
                    </div>
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>Conferma</button>
                </div>
            </div>,
            document.body
        )
    }

    function addAnimal() {
        setAnimals([...animals, document.getElementById("animalInput").value])
        setShowModal(false)
    }


    return (
        <main>
            <button onClick={() => { setShowModal(true) }}>Aggiungi animale</button>
            <details>
                <summary><strong>Animali</strong></summary>
                <ul>{animals ? animals.map((element, index) => <li key={index}>{element}</li>) : <li>Nessun animale disponibile</li>}</ul>
            </details>
            <Modal title={"Aggiungere un animale"} content={<Input />} show={showModal} onClose={() => { setShowModal(false) }} onConfirm={() => { addAnimal() }} />
        </main>
    )
}

const elementRoot = ReactDOM.createRoot(document.querySelector(".lista-animali"))
elementRoot.render(<Componente />)


