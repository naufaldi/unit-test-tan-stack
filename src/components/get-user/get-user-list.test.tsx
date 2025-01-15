
// MSW setup

import { server } from '@/lib/setup';
import { it, expect, afterEach, afterAll, beforeAll, describe } from 'vitest';
import { render, screen, } from '@testing-library/react';
import UserList from './get-user-list';
import { http, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe(" user profile", () => {
  it(' render user data successfully', async () => {
    render(<UserList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()


    await screen.findByText('George Bluth')
    expect(screen.getByText('george.bluth@reqres.in')).toBeInTheDocument()
  })
  it('handles error state', async () => {

    server.use(
      http.get('https://reqres.in/api/users', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Failed to fetch user data'
        })
      })
    )

    render(<UserList />)
    await screen.findByText(/Failed to fetch user data/)
  })

  it('handles loading state', async () => {
    server.use(
      http.get('https://reqres.in/api/users', async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        return HttpResponse.json({
          page: 1,
          per_page: 6,
          total: 12,
          total_pages: 2,
          data: [
            {
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth',
              avatar: 'https://reqres.in/img/faces/1-image.jpg',
            }
          ],
          support: {
            url: 'https://reqres.in/#support-heading',
            text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
          }
        })
      })
    )

    render(<UserList />)


    expect(screen.getByText('Loading...')).toBeInTheDocument()


    await screen.findByText('George Bluth')
    expect(screen.getByText('george.bluth@reqres.in')).toBeInTheDocument()
  })
})