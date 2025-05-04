import Link from 'next/link';
import { FaUser, FaPhone, FaBars } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="md:hidden">
              <FaBars className="text-gray-600 text-xl" />
            </button>
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Apollo247
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-gray-600 hover:text-blue-600">Doctors</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Pharmacy</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Lab Tests</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Surgeries</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <FaUser className="text-xl" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
              <FaPhone />
              <span>Login / Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}