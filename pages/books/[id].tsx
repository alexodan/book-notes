import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { IBook } from '../../types'
import { supabase } from '../../utils/supabase'

type BookDetailsProps = {
  book: IBook
}

// test
const BookDetails = ({ book }: BookDetailsProps) => {
  const [editMode, setEditMode] = React.useState(false)
  const [comments, setComments] = React.useState(book.comments)

  const saveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault()
    const { data, error } = await supabase
      .from('books')
      .update({
        comments,
      })
      .match({
        id: book.id,
      })
    setEditMode(false)
  }

  return (
    <div className="p-8">
      <a href="/" className="text-xl ml-16">
        Go Back
      </a>
      <div className="flex px-16 py-8">
        <div className="w-1/2 max-w-sm">
          <img
            className="w-full object-fill"
            src={`${book.cover ?? '/assets/no-cover.png'}`}
            alt={book.title}
          />
        </div>
        <div className="w-full ml-8">
          <h1 className="text-5xl">{book.title}</h1>
          <h2 className="text-2xl font-thin">by {book.author}</h2>
          <hr className="my-4" />
          {editMode ? (
            <div>
              <textarea
                className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                value={comments ?? ''}
                onChange={e => setComments(e.target.value)}
                placeholder="Your comments about the book"
              ></textarea>
              <button
                type="submit"
                className="text-white bg-green-500 px-2 py-1 rounded-md w-20 mt-2"
                onClick={saveChanges}
              >
                Save
              </button>
              <button
                className="text-white bg-red-500 px-2 py-1 rounded-md w-20 mt-2 ml-2"
                onClick={() => setEditMode(!editMode)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {book.comments?.length ? (
                <>
                  <button
                    className="bg-black text-white rounded-md px-2 py-1"
                    onClick={() => setEditMode(!editMode)}
                  >
                    ✏️ Edit comments
                  </button>
                  <p className="mt-4">{book.comments}</p>
                </>
              ) : (
                <button
                  className="bg-black text-white rounded-md px-2 py-1"
                  onClick={() => setEditMode(!editMode)}
                >
                  ✏️ add comments
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetails

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query
  const { data } = await supabase.from<IBook>('books').select('*').match({ id })
  return {
    props: {
      book: data?.[0],
    },
  }
}
