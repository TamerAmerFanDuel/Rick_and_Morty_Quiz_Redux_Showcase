import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useEffect } from "react"
import { fetchCharacters } from "../store/characterSlice"
import { Grid, Pagination } from "@mui/material"
import CharacterCard from "./CharacterCard"

const CharacterList = () => {

    const fetchedCharacters = useAppSelector((state:StoreState)=> state.character)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchCharacters(1))
    },[dispatch])

    const showResults = fetchedCharacters.results.map((character)=>{
        return(
            CharacterCard(character)
        )
    })

    const handleChange=(pageChange: number)=>{
        dispatch(fetchCharacters(pageChange))
    }


    return(
        <>
            <Pagination count={fetchedCharacters.info.pages} page={fetchedCharacters.info.currentPage} onChange={(_,pageChange)=>{handleChange(pageChange)}}/>
            <Grid container spacing={1}>
                {showResults}
            </Grid>
        </>
    )
}

export default CharacterList