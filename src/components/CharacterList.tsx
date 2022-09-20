import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useState, useEffect } from "react"
import { fetchCharacters } from "../store/characterSlice"
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material"

const CharacterList = () => {
    const [ name, setName ] = useState("")

    const fetchedCharacters = useAppSelector((state:StoreState)=> state.characters)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchCharacters())
    },[dispatch])

    const showResults = fetchedCharacters.results.map((character)=>{
        return(
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia 
                        id={String(character.id)}
                        component="img"
                        height="300"
                        src={character.image}
                        alt={character.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <form>
                                <input type="text" placeholder="Who am i?.." onChange={event =>{setName(event.target.value)}} value={name}></input>
                            </form>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    })

    return(
        <Grid container spacing={1}>
            {showResults}
        </Grid>
    )
}

export default CharacterList