import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { CharacterProps, CharacterPageInfo, CharacterResult } from "./types"

export interface CharacterState {
	info: CharacterPageInfo
	results: CharacterResult[]
	correctGuesses: string[]
}

export const initialState: CharacterState = {
	info: {
		count: 0,
		pages: 0,
		next: null,
		prev: null,
		currentPage: 1,
	},
	results: [],
	correctGuesses: [],
}

export const fetchCharacters = createAsyncThunk<
	Pick<CharacterState, "info" | "results">,
	number
>("characters/fetchCharacters", async (page: number) => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/character?page=${page}`
	)
		.then((response) => response.json())
		.then((data: CharacterProps): Pick<CharacterState, "info" | "results"> => {
			return {
				info: {
					...data.info,
					currentPage: page,
				},
				results: data.results,
			}
		})
	return response
})

const badID = [19, 66, 104, 189, 249]

export const characterSlice = createSlice({
	name: "characters",
	initialState,
	reducers: {
		addCorrectGuess: (state, action: PayloadAction<string>) => {
			state.correctGuesses.push(action.payload)
		},
		resetCorrectGuesses: (state, _: PayloadAction<undefined>) => {
			state.correctGuesses.length = 0
		},
	},
	extraReducers: (builder) =>
		builder.addCase(fetchCharacters.fulfilled, (state, action) => {
			const filteredResults = action.payload.results.filter(
				(result) => !badID.includes(result.id)
			)
			state.results = filteredResults
			state.info = action.payload.info
		}),
})

export const { addCorrectGuess, resetCorrectGuesses } = characterSlice.actions
