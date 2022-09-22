import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useEffect } from "react"
import { fetchCharacters } from "../store/characterSlice"
import { Box, Grid, Pagination } from "@mui/material"
import CharacterCard from "./CharacterCard"
import { Container } from "@mui/system"
import PageSelector from "./PageSelector"

const CharacterList = () => {
    
    const fetchedCharacters = useAppSelector((state:StoreState)=> state.character)
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        dispatch(fetchCharacters(1))
    },[dispatch])
    
    

    const handleChange=(pageChange: number)=>{
        dispatch(fetchCharacters(pageChange))
    }


    return(
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <PageSelector/>
                    </Grid>
                    <Grid item xs={4}>
                        <Pagination count={fetchedCharacters.info.pages} page={fetchedCharacters.info.currentPage} onChange={(_,pageChange)=>{handleChange(pageChange)}}/>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={1}>
            {fetchedCharacters.results.map((character)=>
                    <CharacterCard key={character.id} character={character}/>
                )
            }
            </Grid>
        </Container>
    )
}

export default CharacterList