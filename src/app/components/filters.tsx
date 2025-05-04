'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    specialty: searchParams.get('specialty') || '',
    location: searchParams.get('location') || '',
    experience: searchParams.get('experience') || '',
    rating: searchParams.get('rating') || '',
    language: searchParams.get('language') || '',
    availability: searchParams.get('availability') || '',
  });

  const specialties = ['General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician'];
  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'];
  const experiences = ['5', '10', '15', '20'];
  const ratings = ['3', '4', '5'];
  const languages = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'];
  const availabilities = ['Today', 'Tomorrow', 'This Week'];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      specialty: '',
      location: '',
      experience: '',
      rating: '',
      language: '',
      availability: '',
    });
    router.push('/');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
          <select
            name="specialty"
            value={filters.specialty}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Specialties</option>
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any Experience</option>
            {experiences.map(exp => (
              <option key={exp} value={exp}>{exp}+ years</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any Rating</option>
            {ratings.map(rt => (
              <option key={rt} value={rt}>{rt}+ stars</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any Language</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any Time</option>
            {availabilities.map(avail => (
              <option key={avail} value={avail}>{avail}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={resetFilters}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
        >
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}