# SenTransport

Carte interactive des lignes de transport en commun de Dakar (lignes DDD). Frontend React qui consomme une API Flask et affiche les arrêts sur une carte Leaflet, avec géolocalisation de l'utilisateur.

> Projet académique (L2 GLSI — ESP/UCAD).

## Fonctionnalités

- Carte interactive des arrêts (Leaflet / react-leaflet)
- Géolocalisation de l'utilisateur sur la carte
- API REST listant les lignes, leurs arrêts et des statistiques
- Recherche de lignes par point de départ ou d'arrivée

## Stack

- **Frontend :** React 19, react-leaflet, Leaflet
- **Backend :** Flask, flask-cors
- **Données :** fichiers JSON (lignes DDD et arrêts de Dakar)

## API (Flask)

| Méthode | Endpoint | Description |
| --- | --- | --- |
| GET | `/lignes` | Liste toutes les lignes |
| GET | `/lignes/<id>` | Détail d'une ligne (404 si introuvable) |
| GET | `/lignes/recherche?q=...` | Recherche par départ ou arrivée |
| GET | `/arrets` | Liste des arrêts |
| GET | `/stats` | Nombre de lignes, d'arrêts, et ligne avec le plus d'arrêts |

## Lancer le projet en local

### Backend

```bash
cd api
pip install -r requirements.txt        # ou uv sync
python app.py        # démarre sur le port 5001
```

### Frontend

```bash
npm install
npm start            # démarre sur http://localhost:3000
```

## Auteur

Ibrahima Sory Diallo — L2 GLSI, ESP/UCAD (2026)
