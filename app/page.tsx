import Search from '@/app/_components/Search'
import LoadPokemon from '@/app/_components/load-pokemon'
import { fetchPokemon } from './actions/getPokemon'
const Page = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) => {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const pokemon = await fetchPokemon({ search })
  return (
    <div className="max-w-[1500px] w-[95%] mx-auto">
      <Search search={search} />
      <ul key={Math.random()}>
        <LoadPokemon search={search} initialPokemon={pokemon} />
      </ul>
    </div>
  )
}

export default Page
