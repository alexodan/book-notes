import React from 'react'

type SearchBarProps = {
  onSearch: (search: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = React.useState('')

  const searchBooks = () => {
    onSearch(query)
  }

  return (
    <div className="flex">
      <form>
        <input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          type="text"
          placeholder="Search by title or author"
        />
        <button onClick={searchBooks}>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
