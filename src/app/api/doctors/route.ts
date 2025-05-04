import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor'; 
interface FilterQuery {
  specialty?: string;
  location?: string;
  experience?: { $gte: number };
  rating?: { $gte: number };
  languages?: string;
  availability?: string;
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const specialty = searchParams.get('specialty');
    const location = searchParams.get('location');
    const experience = searchParams.get('experience');
    const rating = searchParams.get('rating');
    const language = searchParams.get('language');
    const availability = searchParams.get('availability');

    const skip = (page - 1) * limit;

    // Define query with proper typing
    const query: FilterQuery = {};

    if (specialty) query.specialty = specialty;
    if (location) query.location = location;
    if (experience) query.experience = { $gte: parseInt(experience) };
    if (rating) query.rating = { $gte: parseInt(rating) };
    if (language) query.languages = language;
    if (availability) query.availability = availability;

    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(query);

    return NextResponse.json({
      doctors,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}