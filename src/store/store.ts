import { configureStore } from "@reduxjs/toolkit"
import { characterSlice } from "./characterSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { CharacterState } from "./characterSlice"

export interface StoreState {
	character: CharacterState
}

export const store = configureStore<StoreState>({
	reducer: {
		character: characterSlice.reducer,
	},
	devTools: true,
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
