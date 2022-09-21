import { Grid, Card, CardMedia, CardContent, TextField } from "@mui/material"
import { CharacterResult } from "../store/types"

const CharacterCard = (character: CharacterResult) => {

    return(
        <Grid key={character.id} item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia 
                    id={String(character.id)}
                    component="img"
                    height="300"
                    src={character.image}
                    alt={character.name}
                />
                <CardContent>
                    <TextField label="Who am I?.." variant="outlined" />                    
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CharacterCard