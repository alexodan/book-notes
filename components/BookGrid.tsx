import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { IBook } from '../types'
import { supabase } from '../utils/supabase'
import AddNewBook from './AddNewBook'
import BookCard from './BookCard'

// type BookGridProps = {
//   books: IBook[]
// }

function BookGrid() {
  const { isLoading, data: books } = useQuery(['books'], () =>
    supabase
      .from<IBook>('books')
      .select('*')
      .then(res => res.data as any)
  )

  if (isLoading) return <p>Loading...</p>

  const addNewBook = (book: IBook) => {
    const { data, error } = useQuery(['books'], () =>
      supabase.from('books').insert(book)
    )
    console.log('NEW BOOK:', data)
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
      <AddNewBook onAddNewBook={addNewBook} />
      {books?.map((book: IBook) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookGrid
