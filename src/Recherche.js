import "./Recherche.css";

function Recherche({ valeur, compteur, onChange }) {
  return (
    <div className="recherche">
      <input
        type="text"
        className="recherche-input"
        placeholder="Rechercher une ligne (depart, arrivee)..."
        value={valeur}
        onChange={(e) => {
          const [setRecherche, setCompteur] = onChange;
          setRecherche(e.target.value);
          setCompteur(compteur + 1);
        }}
      />
    </div>
  );
}

export default Recherche;
