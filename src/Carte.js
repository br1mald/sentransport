import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Carte.css";

// Corriger les icones Leaflet (bug webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const iconeRouge = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Calculer la distance entre 2 points GPS (km)
function calculerDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function BoutonCentrer({ position }) {
  const map = useMap();
  if (!position) return null;
  return (
    <button
      onClick={() => map.setView(position, 15)}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        padding: "8px 12px",
        background: "#2c3e50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Centrer sur ma position
    </button>
  );
}

function Carte() {
  const [arrets, setArrets] = useState([]);
  const [positionUtilisateur, setPositionUtilisateur] = useState(null);
  const [arretsProches, setArretsProches] = useState([]);
  const DAKAR = [14.6928, -17.4467];

  // Charger les arrets depuis Flask
  useEffect(() => {
    fetch("http://localhost:5001/arrets")
      .then((r) => r.json())
      .then((data) => setArrets(data))
      .catch((err) => console.error("Erreur arrets:", err));
  }, []);

  // Geolocalisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPositionUtilisateur([pos.coords.latitude, pos.coords.longitude]);
        },
        () => console.log("Geolocation refusee"),
      );
    }
  }, []);

  // Trouver les arrets les plus proches
  useEffect(() => {
    if (positionUtilisateur && arrets.length > 0) {
      const avecDistance = arrets.map((a) => ({
        ...a,
        distance: calculerDistance(
          positionUtilisateur[0],
          positionUtilisateur[1],
          a.lat,
          a.lon,
        ),
      }));
      avecDistance.sort((a, b) => a.distance - b.distance);
      setArretsProches(avecDistance.slice(0, 3));
    }
  }, [positionUtilisateur, arrets]);

  return (
    <div className="carte-container">
      <h2 className="carte-titre">Carte des arrets</h2>
      {arretsProches.length > 0 && (
        <div className="arret-proche">
          <strong>Arrêts les plus proches :</strong>
          <ol style={{ margin: "4px 0 0 16px", padding: 0 }}>
            {arretsProches.map((a) => (
              <li key={a.id}>
                {a.nom} — {a.distance.toFixed(1)} km
              </li>
            ))}
          </ol>
        </div>
      )}
      <MapContainer center={DAKAR} zoom={13} className="carte">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        {arrets.map((a) => (
          <Marker
            key={a.id}
            position={[a.lat, a.lon]}
            icon={
              arretsProches.length > 0 && arretsProches[0].id === a.id
                ? iconeRouge
                : new L.Icon.Default()
            }
          >
            <Popup>
              <strong>{a.nom}</strong>
              <br />
              Lignes : {a.lignes.join(", ")}
            </Popup>
          </Marker>
        ))}

        {positionUtilisateur && (
          <Marker position={positionUtilisateur}>
            <Popup>Vous etes ici</Popup>
          </Marker>
        )}
        <BoutonCentrer position={positionUtilisateur} />
      </MapContainer>
    </div>
  );
}

export default Carte;
