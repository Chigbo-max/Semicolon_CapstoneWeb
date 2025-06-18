import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="" alt="Logo" className="h-10" />
          <h1 className="text-xl font-bold">Anti-Theft Tracker</h1>
        </div>

        <nav>
          <ul className="flex gap-6">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar
