import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	TextField,
	styled,
} from "@mui/material"
import { CharacterResult } from "../store/types"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { addCorrectGuess } from "../store/characterSlice"

interface CharacterCardProps {
	character: CharacterResult
}

const ValidationTextField = styled(TextField)({
	"& input:disabled + fieldset": {
		borderColor: "green !important",
		borderWidth: 2,
	},
	"& input:disabled": {
		"-webkit-text-fill-color": "green !important",
	},
	"& input:invalid + fieldset": {
		borderColor: "red",
		borderWidth: 2,
	},
	"& input:valid:focus + fieldset": {
		borderLeftWidth: 6,
		padding: "4px !important",
	},
})

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
	const correctGuesses = useAppSelector(
		(state) => state.character.correctGuesses
	)

	const [name, setName] = useState("")
	const isGuessCorrect = correctGuesses.includes(String(character.id))
	const isGuessCorrectEvent = (guess: string) => {
		return (
			guess.toLocaleLowerCase().trim() ===
			character.name.toLocaleLowerCase().trim()
		)
	}

	const dispatch = useAppDispatch()

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		event.preventDefault()
		if (isGuessCorrectEvent(event.target.value)) {
			dispatch(addCorrectGuess(String(character.id)))
			setName("")
		} else {
			setName(event.target.value)
		}
	}

	return (
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
					<ValidationTextField
						id="validation-outlined-input"
						disabled={isGuessCorrect}
						value={isGuessCorrect ? character.name : name}
						variant="outlined"
						label={isGuessCorrect ? <span>✅</span> : "Who am I?.."}
						inputProps={{ pattern: [character.name.toLocaleLowerCase()] }}
						onChange={handleChange}
						required
					/>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default CharacterCard
