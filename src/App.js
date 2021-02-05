import "./App.scss";
import { useState } from "react";
// ma todoliste

function App() {
  // ma liste initiale
  const [maListe, setMaListe] = useState(["faire à manger", "nourir le chat"]);
  // mon input initial
  const [input, setInput] = useState("");
  // mon bouton check initial
  const [check, setCheck] = useState(false);
  // ma classe pour barré le texte
  const [color, setColor] = useState("noLine");

  return (
    <div className="App">
      {maListe.map((elem, index) => {
        /* Affiche les éléments de ma liste dynamiquement (boucle) */

        return (
          // Une tâche
          <div className="oneTask" key={index}>
            {/* Bouton Checkbox */}

            <input
              type="checkbox"
              // checked={false}
              onClick={(event) => {
                // lors du click sur la checkbox, la valeur du check change pour faire changer l'aspect de la tache
                !check ? setCheck(true) : setCheck(false);
                check ? setColor("noLine") : setColor("line");
                console.log(event);
              }}
            />

            {/* ma tâche  */}
            <p className={color}>{elem}</p>

            {/* bouton Delete */}
            <button
              onClick={() => {
                // quand je clique sur la corbeille, la tache se supprime du tableau de liste
                // je fais une copie de mon tableau
                const newListe = [...maListe];
                // je cherche dans ma newListe, s'il existe la tache faisant parti de la meme boucle
                if (newListe.indexOf(maListe[index]) !== -1) {
                  // si je trouve, je supprime la task du tableau copié
                  const aSupprimer = newListe.splice(index, 1);
                  // Puis je mets ce nouveau tableau dans le state du tableau initial
                  setMaListe(newListe);
                  console.log(`taks deleted = ${aSupprimer}`);
                  console.log(`ma liste = ${maListe}`);
                }
              }}
            >
              X
            </button>
          </div>
        );
      })}

      {/* Affiche mon input */}
      <input
        type="text"
        placeholder="new task"
        value={input}
        onChange={(event) => {
          // Je récupère la valeur de l'input
          const newTask = event.target.value;
          // je modifie mon state
          setInput(newTask);
        }}
      />
      {/* bouton de mon input */}
      <button
        type="submit"
        onClick={() => {
          // je crée une copie de ma liste
          const newListe = [...maListe];
          //  j'y ajoute ma nouvelle tâche
          newListe.push(input);
          // je change ma liste initiale
          setMaListe(newListe);
        }}
      >
        Add task
      </button>
    </div>
  );
}

export default App;
