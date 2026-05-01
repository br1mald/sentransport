import "./Statistiques.css";

function StatistiquesLignes() {
  const num = 10;
  const libelle = "Lignes";
  return (
    <p className="Statistiques">
      {num} {libelle}
    </p>
  );
}

function StatistiquesArrets() {
  const num = 25;
  const libelle = "Arrêts";
  return (
    <p className="Statistiques">
      {num} {libelle}
    </p>
  );
}

function StatistiquesBus() {
  const num = 30;
  const libelle = "Bus";
  return (
    <p className="Statistiques">
      {num} {libelle}
    </p>
  );
}

export { StatistiquesArrets, StatistiquesBus, StatistiquesLignes };
