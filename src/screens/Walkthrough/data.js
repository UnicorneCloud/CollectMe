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
	"headline": "Avoir toujours des ustensils dans son sac!",
	"icon": <MaterialCommunityIcons name="silverware-fork" style={styles.imageIcons} />
},
{
	"id": 2,
	"headline": "Pensez à acheter en vrac et local!",
	"icon": <MaterialCommunityIcons name="truck-fast" style={styles.imageIcons} />
},
{
	"id": 3,
	"headline": "Pensez réutilisable et non jetable!",
	"icon": <MaterialCommunityIcons name="recycle" style={styles.imageIcons} />
},
{
	"id": 4,
	"headline": "Fabriquer son rince-bouche maison!",
	"icon": <MaterialCommunityIcons name="spray" style={styles.imageIcons} />
},
{
	"id": 5,
	"headline": "Raporter ses contenants non utilisé à son épicerie en vrac!",
	"icon": <MaterialIcons name="local-grocery-store" style={styles.imageIcons}  />
}
];