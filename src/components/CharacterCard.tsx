import { Grid, Card, CardMedia, CardContent, TextField, styled } from "@mui/material"
import { CharacterResult } from "../store/types"
import { useState } from "react"

interface CharacterCardProps {
	character: CharacterResult
}

const ValidationTextField = styled(TextField)({
	'& input:disabled + fieldset': {
	  	borderColor: 'green !important',
	  	borderWidth: 2,
	},
	"& input:disabled": {
		"-webkit-text-fill-color": "green !important"
	},
	'& input:invalid + fieldset': {
		borderColor: 'red',
		borderWidth: 2,
	},
	'& input:valid:focus + fieldset': {
		borderLeftWidth: 6,
		padding: '4px !important',
	},
})

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
					{name.toLocaleLowerCase().trim() === character.name.toLocaleLowerCase().trim() ?
					<ValidationTextField
					disabled
					value={character.name}
					variant="outlined"
					label={<span>✅</span>}
					/>
					:
					<ValidationTextField
					required
					variant="outlined"
					label="Who am I?.."
					id="validation-outlined-input"
					onChange={event => setName(event.target.value)}
					inputProps={{pattern: [character.name.toLocaleLowerCase()]}}
					value={name}
					/>
					}  
				</CardContent>
			</Card>
		</Grid>
	)
}

export default CharacterCard
