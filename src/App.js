import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Recherche from "./Recherche";
import LigneBus from "./LigneBus";
import DetailLigne from "./DetailLigne";
import Footer from "./Footer";
import EraseButton from "./EraseButton";

function App() {
  // 1. Trois etats
  const [compteur, setCompteur] = useState(0);
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

  // 2. Charger les donnees au demarrage
  useEffect(() => {
    fetch("http://localhost:5001/lignes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLignes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  const lignesFiltrees = lignes.filter(
    (l) =>
      l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
      l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
      l.numero.includes(recherche),
  );

  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
    } else {
      setLigneSelectionnee(ligne);
    }
  }
  // Ecran de chargement
  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes...</p>
        </main>
      </div>
    );
  }

  // Ecran d'erreur
  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <p>
          Vous avez effectué {compteur} recherche{compteur > 1 ? "s" : ""}
        </p>
        <div className="recherche-erase">
          <Recherche
            valeur={recherche}
            compteur={compteur}
            onChange={[setRecherche, setCompteur]}
          />
          <EraseButton onEffacer={setRecherche} />
        </div>
        <p className="resultat-recherche">
          {lignesFiltrees.length === 0 ? (
            "Aucune ligne trouvée"
          ) : (
            <>
              {lignesFiltrees.length} ligne
              {lignesFiltrees.length > 1 ? "s" : ""} trouvée
              {lignesFiltrees.length > 1 ? "s" : ""}
            </>
          )}
        </p>
        {lignesFiltrees.map((ligne) => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={
              ligneSelectionnee && ligneSelectionnee.id === ligne.id
            }
            onClick={() => handleClickLigne(ligne)}
          />
        ))}
        {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
