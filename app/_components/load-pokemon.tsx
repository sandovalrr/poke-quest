'use client'
import { fetchPokemon } from '@/app/actions/getPokemon'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import PokemonCard, { type Pokemon } from './PokemonCard'

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

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const loadMorePokemon = async () => {
    setLoading(true)
    await delay(1000)
    const nextPage = page + 1
    const newPokemon = await fetchPokemon({
      search,
      page: nextPage,
    })
    setPage(nextPage)
    setPokemon(prev => {
      if (!prev) return newPokemon
      const uniquePokemon = newPokemon.filter(
        (poke: Pokemon) => !prev.some(p => p.name === poke.name),
      )
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
