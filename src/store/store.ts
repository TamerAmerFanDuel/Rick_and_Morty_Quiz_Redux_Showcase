import { configureStore } from "@reduxjs/toolkit";
import { characterSlice } from "./characterSlice";
import { CharacterProps, Character } from "./types";
import { characterPropSlice } from "./characterPropSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface StoreState {
    characters: Character[]
    characterProps: CharacterProps
}

export const store = configureStore<StoreState>({
    reducer: {
        characters: characterSlice.reducer,
        characterProps: characterPropSlice.reducer
    },
    devTools: true
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector