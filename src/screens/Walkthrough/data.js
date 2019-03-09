import React from "react";
import styles from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const DATA = [
	{
	"id": 0,
	"headline": "Prendre des vienoiseries (ou son pain) dans un sac en tissu",
	"icon": <MaterialCommunityIcons name="food-croissant" style={styles.imageIcons} />
},
{
	"id": 1,
	"headline": "Toujours avoir des ustensiles dans son sac!",
	"icon": <MaterialCommunityIcons name="silverware-fork" style={styles.imageIcons} />
},
{
	"id": 2,
	"headline": "Acheter local et en vrac!",
	"icon": <MaterialCommunityIcons name="truck-fast" style={styles.imageIcons} />
},
{
	"id": 3,
	"headline": "Penser réutilisable et non jetable!",
	"icon": <MaterialCommunityIcons name="recycle" style={styles.imageIcons} />
},
{
	"id": 4,
	"headline": "Fabriquer son propre rince-bouche maison!",
	"icon": <MaterialCommunityIcons name="spray" style={styles.imageIcons} />
},
{
	"id": 5,
	"headline": "Faire son épicerie en vrac avec ses vieux contenants!",
	"icon": <MaterialIcons name="local-grocery-store" style={styles.imageIcons}  />
}
];