const PAGE_SIZE = 24

export async function getPokemon({
  query,
  page = 1,
  limit = 10000,
}: {
  query?: string
  page?: number
  limit?: number
}) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * PAGE_SIZE}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (query) {
      const filteredPokemon = data.results.filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()),
      )

      return filteredPokemon.slice(0, PAGE_SIZE)
    }
    return data.results.slice(0, PAGE_SIZE)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function fetchPokemon({
  page = 1,
  search,
}: { page?: number; search?: string | undefined }) {
  try {
    const pokemonData = await getPokemon({ query: search, page })
    return pokemonData
  } catch (error) {
    console.log(error)
    return null
  }
}
