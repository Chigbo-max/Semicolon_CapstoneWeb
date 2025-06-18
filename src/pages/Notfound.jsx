import { Link } from 'react-router-dom'


function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-400">Go to Home</Link>
        <p className="mt-4 text-sm text-gray-500">If you think this is a mistake, please contact support.</p>
    </div>
  )
}

export default NotFound
