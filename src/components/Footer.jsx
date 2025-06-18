import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Anti-Theft Tracker. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link> •{" "}
          <Link to="/support" className="hover:text-indigo-400">Support</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
