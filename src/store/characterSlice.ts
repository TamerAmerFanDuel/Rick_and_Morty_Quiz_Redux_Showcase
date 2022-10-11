import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { CharacterProps, CharacterPageInfo, CharacterResult } from "./types"

export interface CharacterState {
	info: CharacterPageInfo
	results: CharacterResult[]
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
}

export const fetchCharacters = createAsyncThunk<CharacterState, number>(
	"characters/fetchCharacters",
	async (page: number) => {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character?page=${page}`
		)
			.then((response) => response.json())
			.then((data: CharacterProps): CharacterState => {
				return {
					info: {
						...data.info,
						currentPage: page,
					},
					results: data.results,
				}
			})
		return response
	}
)

const badID = [19, 66, 104, 189, 249]

export const characterSlice = createSlice({
	name: "characters",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder.addCase(fetchCharacters.fulfilled, (state, action) => {
			const filteredResults = action.payload.results.filter(
				(result) => !badID.includes(result.id)
			)
			state.results = filteredResults
			state.info = action.payload.info
		}),
})
