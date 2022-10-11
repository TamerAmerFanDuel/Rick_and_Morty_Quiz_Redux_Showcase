export interface CorrectGuesses extends CharacterProps {
	correctGuesses: string[]
}

export interface CharacterProps {
	info: Info
	results: CharacterResult[]
}

export interface Info {
	count: number
	pages: number
	next: null | string
	prev: null | string
}
export interface CharacterPageInfo extends Info {
	currentPage: number
}

export interface CharacterResult {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	origin: {
		name: string
		uri: string
	}
	location: {
		name: string
		url: string
	}
	image: string
	episode: string[]
	url: string
	created: string
}
