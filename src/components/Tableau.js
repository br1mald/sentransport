import User from "./User";

function Tableau({ titre }) {
  const utilisateurs = [
    { id: 1, nom: "Rohan", prenom: "Kishibe" },
    { id: 2, nom: "Kira", prenom: "Yoshikage" },
  ];
  return (
    <div>
      <h1>Tableau {titre}</h1>
      {utilisateurs.map(({ id, nom, prenom }) => (
        <User key={id} id={id} nom={nom} prenom={prenom} />
      ))}
    </div>
  );
}

export default Tableau;
