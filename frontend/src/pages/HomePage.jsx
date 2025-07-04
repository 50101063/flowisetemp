import React from 'react'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { user } = useAuth()

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Your Personal Recipe Organizer!
      </h1>
      {user ? (
        <p className="text-lg text-gray-600">
          Hello, {user.username}! Start managing your recipes.
        </p>
      ) : (
        <p className="text-lg text-gray-600">
          Please log in or register to start organizing your cherished recipes.
        </p>
      )}
      {/* Future: Add links to view recipes, add new recipe */}
    </div>
  )
}

export default HomePage
