import { useDispatch, useSelector } from "react-redux"
import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useState, useEffect } from "react"
import { addCharacter} from "../store/characterSlice"
import { CharacterProps, Character } from "../store/types"
import { fetchCharacters } from "../store/characterPropSlice"

const CharacterList = () => {

    const fetchedProps = useAppSelector((state: StoreState) => state.characterProps)
    const dispatch = useAppDispatch()

    const charDispatch=useDispatch()

    // const [allChars, setAllChars] = useState([])


    // const CharacterCreate = (characterProps: CharacterProps,index:number)=> {
    //     const character: Character = {
    //         id: characterProps.results[index].id,
    //         name: characterProps.results[index].name,
    //         image: characterProps.results[index].image
    //     }
    
    //    dispatch(addCharacter(character))
    // }

    useEffect(()=>{
        console.log("useEffect working")
        dispatch(fetchCharacters())
    },[])
  

    // const characterProperties = () => fetchedProps.map((characterProps,index) => {
    //     CharacterCreate(characterProps,index)
    // })




    return(
        <>
            {/* {characterProperties} */}
            <h2>As I</h2>
            <p>{JSON.stringify(fetchedProps,null,2)}</p>
        </>
        )
}

export default CharacterList