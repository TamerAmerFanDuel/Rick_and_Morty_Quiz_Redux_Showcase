import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterProps } from "./types";
import { Character } from "./types";



// export interface Characters {
//     characters: Character[]
// }

export const initialState: Character[] = []



// const props: CharacterProps[] = []

const createCharacter = ( characterObject : Character): Character => ({
    id : characterObject.id,
    name : characterObject.name,
    image : characterObject.image
})



export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<Character>) => {
            const character = createCharacter(action.payload)
            state.push(character)
        },
    },
    
})


export const {addCharacter} = characterSlice.actions