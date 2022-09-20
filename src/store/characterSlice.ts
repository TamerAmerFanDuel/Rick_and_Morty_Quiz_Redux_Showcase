import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterProps } from "./types";

export const initialState: CharacterProps = {
    info: {
        count: 0,
        pages: 0,
        next: "",
        prev: null
     },
    results: []
}

export const fetchCharacters = createAsyncThunk<
CharacterProps
>("characters/fetchCharacters", async() => {
    const response = await fetch("https://rickandmortyapi.com/api/character?page=1").then((response)=> response.json())
    return response
})

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder.addCase(fetchCharacters.fulfilled, (_, action)=> action.payload) 
})