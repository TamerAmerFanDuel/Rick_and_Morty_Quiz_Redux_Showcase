import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useState, useEffect } from "react"
import { fetchCharacters } from "../store/characterSlice"

const CharacterList = () => {
	const [ name, setName ] = useState("")

	const fetchedCharacters = useAppSelector((state:StoreState)=> state.characters)
	const dispatch = useAppDispatch()

	useEffect(()=>{
		dispatch(fetchCharacters())
	},[dispatch])

	const showResults = fetchedCharacters.results.map((character)=>{
		return(
			<>
				<p>{character.name}</p>
				<img src={character.image} alt={character.name} width="200" height="200"/>
				<form>
					<input type="text" placeholder="Who am i?.." onChange={event =>{setName(event.target.value)}} value={name}></input>
				</form>
			</>
		)
	})

	return(
		<>
			{showResults}
			<p>{JSON.stringify(fetchedCharacters,null,2)}</p>
		</>
	)
}

export default CharacterList