import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { CharacterProps } from "./types";

export const initialState: CharacterProps= {
    info: {
        count: 0,
        pages: 0,
        next: "",
        prev: null
    },
    results: []
}

export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", async() => {
    const response = await fetch("https://rickandmortyapi.com/api/character").then((response)=> response.json())
    console.log(response)
    return response
})

export const characterPropSlice = createSlice({
    name: "characterProps",
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder.addCase(fetchCharacters.fulfilled, (state, action)=> action.payload)  
})