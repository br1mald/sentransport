import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import {
  StatistiquesArrets,
  StatistiquesBus,
  StatistiquesLignes,
} from "./Statistiques";
function App() {
  return (
    <div className="App">
      <Header />
      <main className="Contenu">
        <p>
          Bienvenue ! Cette application vous aide a trouver votre ligne de bus a
          Dakar.
        </p>
      </main>
      <div className="Statistiques">
        <StatistiquesArrets />
        <StatistiquesLignes />
        <StatistiquesBus />
      </div>
      <Footer />
    </div>
  );
}
export default App;
