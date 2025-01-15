
import { useState, useEffect } from 'react'

import { getUserData } from '@/api/get-user'
import { UserData } from '@/types/user'



export default function UserList() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData()
        setUserData(data)
        setError(null)
      } catch (error) {
        setError(`Failed to fetch user data: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }
  if (!userData) {
    return <div className="text-center">No data available</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.data.map((user) => (
          <div key={user.id} className="bg-white shadow rounded-lg p-4">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="text-gray-600 text-center">{user.email}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Page {userData.page} of {userData.total_pages}</p>
        <p>Total users: {userData.total}</p>
      </div>
      <div className="mt-4 text-center">
        <a href={userData.support.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {userData.support.text}
        </a>
      </div>
    </div>
  )
}

