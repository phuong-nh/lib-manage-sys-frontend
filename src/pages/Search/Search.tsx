import { Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Search = () => {
  const query = useQuery()
  const [searchTerms, setSearchTerms] = useState('')
  const state = useSelector((state: any) => state.library.books)

  useEffect(() => {
    setSearchTerms(decodeURIComponent(query.get('value') || ''))
  }, [query])

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search results for: {searchTerms}</p>
      {/* Add your search results rendering logic here */}
      <Button
        onClick={() => {
          setSearchTerms('');
          query.delete('value');
          console.log(state)
        }}>
        Clear search
      </Button>
    </div>
  )
}

export default Search
