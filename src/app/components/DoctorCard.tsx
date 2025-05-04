import Image from 'next/image';
import { FaStar, FaRegStar, FaMapMarkerAlt, FaClock, FaRupeeSign } from 'react-icons/fa';

interface DoctorCardProps {
  doctor: {
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
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(doctor.rating);
    const hasHalfStar = doctor.rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="flex">
          <div className="mr-4">
            <Image 
              src={doctor.imageUrl || '/default-doctor.jpg'} 
              alt={doctor.name}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-gray-600 text-sm">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1" />
              {doctor.location}
            </p>
            <p className="text-gray-600 text-sm mt-1">{doctor.experience} years experience</p>
            
            <div className="flex items-center mt-2">
              {renderStars()}
              <span className="ml-2 text-gray-600 text-sm">{doctor.rating}</span>
            </div>
            
            <div className="mt-2">
              <p className="text-gray-600 text-sm">Speaks: {doctor.languages.join(', ')}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm flex items-center">
                <FaClock className="mr-1" />
                Available: {doctor.availability.join(', ')}
              </p>
            </div>
            <div className="flex items-center">
              <FaRupeeSign className="text-gray-600 mr-1" />
              <span className="font-semibold">{doctor.price}</span>
              <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}