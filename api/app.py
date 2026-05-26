import json

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)


@app.route("/")
def accueil():
    return jsonify(
        {
            "message": "Bienvenue sur l'API SenTransport !",
            "endpoints": ["/lignes", "/lignes/<id>"],
        }
    )


@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)


@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next((l for l in lignes if l["id"] == ligne_id), None)
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    return jsonify(ligne)


@app.route("/arrets", methods=["GET"])
def get_arrets():
    arrets = set()
    for ligne in lignes:
        arrets.update(arret for arret in ligne["listeArrets"])
    return jsonify(list(arrets))


@app.route("/stats", methods=["GET"])
def get_stats():
    line_count = 0
    arrets = set()
    max_arrets = lignes[0]
    for ligne in lignes:
        line_count += 1
        arrets.update(arret for arret in ligne["listeArrets"])
        if len(ligne["listeArrets"]) > len(max_arrets["listeArrets"]):
            max_arrets = ligne

    stop_count = len(arrets)

    return jsonify(
        {
            "nombre_lignes": line_count,
            "nombre_arrets": stop_count,
            "ligne_avec_max_arrets": max_arrets["id"],
        }
    )


@app.route("/lignes/recherche", methods=["GET"])
def recherche():
    q = request.args.get("q", "")
    lignes_list = []
    for ligne in lignes:
        if q in ligne["depart"] or q in ligne["arrivee"]:
            lignes_list.append(ligne)

    if len(lignes_list) > 0:
        return jsonify(lignes_list)

    return jsonify({"message": "ligne introuvable"})


if __name__ == "__main__":
    app.run(debug=True, port=5001, host="::")
