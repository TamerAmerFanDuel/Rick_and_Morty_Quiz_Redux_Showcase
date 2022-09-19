import { configureStore } from "@reduxjs/toolkit";
import { characterSlice } from "./characterSlice";
import { CharacterProps } from "./types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface StoreState {
    characters: CharacterProps
}

export const store = configureStore<StoreState>({
    reducer: {
        characters: characterSlice.reducer,
    },
    devTools: true
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector