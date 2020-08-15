import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


const blog = {
  title: 'This is the title from the test blog',
  author: 'Test author name',
  url: 'www.test.com',
  likes: 3
}

test('Renders title and author by default', () => {
  const { getByTestId } = render (<Blog blog={blog} />)

  expect(getByTestId(/title/i).textContent).toBe('This is the title from the test blog')
  expect(getByTestId(/author/i).textContent).toBe('Test author name')
})

test('Not renders url and likes by default', () => {
  const { queryByTestId } = render( <Blog blog={blog} />)

  expect(queryByTestId(/url/i)).toBeNull()
  expect(queryByTestId(/likes/i)).toBeNull()
})
