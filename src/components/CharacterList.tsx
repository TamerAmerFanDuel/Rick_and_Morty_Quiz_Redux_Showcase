import { useDispatch, useSelector } from "react-redux"
import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useState, useEffect } from "react"
import { addCharacter } from "../store/characterSlice"
import { Character, Result } from "../store/types"
import { fetchCharacters } from "../store/characterPropSlice"

const CharacterList = () => {

    const [ name, setName ] = useState("")

    const fetchedProps = useAppSelector((state: StoreState) => state.characterProps)
    const fetchedCharacters = useSelector((state:StoreState)=> state.characters)
    const dispatch = useAppDispatch()

    const charDispatch=useDispatch()

    // const [allChars, setAllChars] = useState([])

    const CharacterCreate = (characterProps: Result)=> {
        if (characterProps !== undefined){
            const character: Character= {
                id: characterProps.id,
                name: characterProps.name,
                image: characterProps.image
            }
            console.log(character)
            charDispatch(addCharacter(character))
        }
    }

    useEffect(()=>{
        dispatch(fetchCharacters())
    },[dispatch])
  

    const characterProperties = () => fetchedProps.results.map((characterProps) => {
        CharacterCreate(characterProps)
    })

    useEffect(()=>{
        characterProperties()
    },[fetchedProps])


    const showResults = fetchedCharacters.map((character)=>{
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