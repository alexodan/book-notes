import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { IBook } from '../types'
import { supabase } from '../utils/supabase'

type BookCardProps = {
  book: IBook
}

export default function BookCard({ book }: BookCardProps) {
  const deleteBook = (id: number) => {
    useQuery(['books'], () => supabase.from('books').delete().match({ id }))
  }

  return (
    <div className="bg-slate-50 md:w-72 px-8 py-4">
      <img
        className="w-[calc(100%-4rem)] object-fill m-8"
        src={`${book.cover ?? '/assets/no-cover.png'}`}
        alt={book.title}
      />
      <hr className="mb-4" />
      <h2 className="text-2xl mb-1">{book.title}</h2>
      <h3 className="mb-1">{book.author}</h3>
      <p className="mb-4">{book.description}</p>
      <div className="flex justify-around">
        <a
          className="inline-block text-white bg-green-500 rounded py-2 px-4"
          href={`/books/${book.id}`}
        >
          Details
        </a>
        <button
          className="text-white bg-red-500 rounded py-2 px-4"
          onClick={() => deleteBook(book.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
