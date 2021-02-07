import "./App.scss";
import { useState } from "react";
// ma todoliste

function App() {
  // ma liste initiale
  const [maListe, setMaListe] = useState([]);
  // mon input initial
  const [input, setInput] = useState("");
  // input de recherche initale
  const [search, setSearch] = useState("");
  // Les fonctions handle
  const handleSubmit = (e) => {
    e.preventDefault();
    // je crée une copie de ma liste
    const newListe = [...maListe];
    //j'ajoute ma nouvelle tâche sous forme d'objet (le + récent en premier)
    newListe.unshift({ task: input, check: false, display: "block" });
    // Je modifie ma listeIntiale, par ma newListe
    setMaListe(newListe);
    // Remet à zéro l'input d'ajout
    setInput("");
  };

  return (
    <div className="App">
      {/* formulaire de recherche */}
      <form>
        {/* input de recherche */}
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            const newTab = [...maListe];
            for (let i = 0; i < maListe.length; i++) {
              if (newTab[i].task.indexOf(value) !== -1) {
                console.log(newTab[i]);
                newTab[i].display = "block";
              } else {
                newTab[i].display = "none";
              }
            }
          }}
        />
      </form>
      {maListe.map((elem, index) => {
        /* Affiche les éléments de ma liste dynamiquement (boucle) */
        return (
          // Une tâche
          <div className="oneTask" key={index}>
            {/* Bouton Checkbox */}
            <input
              type="checkbox"
              checked={elem.check}
              onChange={(event) => {
                const newTab = [...maListe]; //[monTableauComplet]
                let target = event.target.checked; //valeur de l'input checkbox
                newTab[index].check = target; //cible l'objet actuel et check
                const objetSup = newTab.splice(index, 1); //supprime l'objet actuel
                newTab.push(objetSup[0]); //ajoute en derniere position l'objet actuel supprimé
                setMaListe(newTab); //envoie dans maListe
              }}
            />

            {/* ma tâche  */}
            <p
              className={elem.check ? "line" : "noLine"}
              key={elem.key}
              style={{ display: elem.display === "block" ? "block" : "none" }}
            >
              {elem.task}
            </p>

            {/* bouton Delete */}
            <button
              onClick={() => {
                // je fais une copie de mon tableau
                const newListe = [...maListe];
                // je cherche dans ma newListe, s'il existe la tâche faisant parti de la meme boucle
                if (newListe.indexOf(maListe[index]) !== -1) {
                  // si je trouve, je supprime la task du tableau copié
                  newListe.splice(index, 1);
                  // Puis je mets ce newTab sans l'objet, dans maListe
                  setMaListe(newListe);
                }
              }}
            >
              X
            </button>
          </div>
        );
      })}

      {/* Ajour d'une tâche */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="new task"
          value={input}
          onChange={(event) => {
            // Je récupère la valeur de l'input
            const newTask = event.target.value;
            // je stocke la newTask dans un state
            setInput(newTask);
          }}
        />
        {/* bouton de mon input */}
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default App;
