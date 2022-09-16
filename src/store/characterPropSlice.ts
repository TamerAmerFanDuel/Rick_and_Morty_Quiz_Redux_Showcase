import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterProps } from "./types";


export const initialState: CharacterProps[]= []

export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", async() => {
    const response = await fetch("https://rickandmortyapi.com/api/character").then((response)=> response.json())
    console.log(response)
    return response
})

// const createCharacterProps = (characterProps: CharacterProps): CharacterProps =>({
//     characterProperties: 
// })

export const characterPropSlice = createSlice({
    name: "characterProps",
    initialState,
    reducers: {
        // addCharacterProps: (state, action: PayloadAction<CharacterProps>)=>{
        //     const characterProps = createCharacterProps(action.payload)
        //     state.push(characterProps)
        // }
    },
    extraReducers: builder =>
        builder.addCase(fetchCharacters.fulfilled, (state, action)=> action.payload.results) 
    
    // {
    //     [fetchCharacters.fulfilled]: (state,action)=>{
    //         state = action.payload
    //     }
    // }
})