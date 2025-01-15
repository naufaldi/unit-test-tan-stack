import { Suspense } from 'react'
import UserList from './components/get-user/get-user-list'

export default function App() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserList />
      </Suspense>
    </main>
  )
}