const typeColors = {
  fire: 'bg-red-500',
  grass: 'bg-green-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  poison: 'bg-purple-500',
  flying: 'bg-orange-400',
} as const

type Props = {
  type: keyof typeof typeColors
}

const PokemonType = ({ type }: Props) => {
  const bgColor = typeColors[type] || 'bg-gray-500'
  return (
    <div className={`inline-block px-3 text-white rounded-md ${bgColor}`}>
      {type}
    </div>
  )
}

export default PokemonType
