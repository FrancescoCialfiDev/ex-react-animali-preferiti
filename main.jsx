const animals = ["Cane", "Gatto", "Pappagallo", "Cavallo", "Panda"];

const Componente = () => {

    return (

        <>
            <details>
                <summary><strong>Animali</strong></summary>
                <ul>
                    {animals.map(element => <li>{element}</li>)}
                </ul>
            </details>
        </>

    )
}

const elementRoot = ReactDOM.createRoot(document.querySelector(".lista-animali"))
elementRoot.render(<Componente />)

