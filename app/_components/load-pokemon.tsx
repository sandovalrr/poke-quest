'use client'
import { fetchPokemon } from '@/app/actions/get-pokemons'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import PokemonCard, { type Pokemon } from './pokemon-cards'

/**
 * This component is responsible for loading more pokemon
 * when the user clicks the "Load More" button.
 */
const LoadPokemon = ({
  search,
  initialPokemon,
}: {
  search: string | undefined
  initialPokemon: Pokemon[] | undefined
}) => {
  const [pokemon, setPokemon] = useState(initialPokemon)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMorePokemon = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const nextPage = page + 1

    // fetch the next page of pokemon in the client
    const newPokemon = await fetchPokemon({
      search,
      page: nextPage,
    })

    // set the new pokemon and page
    setPage(nextPage)

    setPokemon(prev => {
      if (!prev) return newPokemon
      // Remove duplicates
      const uniquePokemon = newPokemon.filter(
        (poke: Pokemon) => !prev.some(p => p.name === poke.name),
      )
      // Merge the new pokemon with the existing pokemon
      return [...prev, ...uniquePokemon]
    })
    setLoading(false)
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {pokemon?.map((poke: Pokemon) => (
          <PokemonCard key={poke.url} pokemon={poke} />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center p-4 gap-4">
        {loading && <ClipLoader color="#fff" />}

        <button
          type="button"
          onClick={loadMorePokemon}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load More
        </button>
      </div>
    </>
  )
}

export default LoadPokemon
