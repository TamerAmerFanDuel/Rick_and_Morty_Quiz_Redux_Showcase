import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterProps, CharacterPageInfo, CharacterResult } from "./types";

export interface CharacterState{
    info: CharacterPageInfo,
    results: CharacterResult[],
}

export const initialState: CharacterState = {
    info:{
        count: 0,
        pages: 0,
        next: null,
        prev: null,
        currentPage: 1
    },
    results:[]
}

export const fetchCharacters = createAsyncThunk<CharacterState, number>(
    "characters/fetchCharacters",
    async(page: number) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then((response)=> response.json())
            .then((data: CharacterProps): CharacterState =>{
                return{
                    info:{
                        ...data.info, 
                        currentPage: page
                    },
                    results: data.results
                }
                
            })
        return response
    }
)

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder.addCase(fetchCharacters.fulfilled, (_, action)=> action.payload) 
})