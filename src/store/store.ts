import { configureStore } from "@reduxjs/toolkit"
import { characterSlice } from "./characterSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { CharacterState } from "./characterSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"
import { PersistPartial } from "redux-persist/es/persistReducer"

export interface StoreState {
	character: CharacterState & PersistPartial
}

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["results", "info"],
}

const persistedReducer = persistReducer(persistConfig, characterSlice.reducer)

export const store = configureStore<StoreState>({
	reducer: {
		character: persistedReducer,
	},
	devTools: true,
	middleware: [thunk],
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
