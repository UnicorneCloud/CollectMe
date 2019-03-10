# 16 - UnicornPowered - CollectMe

## Inspiration

>Québec, le 17 février 2016 – La proportion de ménages québécois qui déclarent pratiquer le compostage résidentiel a fortement augmenté entre 2006 et 2013, passant de 13 % à 45 %.


>En 2013, 27 % des ménages québécois déclarent composter leurs résidus de cuisine. Plus de la moitié (56 %) des ménages qui disposent d’une cour susceptible de générer des résidus verts déclarent composter. Ces proportions sont en augmentation depuis 2006.


>Actuellement, au Québec, seulement 30 % des municipalités offrent la collecte des matières organiques.

Une seule application pour rassembler toute l'information pertinente sur les services à proximité pour réduire son impact écologique. L'application permet d'améliorer la relation avec le citoyen et la connaissance du territoire.

## Ce que l'application fait

Rassemble toutes les informations nécessaires aux citoyens pour diminuer son empreinte écologique en se basant sur les services offerts à proximité.

En combinant les données de collectes de déchets et recyclage, zone de ramassage des rebuts tels les écocentres et des emplacements des compostages communautaires.

L'application permet notamment de : 
* Sensibiliser les citoyens avec des articles environnementaux
* Afficher des astuces environnementales aléatoires à chaque ouverture de l'application
* Afficher un calendrier d'évènement ayant une conscience environnementale
* Afficher une prévision 14 jours pour les différentes collectes disponibles dans son quartier
* Trouver les écocentres ainsi que les centres de compost communautaire les plus près de soi sur une carte
* Générer des rappels aux citoyens pour l’avertir de la journée de la collecte pour son quartier

## Les données

Données Québec :

* https://www.donneesquebec.ca/recherche/fr/dataset/collecte-des-dechets
* https://www.donneesquebec.ca/recherche/fr/dataset/collecte-des-matieres-recyclables
* https://www.donneesquebec.ca/recherche/fr/dataset/collecte-des-residus-verts
* https://www.donneesquebec.ca/recherche/fr/dataset/vque_14 (lieux publics pour écocentres)
* Point de dépôts : https://lesserpuariens.com/
* Zones de composts communautaires: Sur le site de la ville de Québec

## Les technologies utilisées

* React Native pour le frontend
* Amazon Web Services (AWS) pour le backend

## Accomplissement

* Manque de normalisation dans les données de différentes villes. Par exemple les périodes de ramassage sont écrit comme ceci: `vendredi, chaque semaine, du 08 octobre 2018 au 16 novembre 2018`

## Ce que j'ai appris

* Geojson: On ne connaissait pas ce format
* React Native: C'était notre première expérience avec cette technologie

## Pour la suite de CollectMe

* Gamification: Sur la quantité de déchets et voir la performance de ton quartier
* Ajouter une gestion de son propre bac de compost
* Ajouter les autres périodes de ramassages tels que les Alocarbures et les encombrants
