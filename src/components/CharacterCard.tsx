import { Grid, Card, CardMedia, CardContent, TextField } from "@mui/material"
import { CharacterResult } from "../store/types"
import { useState } from "react"

interface CharacterCardProps {
    character: CharacterResult
}

const CharacterCard: React.FC<CharacterCardProps> = ({
	character
}) => {



	const [ name, setName ] = useState("")

	return(
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<CardMedia 
					id={String(character.id)}
					component="img"
					height="300"
					src={character.image}
					alt={character.name}
				/>
				<CardContent>

					<TextField label="Who am I?.." variant="outlined" value={name} onChange={event => {setName(event.target.value)}}/>                    
				</CardContent>
			</Card>
		</Grid>
	)
}

export default CharacterCard
