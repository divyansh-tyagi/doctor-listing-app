'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Filters from '@/app/components/filters';
import DoctorCard from '@/app/components/DoctorCard';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  location: string;
  languages: string[];
  rating: number;
  price: number;
  availability: string[];
  imageUrl: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        
        const response = await fetch(`/api/doctors?${params.toString()}`);
        const data = await response.json();
        
        setDoctors(data.doctors);
        setTotalPages(data.pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchParams, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">General Physician / Internal Medicine Doctors</h1>
        
        <Filters />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {doctors.map(doctor => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
            
            {doctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No doctors found matching your criteria.</p>
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      Previous
                    </button>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`px-4 py-2 border rounded-md ${page === p ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300'}`}
                    >
                      {p}
                    </button>
                  ))}
                  
                  {page < totalPages && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Apollo247</h3>
              <p className="text-gray-400">Your trusted healthcare partner</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Doctors</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pharmacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Lab Tests</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Apollo247. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}