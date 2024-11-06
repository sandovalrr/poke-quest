'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const timeoutRef = useRef<number>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value

    window.clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      if (!text) {
        router.push('/')
      } else {
        router.push(`?search=${text}`)
      }
    }, 500)
  }

  return (
    <div className="flex justify-center w-[90%] mx-auto max-w-[1500px]">
      <input
        type="text"
        defaultValue={searchParams.get('search') ?? ''}
        placeholder="Search Pokemon..."
        onChange={handleInputChange}
        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-yellow-500 sm:text-sm sm:leading-6 mb-10"
      />
    </div>
  )
}

export default Search
