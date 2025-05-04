import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function GET() {
  try {
    await dbConnect();
    
    // Clear existing data
    await Doctor.deleteMany({});
    
    // Sample doctors data
    const doctors = [
      {
        name: "Dr. Rajesh Sharma",
        specialty: "General Physician",
        experience: 12,
        location: "Bangalore",
        languages: ["English", "Hindi", "Kannada"],
        rating: 4.5,
        price: 500,
        availability: ["Today", "Tomorrow"],
        imageUrl: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
      },
      {
        name: "Dr. Priya Patel",
        specialty: "General Physician",
        experience: 8,
        location: "Mumbai",
        languages: ["English", "Hindi", "Marathi"],
        rating: 4.2,
        price: 450,
        availability: ["Tomorrow", "This Week"],
        imageUrl: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
      },
      {
        name: "Dr. Amit Kumar",
        specialty: "Internal Medicine",
        experience: 15,
        location: "Delhi",
        languages: ["English", "Hindi"],
        rating: 4.8,
        price: 600,
        availability: ["Today", "This Week"],
        imageUrl: "https://img.freepik.com/free-photo/portrait-male-doctor-holding-stethoscope_23-2148844145.jpg"
      },
      {
        name: "Dr. Ananya Reddy",
        specialty: "Internal Medicine",
        experience: 10,
        location: "Hyderabad",
        languages: ["English", "Hindi", "Telugu"],
        rating: 4.3,
        price: 550,
        availability: ["Tomorrow"],
        imageUrl: "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg"
      },
      {
        name: "Dr. Sanjay Gupta",
        specialty: "General Physician",
        experience: 20,
        location: "Bangalore",
        languages: ["English", "Hindi", "Kannada"],
        rating: 4.9,
        price: 700,
        availability: ["This Week"],
        imageUrl: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
      },
      {
        name: "Dr. Neha Singh",
        specialty: "Internal Medicine",
        experience: 7,
        location: "Mumbai",
        languages: ["English", "Hindi", "Marathi"],
        rating: 4.1,
        price: 400,
        availability: ["Today", "Tomorrow", "This Week"],
        imageUrl: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
      },
      {
        name: "Dr. Vikram Joshi",
        specialty: "General Physician",
        experience: 18,
        location: "Delhi",
        languages: ["English", "Hindi"],
        rating: 4.7,
        price: 650,
        availability: ["Today"],
        imageUrl: "https://img.freepik.com/free-photo/portrait-male-doctor-holding-stethoscope_23-2148844145.jpg"
      },
      {
        name: "Dr. Meera Iyer",
        specialty: "Internal Medicine",
        experience: 9,
        location: "Bangalore",
        languages: ["English", "Hindi", "Kannada", "Tamil"],
        rating: 4.4,
        price: 500,
        availability: ["Tomorrow", "This Week"],
        imageUrl: "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg"
      }
    ];
    
    // Insert sample data
    await Doctor.insertMany(doctors);
    
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}