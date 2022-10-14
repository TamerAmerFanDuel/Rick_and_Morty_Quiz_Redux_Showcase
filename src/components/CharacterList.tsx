import { StoreState, useAppDispatch, useAppSelector } from "../store/store"
import { useEffect } from "react"
import { fetchCharacters, resetCorrectGuesses } from "../store/characterSlice"
import {
	Box,
	Grid,
	Pagination,
	useMediaQuery,
	useTheme,
	Button,
	Typography,
} from "@mui/material"
import CharacterCard from "./CharacterCard"
import { Container } from "@mui/system"
// import PageSelector from "./PageSelector"

const CharacterList = () => {
	const theme = useTheme()
	const shouldShowPagination = useMediaQuery(theme.breakpoints.up("sm"))

	const fetchedCharacters = useAppSelector(
		(state: StoreState) => state.character
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCharacters(1))
	}, [dispatch])

	const handleChange = (pageChange: number) => {
		dispatch(fetchCharacters(pageChange))
	}

	const handleReset = () => {
		dispatch(resetCorrectGuesses())
	}
	const currentLevelCorrect = fetchedCharacters.results.filter((result) =>
		fetchedCharacters.correctGuesses.includes(String(result.id))
	)

	return (
		<Container maxWidth="lg">
			<Box sx={{ flexGrow: 3 }}>
				<Grid
					container
					spacing={2}
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					{/* <Grid item sm={1}>
						<PageSelector />
					</Grid> */}
					{shouldShowPagination && (
						<Grid item sm={6}>
							<Pagination
								sx={{ m: 0.1, mt: 4 }}
								// count={fetchedCharacters.info.pages}
								count={1}
								page={fetchedCharacters.info.currentPage}
								onChange={(_, pageChange) => {
									handleChange(pageChange)
								}}
							/>
						</Grid>
					)}
					<Grid item sm={4}>
						<Typography>
							Current Level Score: {currentLevelCorrect.length}/
							{fetchedCharacters.results.length}
						</Typography>
						{/* <Typography>
							Total Score: {fetchedCharacters.correctGuesses.length}/
							{fetchedCharacters.info.count}
						</Typography> */}
					</Grid>
					<Grid item sm={1}>
						<Button variant="contained" onClick={handleReset}>
							RESET
						</Button>
					</Grid>
				</Grid>
			</Box>
			<Grid container spacing={1}>
				{fetchedCharacters.results.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</Grid>
			<Grid
				container
				spacing={2}
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				{/* <Grid item sm={1}>
					<PageSelector />
				</Grid> */}
				{shouldShowPagination && (
					<Grid item sm={10}>
						<Pagination
							sx={{ m: 0.1, mt: 4 }}
							// count={fetchedCharacters.info.pages}
							count={2}
							page={fetchedCharacters.info.currentPage}
							onChange={(_, pageChange) => {
								handleChange(pageChange)
							}}
						/>
					</Grid>
				)}
			</Grid>
		</Container>
	)
}

export default CharacterList
