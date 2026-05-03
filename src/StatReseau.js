import "./StatReseau.css";

function StatReseau({ lignes }) {
  const totalLignes = lignes.length;

  let totalArrets = 0;
  let ligneMax = lignes[0];

  for (let i = 0; i < lignes.length; i++) {
    totalArrets = totalArrets + lignes[i].arrets;
    if (lignes[i].arrets > ligneMax.arrets) {
      ligneMax = lignes[i];
    }
  }

  return (
    <div className="stat-reseau">
      <div className="stat-item">
        <span className="stat-nombre">{totalLignes}</span>
        <span className="stat-label">Lignes</span>
      </div>
      <div className="stat-item">
        <span className="stat-nombre">{totalArrets}</span>
        <span className="stat-label">Arrêts au total</span>
      </div>
      <div className="stat-item">
        <span className="stat-nombre">Ligne {ligneMax.numero}</span>
        <span className="stat-label">{ligneMax.arrets} arrêts (max)</span>
      </div>
    </div>
  );
}


export default StatReseau;
