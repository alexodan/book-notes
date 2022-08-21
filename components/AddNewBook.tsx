import React from 'react'
import { IBook } from '../types'

type AddNewBookProps = {
  onAddNewBook: (book: IBook) => void
}

function AddNewBook({ onAddNewBook }: AddNewBookProps) {
  return (
    <div className="bg-slate-50 md:w-72 px-8 py-4 flex justify-center align-middle">
      <button className="bg-black text-white self-center px-4 py-2 rounded">
        Add Book
      </button>
    </div>
  )
}

export default AddNewBook
